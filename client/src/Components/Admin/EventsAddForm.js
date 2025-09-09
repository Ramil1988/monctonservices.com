import { useState, useEffect } from "react";
import styled from "styled-components";

const ROOT_API = "/.netlify/functions/api";

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
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  padding: 10px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  margin: 16px 0 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  color: var(--text);
  border-radius: 12px;
  font-size: 1rem;
  margin-top: 6px;
  &:focus { outline: none; border-color: var(--primary-start); }
`;

const Button = styled.button`
  width: 220px;
  padding: 10px 16px;
  margin-top: 20px;
  border: none;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  transition: transform 0.15s ease, box-shadow 0.2s ease;

  &:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(34,211,238,0.25); }

  &[type="button"] {
    background: linear-gradient(90deg, #ef4444, #f97316);
    color: var(--pill-text);
  }
`;

export default EventsAddForm;
