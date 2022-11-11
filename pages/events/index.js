import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";
import Head from "next/head";

function EventsPage(props) {
  const router = useRouter();
  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }
  if (!props.events) {
    return <p>Loading..</p>;
  }
  return (
    <Fragment>
      <Head>
        <title>All Events</title>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
}

export default EventsPage;

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}
