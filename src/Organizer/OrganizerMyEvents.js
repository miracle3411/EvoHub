import React, { useRef, useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import ActionAreaCard from '../Components/eventCard';
import { Button } from '@mui/material';
import Footer from '../Components/footer';
import axios from 'axios'
import { Link } from 'react-router-dom';
import ResponsiveAppBarOrgan from '../Components/organHeader';
import { useOrganizer } from '../Components/OrganizerProvider';


export default function MyEvents() {
    const containerRef = useRef(null);
    const containerRef1 = useRef(null);
    const [event, setEvents] = useState([]);
    const currentDate = new Date();
    const { organizer } = useOrganizer();
    const [declined, setDeclined] = useState([]);

    useEffect(() => {
        window.scroll(0, 0);
        axios.get('http://localhost:8080/Event/getAllEvents')
          .then(response => {
            const filteredEvents= response.data.filter(participant => participant.status === 1);
            const filteredDecline= response.data.filter(participant => participant.status === 0);
            console.log(filteredEvents)
            // Set the filtered participants
            setEvents(filteredEvents);
            setDeclined(filteredDecline);
            // Set the events if needed
            // setEvents(filteredParticipants);
          })
          .catch(error => {
            console.error('Error fetching events:', error);
          });
      }, []);
      
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
    console.log(event)
    console.log(organizer.oid)
    console.log(event.orgid)
    return (
        <>
            <ResponsiveAppBarOrgan />
            <img src="/img/myevents_banner.png" alt="logo" className="banner" />
            <Container maxWidth="lg">
                <div >

                    <h2 style={{ fontFamily: "'DM Sans', sans-serif",fontSize:'30px' }}>Upcoming Events</h2>

                </div>
                <div>

                    <div style={{ display: "flex", overflowX: "hidden", maxWidth: "100%" }} 
                    ref={containerRef}>
                    {event.map((event, index) => (
                        <div
                            key={index}
                            style={{
                            boxSizing: "border-box",
                            padding: ".5rem",
                            }}
                        >
                            {/* Conditional rendering based on event date and department */}
                            {new Date(event.date) >= currentDate && ( event.orgid === organizer.oid) &&(event.isDeleted === 0) ?(
                            <Link to={`/EventDetails/${event.eventid}`} style={{textDecoration:'none'}}>
                                <ActionAreaCard
                                key={index}
                                date={event.date}
                                title={event.title}
                                image={"/uploads/" + event.image}
                                description={event.description}
                                />
                            </Link>
                            ): null}
                        </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={scrollLeft}><img src="/img/leftbtn.png" alt="left" /></Button>
                        <Button onClick={scrollRight}><img src="/img/rightbtn.png" alt="left" /></Button>
                    </div>
                </div>

                <div>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", marginTop: "5rem",fontSize:'30px' }}>Past Events</h2>

                    <div style={{ marginBottom: "5rem" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", overflowX: "hidden" , alignItemsL:"center", justifyContent: "center"}}>
                        {event.map((event, index) => (
                        <div
                            key={index}
                            style={{
                            boxSizing: "border-box",
                            padding: ".5rem",
                            }}
                        >
                            {new Date(event.date) <= currentDate && ( event.orgid === organizer.oid) &&(event.isDeleted === 0) ?(
                            <Link to={`/EventDetails/${event.eventid}`} style={{textDecoration:'none'}}>
                                <ActionAreaCard
                                key={index}
                                date={event.date}
                                title={event.title}
                                image={"/uploads/" + event.image}
                                description={event.description}
                                />
                            </Link>
                            ): null}
                        </div>
                        ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={scrollLeft}><img src="/img/leftbtn.png" alt="left" /></Button>
                        <Button onClick={scrollRight}><img src="/img/rightbtn.png" alt="left" /></Button>
                    </div>
                    </div>
                </div>
            </Container>
        
        <Footer/>
        </>
    )
}