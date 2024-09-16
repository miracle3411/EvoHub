import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import PersonPics from "../Components/People"
// import { Button } from '@mui/base';
import { style } from '@mui/system';
import ButtonM from '../Components/ButtonMaroon';
import ButtonY from '../Components/ButtonYellow';
import axios from 'axios';
import { Avatar, Button } from '@mui/material';


export default function AdminEventReqDetails({ setShowDetails, setId }) {
    const [firstN, setFirstN] = useState();
    const [lastN, setLastN] = useState();
    const Developers = [
        {
            image: "./img/Profile-3.png",
            name: "Robert Amaba",
            role: "Finance Manager"

        },
        {
            image: "/img/Profile-1.png",
            name: "Irish Leigh San Juan",
            role: "Public Relations Officier"

        }, {
            image: "/img/Profile-2.png",
            name: " Katrina Dela Pena",
            role: "Event Coordinator"

        }, {
            image: "/img/Profile.png",
            name: "Kyle Weig",
            role: "Logistics Coordinator"

        }

    ]

    const [event, setEvents] = useState([]);
    console.log("setId: ", setId);
    useEffect(() => {
        axios.get('http://localhost:8080/Event/getAllEvents')
            .then(response => {
                const tmpEvent = response.data;
                const origEv = tmpEvent.find(tmpEv => tmpEv.eventid === setId);
                setEvents(origEv);

                const [fname, lname] = origEv.organizer.split(' ');
                setFirstN(fname);
                setLastN(lname);

            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    return (
        <div style={{ border: "1px solid black", marginTop: "1rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", }}>
            {/* <Container maxWidth="lg"> */}
            <div style={{ backgroundColor: '#C02147', paddingTop: "1rem", paddingBottom: "1rem", display: "flex", alignItems: "center", height: "2rem", justifyContent: "space-between" }}>
                <div>
                    <img className='back' src="/img/back.png" style={{ cursor: "pointer", marginLeft: "1rem", alignContent: "left" }} onClick={() => setShowDetails(false)} />
                </div>

                <div style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", margin: "0 auto", padding: "0rem", color: "white", }}>Event Details</h3>
                </div>
                <div></div>

                {/* <div style={{ display: "flex", textAlign: "center", marginRight: "1rem" }}>
                    <img src="./img/Edit.png" alt="Edit" style={{ cursor: "pointer", marginRight: "1rem" }} onClick={() => alert("Accept")} />
                    <img src="./img/Delete.png" alt="Edit" style={{ cursor: "pointer" }} onClick={() => alert("Decline")} />
                </div> */}

            </div>
            <br />
            <img src={"/uploads/" + event.image} alt="logo" className="banner" style={{ width: "80%", height: "auto", display: "flex", margin: "0 auto", borderRadius: 50 }} />

            <div style={{ padding: "2rem" }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", marginTop: "5rem" }}>{event.title}</h2>
                <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Event Details</p>
                <p style={{ textAlign: 'justify', overflowWrap: 'break-word' }}>{event.description}</p>
                <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Date & Time</p>
                <p style={{ textAlign: 'justify' }}>{event.date}&nbsp;&nbsp;&nbsp;{event.time}</p>
                <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Location</p>
                <p style={{ textAlign: 'justify' }}>{event.location}</p>
                <p style={{ textDecoration: 'underline', fontWeight: 'bold', marginTop: "2rem" }}>Head Organizer</p>

                <div style={{ display: "flex", padding: "0", margin: "0", justifyContent: "space-between" }}>
                    {/* {Developers.map((developer, index) => (
                        <div style={{ textAlign: "center", margin: "50px" }}>
                            <img src={developer.image} alt="logo" style={{ width: "100px" }} />
                            <h3>{developer.name}</h3>
                            <p>{developer.role}</p>
                        </div>
                    ))} */}
                    <div style={{ textAlign: "center", margin: "10px" }}>
                        {/* <img src="/img/Profile-2.png" alt="logo" style={{ width: "100px" }} /> */}
                        <Avatar alt={event.organizer} src="/static/images/avatar/2.jpg" sx={{ width: "100px", height: "100px" }} />
                        <h3>{event.organizer}</h3>
                        <p>Event Coordinator</p>
                    </div>

                </div>

                <div style={{ display: "flex", textAlign: "center" }}>
                    <div style={{ marginRight: '15px', }}>
                        <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Required Year Level</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif" }}>{event.yearlevel}</p>
                    </div>
                    <div style={{ marginRight: '15px' }}>
                        <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Required Department</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif" }}>{event.department}</p>
                    </div>

                    <div style={{ marginRight: '15px' }}>
                        <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Required Payment</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif" }}>{event.payment}</p>
                    </div>

                    <div>
                        <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Maximum Attendees</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif" }}>{event.maxAttend}</p>
                    </div>
                </div>
                {/* <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Proof of Approval From SAO or Department</p> */}
                <br />
                <div style={{ backgroundColor: '#f5f5f5', borderRadius: '20px', marginBottom: '1rem', width: '30%', padding: '1rem' }}>
                    <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Requestor Information:</p>
                    <p><b>First Name:</b> {firstN}</p>
                    <p><b>Last Name:</b> {lastN}</p>
                    <p><b>School Email:</b> {event.organEmail}</p>
                    {/* <p style={{ fontWeight: 'bold' }}>Department: CCS</p>
                    <p style={{ fontWeight: 'bold' }}>Organization: GDSC</p> */}
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
                    {/* <ButtonM name="Accept" /> */}
                    <Button sx={{
                        backgroundColor: 'maroon', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '19rem', height: '4rem', fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
                        display: "flex", justifyContent: "center", padding: 0, borderRadius: 50

                    }}  onClick={async() => { 
                        try {
                            const updatedFormData = {
                                title: event.title,
                                description: event.description || '',
                                date: event.date || '',
                                time: event.time || '',
                                duration: event.duration || '',
                                location: event.location || '',
                                organizer: event.organizer || '',
                                organEmail: event.organEmail || '',
                                yearlevel: event.yearlevel || '',
                                department: event.department || '',
                                payment: event.payment || '',
                                maxAttend: event.maxAttend || '',
                                status: 1 || '',
                                image: event.image || '',
                                orgid: event.orgid || '',
                              };
                            console.log("updated: ",updatedFormData);
                            const response = await axios.put(`http://localhost:8080/Event/updateEvent?eventid=${event.eventid}`, updatedFormData);
                            console.log("API Response:", response.data);
                            alert('Event Request Successfully Accepted!');
                            window.location.reload();
                        } catch (error) {
                            console.error('Error accepting event request:', error);
                        }
                        }}>Accept</Button>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    {/* <ButtonY name="Decline" /> */}
                    <Button sx={{
                        backgroundColor: '#EAA021', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '19rem', height: '4rem', fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
                        display: "flex", justifyContent: "center", padding: 0, borderRadius: 50
                    }}  onClick={async() => { 
                        try {
                            const updatedFormData = {
                                title: event.title,
                                description: event.description || '',
                                date: event.date || '',
                                time: event.time || '',
                                duration: event.duration || '',
                                location: event.location || '',
                                organizer: event.organizer || '',
                                organEmail: event.organEmail || '',
                                yearlevel: event.yearlevel || '',
                                department: event.department || '',
                                payment: event.payment || '',
                                maxAttend: event.maxAttend || '',
                                status: 0 || '',
                                image: event.image || '',
                                orgid: event.orgid || '',
                              };
                            console.log("updated: ",updatedFormData);
                            const response = await axios.put(`http://localhost:8080/Event/updateEvent?eventid=${event.eventid}`, updatedFormData);
                            console.log("API Response:", response.data);
                            alert('Event Request Successfully Declined!');
                            window.location.reload();
                        } catch (error) {
                            console.error('Error accepting event request:', error);
                        }
                        }}>Decline</Button>
                </div>
            </div>
            {/* </Container> */}
        </div>
    )
}
