import { useState, useEffect } from "react";
import styled from "styled-components";

const ROOT_API = "https://monctonservices-com.onrender.com";

const EventsAddForm = () => {
  const [setEvents] = useState([]);
  const [notification, setNotification] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: formatDate,
    endDate: formatDate,
    location: "",
    description: "",
    link: "",
  });

  const fetchAllevents = async () => {
    try {
      const response = await fetch(`${ROOT_API}/allEvents`);
      const data = await response.json();
      setEvents(data.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setNotification("Event added successfully!");

    try {
      const response = await fetch(`${ROOT_API}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      await response.json();
      fetchAllevents();

      setNewEvent({
        title: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
        link: "",
      });
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const handleEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  return (
    <>
      <h2>Add new event</h2>
      <Form onSubmit={handleAddEvent}>
        <Label>
          Title:
          <Input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleEventChange}
            required
          />
        </Label>
        <Label>
          Start date:
          <Input
            type="date"
            name="startDate"
            value={newEvent.startDate}
            onChange={handleEventChange}
            required
          />
        </Label>
        <Label>
          End date:
          <Input
            type="date"
            name="endDate"
            value={newEvent.endDate}
            onChange={handleEventChange}
            required
          />
        </Label>
        <Label>
          Location:
          <Input
            type="text"
            name="location"
            value={newEvent.location}
            onChange={handleEventChange}
            required
          />
        </Label>
        <Label>
          Description:
          <Input
            type="text"
            name="description"
            value={newEvent.description}
            onChange={handleEventChange}
            required
          />
        </Label>
        <Label>
          Link:
          <Input
            type="text"
            name="link"
            value={newEvent.link}
            onChange={handleEventChange}
            required
          />
        </Label>
        <Button type="submit">Create</Button>
      </Form>
      {notification && <Notification>{notification}</Notification>}
    </>
  );
};

const Notification = styled.div`
  background-color: #00cc00;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 20%;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  background-color: #333;
  color: #fff;

  &:hover {
    background-color: #444;
  }

  &[type="button"] {
    background-color: #cc0000;

    &:hover {
      background-color: #e60000;
    }
  }
`;

export default EventsAddForm;
