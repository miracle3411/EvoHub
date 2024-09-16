import React, { useRef } from 'react'
import ResponsiveAppBar from '../Components/header'
import LandingPage from '../Components/LandingPage'
import Container from '@mui/material/Container';
import { Button, Grid } from '@mui/material';
import ActionAreaCard from '../Components/eventCard';
import OrganizerReq from '../Components/OrganizerReq';
import CampusVenues from '../Components/CampusVenues';
import { Link } from 'react-router-dom';
import Footer from '../Components/footer';
import PersonProfile from './UserAboutUs';
import { useState, useEffect } from "react";
import axios from 'axios'
import { useUser } from '../Components/UserProvider';

export default function UserHomePage() {
    const containerRef = useRef(null);
    const containerRef1 = useRef(null);
    const [event, setEvents] = useState([]);
    const currentDate = new Date();
    const { user } = useUser();

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
    useEffect(() => {
    const hasShownLoginAlert = localStorage.getItem('loginAlertShown');

    // If the alert hasn't been shown and there is a user
    if (!hasShownLoginAlert && user) {
        axios.get('http://localhost:8080/manageOrganizerRequest/getAllManageOrganizerRequests')
        .then(response => {
            const organizerRequestsData = response.data;
            const userOrganizerRequest = organizerRequestsData.find(req => req.email === user.email);

            if (userOrganizerRequest && userOrganizerRequest.status === 'Declined') {
            alert('Your request to be an organizer has been declined! You can request again. This notification expires in 3 days.');

            // Set a flag in localStorage to indicate that the alert has been shown
            localStorage.setItem('loginAlertShown', 'true');

            // Set a timer to expire the localStorage flag after 3 days
            setTimeout(() => {
                localStorage.removeItem('loginAlertShown');
            }, 3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds
            }
        })
        .catch(error => {
            console.error('Error fetching organizer requests:', error);
        });
    }
    }, [user]);

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
console.log("events: ",event)
  
    return (
        <div>
            <ResponsiveAppBar />
            <LandingPage />
            <Container maxWidth="lg" sx={{ marginBottom: "5rem" }}>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif" }}>Browse Event Categories</h2>
                        <Link to = "/UserEventCategory"><Button sx={{ padding: "0" }}><h4>View All</h4></Button></Link>
                    </div>
                    <div style={{ display: "flex", overflowX: "hidden", maxWidth: "100%" }} ref={containerRef}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                        <Link to='/EventCategoryCEA'><Button><img className='catbtn' src="/img/Engineering.png" /></Button></Link>
                        <Link to="/EventCategoryCCS"><Button><img className='catbtn' src="/img/ccs.png" /></Button></Link>
                        <Link to="/EventCategoryCASE"><Button><img className='catbtn' src="/img/arts.png" /></Button></Link>
                        <Link to ="/EventCategoryCMBA"><Button><img className='catbtn' src="/img/account.png" /></Button></Link>
                        <Link to ="/EventCategoryCNAHS"><Button><img className='catbtn' src="/img/nursing.png" /></Button></Link>
                        <Link to ="/EventCategoryCCJ"><Button><img className='catbtn' src="/img/crim.png" /></Button></Link>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={scrollLeft}><img src="/img/leftbtn.png" alt="left" /></Button>
                        <Button onClick={scrollRight}><img src="/img/rightbtn.png" alt="left" /></Button>
                    </div>
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif" , textDecoration:'none'}}>Upcoming Events</h2>
                        <Link to = "/UserUpcomingEvents"><Button sx={{ padding: "0" }}><h4>View All</h4></Button></Link>
                    </div>

                    {/* Popular Event Cards */}
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
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button onClick={scrollLeft1}><img src="/img/leftbtn.png" alt="left" /></Button>
                            <Button onClick={scrollRight1}><img src="/img/rightbtn.png" alt="left" /></Button>
                        </div>
                    </div>
                </div>
            </Container>
            <OrganizerReq />
            <CampusVenues />
            <div style={{ marginBottom: "5rem" }}></div>
           
            {/* <AboutUs /> */}
            <PersonProfile />
            <div style={{ marginBottom: "5rem" }}></div>
            <Footer />
        </div>
    )
}
