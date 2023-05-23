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
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
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
    const formattedStartDate = moment(event.startDate).toISOString();
    const formattedEndDate = moment(event.endDate).toISOString();
    return {
      title: event.title,
      start: new Date(formattedStartDate),
      end: new Date(formattedEndDate),
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
      <EventList>
        {cityEvents.map((event) => (
          <StyledNavLink to={event.link} target="_blank">
            <EventItem key={event.title}>
              <EventTitle>{event.title}</EventTitle>
              <Wrapper>
                <h5>When:</h5>
                <EventDate>{event.startDate}</EventDate> -
                <EventDate>{event.endDate}</EventDate>
              </Wrapper>
              <Wrapper>
                <h5>Where:</h5>
                <EventLocation>{event.location}</EventLocation>
              </Wrapper>
              <EventDescription>{event.description}</EventDescription>
            </EventItem>
          </StyledNavLink>
        ))}
      </EventList>
    </>
  );
};

const StyledHeader = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin: 50px auto;
  width: 80%;
`;

const EventList = styled.ul`
  margin: 50px;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  padding: 0;
  list-style: none;
`;

const StyledNavLink = styled(Link)`
  font-size: 1rem;
  color: black;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const EventItem = styled.li`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const EventTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  color: #333;
  text-transform: uppercase;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EventDate = styled.h3`
  margin-left: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  font-weight: normal;
  color: #888;
  font-size: 1.2rem;
`;

const EventLocation = styled(EventDate)``;

const EventDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
`;

export default CityEvents;
