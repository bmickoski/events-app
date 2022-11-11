import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import Comments from "../../components/input/comments";
import Head from "next/head";

function EventDetailsPage(props) {
  const event = props.event;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        alt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id}></Comments>
    </Fragment>
  );
}

export default EventDetailsPage;

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventid: event.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const eventId = context.params.eventid;
  const event = await getEventById(eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}
