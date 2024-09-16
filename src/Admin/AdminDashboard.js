import React, { useState, useEffect } from 'react';
import AdminHeader from '../Components/adminHeader';
import { Button, Container } from '@mui/material';
import Footer from '../Components/footer';
import AdminEventReqDetails from './AdminEventReqDetails';
import axios from 'axios';

export default function Dashboard() {
  const [showDetails, setShowDetails] = useState(false);
  const [totalEvents, setTotalEvents] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [pastEvents, setPastEvents] = useState(null);
  const [organizerRequest, setOrganizerRequest] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalOrganizers, setTotalOrganizers] = useState(null);
  const [organizerRequests, setOrganizerRequests] = useState(null);
  const [eventAccepted, setEventsAccepted] = useState([]);
  const [eventRequested, setEventsRequested] = useState([]);
  const [eventDate, setEventsDate] = useState([]);
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const textColor = '#8A92A6';
  const buttonFontSize = '16px';
  const buttonWidth = '300px';
  const buttonHeight = '100px';
  const buttonBorderWidth = '0.5px';
  const [isVisible, setIsVisible] = useState(true);

  const handleButtonClick = () => {
    setIsVisible(false);
  };

  const handlePrint = () => {
    setIsVisible(false);
    setTimeout(() => {
      window.print();
    }, 100);
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  };

  const fetchData = async (url, setterFunction) => {
    try {
      const response = await axios.get(`http://localhost:8080/${url}`);
      setterFunction(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData('manageOrganizerRequest/getAllManageOrganizerRequests', (data) => {
      setOrganizerRequest(data.filter(participant => participant.status === "Pending"));
    });
    fetchData('Event/getAllEvents', setTotalEvents);
    fetchData('Event/getAllEvents', (data) => {
      setTotalEvents(data.filter(participant => participant.isDeleted === 0));
    });
    fetchData('User/getAllUsers', setTotalUsers);
    fetchData('organizer/getAllOrganizers', setTotalOrganizers);
    // Fetch other data as needed
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/Event/getAllEvents')
      .then(response => {
        const filteredAccepted= response.data.filter(participant => participant.status === 1);
        const filteredRequested= response.data.filter(participant => participant.status === null);
        const filteredDate= response.data.filter(participant => participant.date < formattedCurrentDate);
            console.log("filteredDate",filteredDate)
            // Set the filtered participants
            console.log("filteredAccepted",filteredAccepted)
            console.log("currentDate",currentDate)
            setEventsAccepted(filteredAccepted);
            setEventsRequested(filteredRequested);
            setEventsDate(filteredDate);
            // Set the events if needed
            // setEvents(filteredParticipants);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);


  return (
    <div>
      <AdminHeader />
      <img src="./img/GLE-Building.png" alt="logo" className="banner" />
      <Container maxWidth="lg">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isVisible && (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrint}
              style={{ width: '10rem' }}
            >
              Export
            </Button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
            variant="contained"
            color="primary"
            style={{
              marginRight: '10px',
              color: textColor,
              backgroundColor: 'white',
              fontSize: buttonFontSize,
              width: buttonWidth,
              height: buttonHeight,
              border: `${buttonBorderWidth}px solid black`,
            }}
            disabled
          >
            {totalEvents ? totalEvents.length : 0}
            <br />
            
            Total Events: 
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            style={{
              marginRight: '10px',
              color: textColor,
              backgroundColor: 'white',
              fontSize: buttonFontSize,
              width: buttonWidth,
              height: buttonHeight,
              border: `${buttonBorderWidth}px solid black`,
            }}
            disabled // Set disabled attribute to make the button not clickable
          >
            {eventAccepted ? eventAccepted.length : 0}
            <br />
            Upcoming Events
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              color: textColor,
              backgroundColor: 'white',
              fontSize: buttonFontSize,
              width: buttonWidth,
              height: buttonHeight,
              border: `${buttonBorderWidth}px solid black`,
            }}
            disabled // Set disabled attribute to make the button not clickable
          >
            {eventDate ? eventDate.length : 0}
            <br />
            Past Events
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              marginRight: '10px',
              color: textColor,
              backgroundColor: 'white',
              fontSize: buttonFontSize,
              width: buttonWidth,
              height: buttonHeight,
              border: `${buttonBorderWidth}px solid black`,
            }}
            disabled // Set disabled attribute to make the button not clickable
          >
            {eventRequested ? eventRequested.length : 0}
            <br />
            Event Requests
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{
              marginRight: '10px',
              color: textColor,
              backgroundColor: 'white',
              fontSize: buttonFontSize,
              width: buttonWidth,
              height: buttonHeight,
              border: `${buttonBorderWidth}px solid black`,
            }}
            disabled
          >
            {totalUsers ? totalUsers.length : 0}
            <br />
           
            Total Users: 
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{
              marginRight: '10px',
              color: textColor,
              backgroundColor: 'white',
              fontSize: buttonFontSize,
              width: buttonWidth,
              height: buttonHeight,
              border: `${buttonBorderWidth}px solid black`,
            }}
            disabled
            
          >
            {totalOrganizers ? totalOrganizers.length : 0}
            <br />
            Total Organizers
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{
              color: textColor,
              backgroundColor: 'white',
              fontSize: buttonFontSize,
              width: buttonWidth,
              height: buttonHeight,
              border: `${buttonBorderWidth}px solid black`,
            }}
            disabled
          >
            {organizerRequest ? organizerRequest.length : 0}
            <br />
            Organizer Requests
          </Button>
        </div>
        <br /><br />
        {showDetails && (
          <AdminEventReqDetails
            setShowDetails={setShowDetails}
            
          />
        )}
      </Container>
      <Footer />
    </div>
  );
}