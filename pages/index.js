import Head from "next/head";

import EventList from "../components/events/event-list";
import { getAllEvents } from "../helpers/api-util";
import NewsletterRegistration from "../components/input/newsletter-registration";

function HomePage(props) {
  const { events } = props;
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description/" content="Find a lot of great events" />
      </Head>
      <NewsletterRegistration></NewsletterRegistration>
      <EventList items={events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getAllEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
