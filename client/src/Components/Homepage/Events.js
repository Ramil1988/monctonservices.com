import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CityEvents = () => {
  const [cityEvents, setEvents] = useState([]);

  const ROOT_API = "https://monctonservices-com.onrender.com";

  const fetchAllevents = async () => {
    try {
      const response = await fetch(`${ROOT_API}/allEvents`);
      const data = await response.json();
      const sortedEvents = data.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchAllevents();
  }, []);

  const eventsForCalendar = cityEvents.map((event) => {
    const formattedDate = moment(event.date).toISOString();
    return {
      title: event.title,
      start: new Date(formattedDate),
      end: new Date(formattedDate),
      resource: event,
    };
  });

  return (
    <>
      <Calendar
        localizer={localizer}
        events={eventsForCalendar}
        views={["month"]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={(event) => {
          window.open(event.resource.link, "_blank");
        }}
      />
      <StyledHeader>Key events in Moncton to visit</StyledHeader>
      {cityEvents.map((event) => (
        <StyledNavLink to={event.link} target="_blank">
          <EventItem key={event.title}>
            <EventTitle>{event.title}</EventTitle>
            <EventDate>{event.date}</EventDate>
            <EventLocation>{event.location}</EventLocation>
            <EventDescription>{event.description}</EventDescription>
          </EventItem>
        </StyledNavLink>
      ))}
    </>
  );
};

const StyledHeader = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 3rem;
  color: black;
  text-align: center;
  margin: auto;
  max-width: 80%;
`;

const StyledNavLink = styled(Link)`
  font-size: 1rem;
  color: black;
  text-decoration: none;
  position: relative;
`;
const EventItem = styled.li`
  margin: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const EventTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  color: #333;
`;

const EventDate = styled.h3`
  margin: 0 0 10px 0;
  font-weight: normal;
  color: #888;
  font-size: 1.2rem;
`;

const EventLocation = styled.p`
  margin: 0 0 10px 0;
  font-size: 1.1rem;
`;

const EventDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
`;

export default CityEvents;
