import React, { useRef, useEffect, useState } from 'react'
import ResponsiveAppBar from '../Components/header'
import Container from '@mui/material/Container';
import { Button, TextField } from '@mui/material';
import ActionAreaCard from '../Components/eventCard';
import Footer from '../Components/footer';
import ResponsiveAppBarOrgan from '../Components/organHeader';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useOrganizer } from '../Components/OrganizerProvider';

export default function OrganizerJoinedEvents() {
    const containerRef = useRef(null);
    const containerRef1 = useRef(null);
    const [event, setEvents] = useState([]);
    const [participants, setParticipants] = useState([]);
    const {organizer} = useOrganizer();
    const currentDate = new Date();

    useEffect(() => {
        axios.get('http://localhost:8080/participantrequest/getAllParRequests')
            .then(response => {
                // setEvents(response.data);
                const tmpPart = response.data;
                console.log("tmpPart: ", tmpPart);
                const origPart = tmpPart.filter(tmpPar => tmpPar.organizerId === organizer.oid && tmpPar.status === 'Accepted');
                setParticipants(origPart);
                console.log("origPartParticipants: ", origPart);

            })
            .catch(error => {
                console.error('Error fetching participants:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/Event/getAllEvents')
            .then(response => {
                // setEvents(response.data);
                const tmpEvent = response.data;
                // console.log("tmpEvent: ", tmpEvent);
                const participantEventIds = participants.map(participant => participant.eventId);
                console.log("participantEventIds: ", participantEventIds);
                console.log("participant: ", participants);
                const origEv = tmpEvent.filter(tmpEv => tmpEv.status === 1 && participantEventIds.includes(tmpEv.eventid));
                console.log("origEv: ", origEv);
                setEvents(origEv);

            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [participants]);

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

    // useEffect(() => {
    //     window.scroll(0, 0);
    //     axios.get('http://localhost:8080/participantrequest/getAllParRequests')
    //         .then(response => {
    //             const filteredEvents = response.data.filter(participant => participant.status === "Accepted" && participant.organizerId === organizer.oid);
    //             console.log("Filtered Events:", filteredEvents);
    //             setParticipants(filteredEvents);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching events:', error);
    //         });
    // }, []);
    
    // useEffect(() => {
    //     if (participant.length > 0) {
    //         // Extract eventIds from participants
    //         const eventIds = participant.map(participant => participant.eventId);
    
    //         // Fetch all events
    //         axios.get('http://localhost:8080/Event/getAllEvents')
    //             .then(response => {
    //                 // Filter events based on eventIds
    //                 const filtered = response.data.filter(event => eventIds.includes(event.eventId));
                    
    //                 // Set the filtered events
    //                 console.log("EventIds:", eventIds);
    //                 console.log("Filtered Events:", filtered);
    //                 setEvents(filtered);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching events:', error);
    //             });
    //     }
    // }, [participant]);
    
    
    
    
    //   console.log("Organizer", organizer.oid)
    //   console.log("Participants ", participant)
    //   console.log("Event id from particiapnt ", event)
    return (
        <div>
            <ResponsiveAppBarOrgan />
            <div style={{ display: "flex", justifyContent: "center", height: '100%', width: '100%', margin: "0 auto", padding: 0 }}>
                <img style={{ minWidth: '100%', minHeight: '35vw', objectFit: 'cover', marginTop: 0 }} src="/img/Joined.jpg" alt="logo" className='logo' />
            </div>
            <Container maxWidth="lg">
                <div>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif" }}>Upcoming Events</h2>

                    <div style={{ display: "flex", overflowX: "hidden", maxWidth: "100%" }} ref={containerRef}>
                    {event.map((event, index) => (
                                <div
                                    key={index}
                                    style={{
                                    boxSizing: "border-box",
                                    padding: ".5rem",
                                    }}
                                >
                                    {/* Conditional rendering based on event date */}
                                    {new Date(event.date) > currentDate && (
                                    <Link to={`/OrganizerEventPage/${event.eventid}`} style={{textDecoration:'none'}}>
                                        <ActionAreaCard
                                        key={index}
                                        date={event.date}
                                        title={event.title}
                                        image={"/uploads/" + event.image}
                                        description={event.description}
                                        />
                                    </Link>
                                    )}
                                </div>
                                ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={scrollLeft}><img src="/img/leftbtn.png" alt="left" /></Button>
                        <Button onClick={scrollRight}><img src="/img/rightbtn.png" alt="left" /></Button>
                    </div>
                </div>

                <div>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", marginTop: "5rem" }}>Past Events</h2>

                    <div style={{ marginBottom: "5rem" }}>
                        <div style={{ display: "flex", overflowX: "hidden", maxWidth: "100%" }} ref={containerRef1}>
                        {event.map((event, index) => (
                                <div
                                    key={index}
                                    style={{
                                    boxSizing: "border-box",
                                    padding: ".5rem",
                                    }}
                                >
                                    {/* Conditional rendering based on event date */}
                                    {new Date(event.date) < currentDate && (
                                    <Link to={`/OrganizerEventPage/${event.eventid}`} style={{textDecoration:'none'}}>
                                        <ActionAreaCard
                                        key={index}
                                        date={event.date}
                                        title={event.title}
                                        image={"/uploads/" + event.image}
                                        description={event.description}
                                        />
                                    </Link>
                                    )}
                                </div>
                                ))}

                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button onClick={scrollLeft1}><img src="/img/leftbtn.png" alt="left" /></Button>
                            <Button onClick={scrollRight1}><img src="/img/rightbtn.png" alt="left" /></Button>
                        </div>
                    </div>
                </div>

            </Container>
            <Footer />
        </div>
    )
}
