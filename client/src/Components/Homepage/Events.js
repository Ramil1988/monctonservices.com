import styled from "styled-components";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CityEvents = () => {
  const [cityEvents, setEvents] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const ROOT_API = "https://monctonservices-com.onrender.com";

  const fetchAllevents = async () => {
    try {
      const response = await fetch(`${ROOT_API}/allEvents`);
      const data = await response.json();
      const sortedEvents = data.data.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
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
    const formattedEndDate = moment(event.endDate).add(1, "days").toISOString();
    return {
      title: event.title,
      start: new Date(formattedStartDate),
      end: new Date(formattedEndDate),
      resource: event,
    };
  });

  const currentDate = moment().startOf("day");

  const startFrom = (currentPage - 1) * itemsPerPage;
  const selectedEvents = cityEvents.slice(startFrom, startFrom + itemsPerPage);

  const totalPages = Math.ceil(cityEvents.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <>
      <CalendarWrapper>
        <Calendar
          localizer={localizer}
          events={eventsForCalendar}
          views={["month"]}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => {
            window.open(event.resource.link, "_blank");
          }}
          popup
        />
      </CalendarWrapper>

      <StyledHeader>The upcoming events to visit in Moncton</StyledHeader>
      <EventList>
        {selectedEvents
          .filter((event) => moment(event.endDate).isSameOrAfter(currentDate))
          .map((event) => (
            <EventItem key={event.title}>
              <EventDetails>
                <EventTitle>{event.title}</EventTitle>
                <DetailsButton
                  onClick={() => window.open(event.link, "_blank")}
                >
                  <QuestionMarkLabel>?</QuestionMarkLabel>
                </DetailsButton>
              </EventDetails>
              <Wrapper>
                <Label>When:</Label>
                <EventDate>
                  {moment(event.startDate).format("DD-MM-YYYY")}
                </EventDate>{" "}
                -
                <EventDate>
                  {moment(event.endDate).format("DD-MM-YYYY")}
                </EventDate>
              </Wrapper>
              <Wrapper>
                <Label>Where:</Label>
                <EventLocation>{event.location}</EventLocation>
              </Wrapper>
              <EventDescription>{event.description}</EventDescription>
            </EventItem>
          ))}
      </EventList>
      <StyledPagination>
        {pageNumbers.map((number) => (
          <StyledPageButton
            key={number}
            active={number === currentPage}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </StyledPageButton>
        ))}
      </StyledPagination>
    </>
  );
};

const CalendarWrapper = styled.div`
  height: 500px;
  margin: 50px;

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const DetailsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: black;
  border: none;
  color: white;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
`;

const EventDetails = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const QuestionMarkLabel = styled.span`
  font-size: 24px;
  width: 20px;
  color: white;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledHeader = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin: 50px auto;
  width: 80%;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 20px auto;
    width: 90%;
  }
`;

const EventList = styled.ul`
  margin: 50px;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  padding: 0;
  list-style: none;
  @media (max-width: 768px) {
    margin: 10px;
  }
`;

const Label = styled.h5`
  margin: 0;
  font-weight: bold;
  color: #333;
  min-width: 50px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const EventItem = styled.li`
  width: 100%;
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

  @media (max-width: 768px) {
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
  margin-bottom: 10px;
  align-items: center;
`;

const EventDate = styled.h3`
  margin: 0 10px;
  font-weight: normal;
  color: #888;
  font-size: 1.2rem;
`;

const EventLocation = styled(EventDate)`
  font-weight: normal;
  color: #666;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-left: 10px;
`;

const EventDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const StyledPageButton = styled.button`
  background-color: ${({ active }) => (active ? "black" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0 5px;
  border: 1px solid white;
  transition: color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    line-height: 25px;
  }
`;

export default CityEvents;
