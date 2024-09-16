
import Footer from "../Components/footer";
import EventRibbon_noBtn from "../Components/EventRibbon_noBtn";
import { Avatar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , Container} from '@mui/material';
import axios from 'axios';
import "../Components/EventCatBtn.css";
import React, { useState, useEffect } from 'react';
import ResponsiveAppBarOrgan from "../Components/organHeader";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/PopUp';

export default function ViewAttendees(){
    const [filterValue, setFilterValue] = useState('');
    const [event, setEvents] = useState({});
    const { eventId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [requestCount, setRequestCount] = useState();
    const [joinedCount, setJoinedCount] = useState();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
   
    useEffect(() => {
        window.scroll(0, 0);
        axios.get(`http://localhost:8080/Event/getEvent/${eventId}`)
          .then(response => {
            console.log(response.data);
            setEvents(response.data);
          })
          .catch(error => {
            console.error('Error fetching events:', error);
          });
      }, [eventId]);
      useEffect(() => {
        axios.get('http://localhost:8080/participantrequest/getAllParRequests')
          .then(response => {
            // setEvents(response.data);
            const tmpPart = response.data;
            // console.log("tmpPart: ",tmpPart);
            // console.log("TMPeventId: ",tmpPart.eventId);
            const origPart = tmpPart.filter(tmpPar => tmpPar.eventId == eventId && tmpPar.status === 'Accepted' );
    
            const reqPart = tmpPart.filter(tmpPar => tmpPar.eventId === eventId && tmpPar.status === null );
            setParticipants(origPart);
            console.log("origPart: ",origPart);
            console.log("EventId: ",eventId);
            setJoinedCount(origPart.length);
            setRequestCount(reqPart.length)
            console.log("origPartCount1: ",origPart);
            console.log("origPartCount: ",origPart.length);
            
          })
          .catch(error => {
            console.error('Error fetching participants:', error);
          });
      }, []);

    function createData(prid, firstname, lastname, email, department, yearlevel, eventId, userId) {
        return { prid, firstname, lastname, email, department, yearlevel, eventId, userId };
    }
    const rows = participants.map(participant =>
        createData(
            participant.prid,
            participant.firstname,
            participant.lastname,
            participant.email,
            participant.department,
            participant.yearlevel,
            participant.eventId,
            participant.userId
        )
    );
    const filteredRows = rows.filter((row) => (!filterValue || row.carbs === filterValue));

    const handleUpdateAlert = () => {
        // When clicked
        const confirmEdit = window.confirm('Are you sure you want to edit the event?');

        if (confirmEdit) {
            // Check if event.id is available
            if (event.eventid) {
                // If yes, navigate to the "UpdateEvents" page
                navigate(`/UpdateEvents/${eventId}`);
            } else {
                // If event.id is not available, you may want to handle this case accordingly
                console.error('Event ID is not available');
            }
        } else {
                // Reload the window
                window.location.reload();

        }
    }
    const openModal = () => {
        setModalOpen(true);
      };
    
    const closeModal = () => {
    setModalOpen(false);
    };
    const handleDelete = async () => {
        try {
          await axios.put(`http://localhost:8080/Event/updateEvent?eventid=${eventId}`,
          
          {
            "eventid": event.eventId,
            "title": event.title,
            "description": event.description,
            "date": event.date,
            "time": event.time,
            "duration": event.duration,
            "location": event.location,
            "organizer": event.organizer,
            "yearlevel": event.yearlevel,
            "department": event.department,
            "payment": event.payment,
            "maxAttend": event.maxAttend,
            "image": event.image,
            "orgid": event.orgid,
            "status": event.status,
            "isDeleted": 1
    
        });
      
          navigate('/MyEvents');
        } catch (error) {
          // Handle errors, e.g., show an error message
          alert('Error deleting event:', error);
        }
      };
    console.log('rows:', participants);
    return (
        <>
            <ResponsiveAppBarOrgan />
            {/* MENU FOR REQUESTS HERE */}
            <div style={{ background: '#C02147', height: '85px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'fixed', top: '89px', width: '100%', zIndex: 1000 }}>
                <Link to={`/ViewAttendees/${event.eventid}`} style={{ textDecoration: 'none' }}>
                <Button sx={{
                    backgroundColor: 'white', color: 'grey', fontFamily: "'DM Sans', sans-serif", width: '11rem', height: '3rem', fontWeight: 'bold',
                    display: "flex", justifyContent: "center", padding: 0, borderRadius: 50,marginRight: '10px'
                }}>
                    View Attendees
                </Button>
                </Link>
                <Link to={`/AttendeeRequests/${event.eventid}`} style={{ textDecoration: 'none' }}>
                <Button sx={{
                    backgroundColor: 'white', color: 'maroon', fontFamily: "'DM Sans', sans-serif", width: '11rem', height: '3rem', fontWeight: 'bold',
                    display: "flex", justifyContent: "center", padding: 0, borderRadius: 50
                }}>Manage Requests
                </Button>
                </Link>
                
                    <Button onClick = {handleUpdateAlert}>
                        <img src="/img/EditWhite.png" alt="Edit" />
                    </Button>
                
                    <Button onClick={openModal}>
                        <img src="/img/DeleteWhite.png" alt="Edit" />
                    </Button>

                    {/* Render the Modal component */}
                    <Modal isOpen={isModalOpen} onClose={closeModal} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ textAlign: 'center' }}>Are you certain you wish to delete the event?</p>
                        <p style={{ color: 'grey', fontSize: '14px', fontStyle: 'italic', textAlign: 'center' }}>
                            This action will promptly eliminate the event from the administrator's records.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                            <Button style={{ backgroundColor: '#ff5050', color: '#fff' }} onClick={handleDelete}>
                            Delete
                            </Button>
                            <Button style={{ backgroundColor: '#aaa', color: '#fff' }} onClick={closeModal}>
                            Close
                            </Button>
                            
                        </div>
                    </Modal>
                
            </div>   
            <Container maxWidth="lg">
            <br />
            <br />
            <br />
            <img
                src={`/uploads/${event.image}`}
                alt="here"
                style={{
                width: '100%',
                height: '500px',
                borderRadius: '45px', // Adjust the radius as needed
                display: 'block',
                margin: 'auto',
                marginTop: '150px'
            }}
            />
                   <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '32px', marginRight: '600px', marginLeft: '150px' }}>{event.title}</h3>

                    <p style={{ textAlign: 'justify', width: '810px', marginRight: '350px', marginLeft: '150px', fontSize: '20px', textDecoration: 'underline' }}>Cebu Institute Technology</p>

                    {/* New text added below Cebu Institute Technology */}
                    <p style={{ textAlign: 'justify', width: '810px', marginRight: '350px', marginLeft: '150px', fontSize: '18px' }}>
                    {event.department === 'None' ? 'Open to every department' : `This event is exclusively for ${event.department} college students.`}
                    <br/>
                    {event.yearlevel === 0 ? 'Open to all levels! Join us for a fantastic time!' : `This event is exclusively for ${event.yearlevel}th year  college students.`}
                    <br/>
                    {event.payment === 'No' ? "Complimentary attendance—no payment required." : "Please note that payment is required for participation."}
                    </p>
            </Container>
            <br></br>
            <br></br>
            <div>
                {/* RIBBON HERE */}
                <EventRibbon_noBtn
                venue={event.location}
                time={event.time}
                date={event.date}
                joined={joinedCount}
                request={requestCount}

                 />
            </div>
            <Container maxWidth="lg">
            <br />
            <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', textAlign: 'left' }}>About this event</h2>
            <p style={{ textAlign: 'left'}}>
              {event.description }
            </p>
            </div>
            <br></br>
            <br></br>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', width: '300px', textAlign: 'center', marginLeft: '200px' }}>
                View Attendees
            </h2>
            {/* table */}
            <div className="attendee-table">
                {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
                    {/* <div> */}
                        {/* Dropdown/Select for filtering */}
                        {/* <Select
                            value={filterValue}
                            onChange={(e) => { setFilterValue(e.target.value) }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}

                        >
                            <MenuItem value="" >
                                All
                            </MenuItem>
                            {/* Add unique carb values from your rows */}
                            {/* {[...new Set(rows.map((row) => row.carbs))].map((carbs) => (
                                <MenuItem key={carbs} value={carbs}>
                                    {carbs}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <TextField
                            className='txt'
                            id="fname"
                            label="Search"
                            type="text"
                            variant='outlined'
                        />
                    </div> */}
                {/* </div> */}
                {/* <br/> */} 
                {/* TABLE */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#C02147' }}>
                                <TableCell align="center" sx={{ color: 'white' }}>Attendees</TableCell>

                                <TableCell align="center" sx={{ color: 'white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>Year Level</TableCell>
                                {/* <TableCell align="center" sx={{ color: 'white' }}></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <TableRow
                                    key={row.prid}
                                    // TableRow contents
                                >
                                   <TableCell component="th" scope="row" align='center'>
                                                <div style={{display:'flex', alignItems:'center'}}>
                                                <Avatar  alt={row.name} src="/static/images/avatar/2.jpg"  sx={{marginRight:'1rem'}} />
                                                    <div>
                                                       {row.firstname} {row.lastname}
                                                    <p>{row.email}</p> 
                                                    </div>
                                                    </div>
                                                    
                                    </TableCell>
                                    <TableCell align="center">{row.department}</TableCell>
                                    <TableCell align="center">{row.yearlevel}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ border: '2px', borderColor: 'black', marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button>Previous</Button>
                        <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>Page 1 of 1</p>
                        <Button>Next</Button>
                    </div>
                </div>
            </div>
        </Container>
        <Footer/>
        </>
    )
}