import { useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);

  const emailRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();

    const userEmail = emailRef.current.value;
    console.log();

    notificationCtx.showNotification({
      title: "Signing up",
      message: "Resgitering for newsletter",
      status: "pending",
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: userEmail }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        const data = await response.json();
        throw new Error(data.message || "Something went wrong!");
      })
      .then(() => {
        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully registered!",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error",
          message: err.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
