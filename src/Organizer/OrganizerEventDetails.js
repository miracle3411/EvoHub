import React, { useState, useEffect } from 'react';
import Footer from '../Components/footer';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EventRibbon_noBtn from '../Components/EventRibbon_noBtn';
import ResponsiveAppBarOrgan from '../Components/organHeader';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/PopUp';


export default function EventDetails() {
  const [event, setEvents] = useState({});
  const { eventId } = useParams();
  const [requestCount, setRequestCount] = useState();
  const [joinedCount, setJoinedCount] = useState();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [participant,setParticipants] =useState([{}]);
  


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
        const origPart = tmpPart.filter(tmpPar => tmpPar.eventId == eventId && tmpPar.status === 'Accepted' );

        const reqPart = tmpPart.filter(tmpPar => tmpPar.eventId == eventId && tmpPar.status === null );

        setJoinedCount(origPart.length);
        setRequestCount(reqPart.length)

      })
      .catch(error => {
        console.error('Error fetching participants:', error);
      });
  }, []);

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
            console.log(event.eventid)
        }
    } else {
            // Reload the window
            window.location.reload();

    }
  }
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
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <ResponsiveAppBarOrgan />
      {/* Menu For Participants Here */}
      <div style={{ background: '#C02147', height: '85px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'fixed', top: '89px', width: '100%', zIndex: 1000 }}>
        <Link to={`/ViewAttendees/${event.eventid}`} style={{ textDecoration: 'none' }}>
          <Button sx={{
             backgroundColor: 'white', color: 'maroon', fontFamily: "'DM Sans', sans-serif", width: '11rem', height: '3rem', fontWeight: 'bold',
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
            <Button style={{ backgroundColor: '#aaa', color: '#fff' }} onClick={closeModal}>
              Close
            </Button>
            <Button style={{ backgroundColor: '#ff5050', color: '#fff' }} onClick={handleDelete}>
              Delete
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
        <p style={{ textAlign: 'justify', width: '810px', marginRight: '350px', marginLeft: '150px', fontSize: '20px', textDecoration: 'underline' }}>Cebu Institute of Technology</p>
      </Container>
      <br />
      <br />
      <div>
      
 
          <EventRibbon_noBtn date={event.date} time={event.time} venue={event.location} joined={joinedCount} request={requestCount} />
      </div>
      <br />
      <br />
      <Container maxWidth="lg">
        <br />
        <div style={{ textAlign: 'center' }}>
          
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', textAlign: 'left' }}>About this event</h2>
            <p style={{ textAlign: 'left'}}>
              {event.description }
            </p>

          <br />
          <br />
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', textAlign: 'left' }}>Head Organizer</h2>

          <p style={{ textAlign: 'left', fontSize: '14px' }}>{event.organizer}</p>

          <br />
          <br />
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>

      <Footer />
    </div>
  );
}
