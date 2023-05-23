import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CityEvents = ({ events }) => {
  const cityEvents = [
    {
      title: "Music Festival",
      date: "2023-06-12",
      location: "Main Park",
      description: "Join us for a day full of music from local artists.",
    },
    {
      title: "Art Exhibition",
      date: "2023-07-19",
      location: "City Museum",
      description:
        "Experience the vibrant local art scene at our annual exhibition.",
    },
    // Add more events here...
  ];

  const eventsForCalendar = cityEvents.map((event) => {
    return {
      title: event.title,
      start: new Date(event.date),
      end: new Date(event.date),
      allDay: true,
      resource: event,
    };
  });

  return (
    <>
      <Calendar
        localizer={localizer}
        events={eventsForCalendar}
        views={["month", "agenda"]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={(event) => alert(event.resource.description)}
      />
      <EventList>
        {cityEvents.map((event) => (
          <EventItem key={event.title}>
            <EventTitle>{event.title}</EventTitle>
            <EventDate>{event.date}</EventDate>
            <EventLocation>{event.location}</EventLocation>
            <EventDescription>{event.description}</EventDescription>
          </EventItem>
        ))}
      </EventList>
    </>
  );
};

const EventList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EventItem = styled.li`
  margin-bottom: 20px;
`;

const EventTitle = styled.h2`
  margin: 0;
`;

const EventDate = styled.h3`
  margin: 0;
  font-weight: normal;
  color: #888;
`;

const EventLocation = styled.p`
  margin: 0;
`;

const EventDescription = styled.p`
  margin-top: 10px;
`;

export default CityEvents;
