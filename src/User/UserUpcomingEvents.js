import React, { useRef, useEffect, useState } from 'react'
import ResponsiveAppBar from "../Components/header";
import Container from "@mui/material/Container";
import ActionAreaCard from "../Components/eventCard";
import Footer from "../Components/footer";
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function UserUpcomingEvents() {
  const containerRef = useRef(null);
  const containerRef1 = useRef(null);
  const [event, setEvents] = useState([]);
  const currentDate = new Date();

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  const scrollLeft1 = () => {
    if (containerRef1.current) {
      containerRef1.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };
  const scrollRight1 = () => {
    if (containerRef1.current) {
      containerRef1.current.scrollLeft += 300;
    }
  };
  useEffect(() => {
    axios.get('http://localhost:8080/Event/getAllEvents')
      .then(response => {
        const filteredEvents= response.data.filter(participant => participant.status === 1);
        console.log(filteredEvents)
            // Set the filtered participants
            setEvents(filteredEvents);
            // Set the events if needed
            // setEvents(filteredParticipants);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <img src="img/upcoming.jpg" alt="logo" style={{maxWidth:"100%"}}/>
      <Container maxWidth="lg">
        <div>
          <h2
            style={{ fontFamily: "'DM Sans', sans-serif", marginTop: "5rem" }}
          >
            Upcoming Events
          </h2>

          <div style={{ marginBottom: "5rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                overflowX: "auto",
                alignItemsL: "center",
                justifyContent: "center",
              }}
            >
              {event.map((event, index) => (
                <div
                    key={index}
                    style={{
                    boxSizing: "border-box",
                    padding: ".5rem",
                    }}
                >
                    {/* Conditional rendering based on event date */}
                    {new Date(event.date) > currentDate && event.status === 1 && event.isDeleted === 0 ? (
                    <Link to={`/UserEventPage/${event.eventid}`} style={{ textDecoration: "none" }}>
                        <ActionAreaCard
                        key={index}
                        date={event.date}
                        title={event.title}
                        image={`/uploads/${event.image}`}
                        description={event.description}
                        />
                    </Link>
                    ) : null}
                </div>
                ))}
  </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
