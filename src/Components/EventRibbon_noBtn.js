import { Typography } from "@mui/material";
import './EventRibbon.css';
import React, { useRef, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

// Function to convert military time to AM/PM format
const convertToAmPm = (militaryTime) => {
  if (!militaryTime) {
    return ''; // Return an empty string or handle the case when time is undefined
  }

  const timeArray = militaryTime.split(':');
  const hours = parseInt(timeArray[0], 10);
  const minutes = timeArray[1];
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${formattedHours}:${minutes} ${period}`;
};

export default function EventRibbon_noBtn  ({  date, time, venue, joined, request })  {
  // Convert military time to AM/PM format
  const formattedTime = convertToAmPm(time);
  const { eventId } = useParams();
// const [requestCount, setRequestCount] = useState(0);
// const [joinedCount, setJoinedCount] = useState(0);

// useEffect(() => {
//     window.scroll(0, 0);
  
//     axios.get('http://localhost:8080/participantrequest/getAllParRequests')
//       .then(response => {
//         // Filter requests based on the eventId and status
//         const filteredRequests = response.data.filter(participant => participant.eventId === eventId);
        
//         // Set the count of requests with status === 0
//         setRequestCount(filteredRequests.filter(participant => participant.status === 0).length);
  
//         // Set the count of joined participants with status === 1
//         setJoinedCount(filteredRequests.filter(participant => participant.status === 1).length);
//       })
//       .catch(error => {
//         console.error('Error fetching requests:', error);
//       });
//   }, [eventId]);
  

  return (
    <div className="event-ribbon-header">
        <div style={{ textAlign: 'center', alignItems: 'center', fontFamily: 'DM Sans, sans-serif', marginLeft: '200px', marginRight: '-200px' }}>
        <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '16px' }}>
            Date & Time
        </Typography>
        <Typography variant="subtitle1" style={{ fontSize: '14px' }}>
            {date}, {formattedTime}
        </Typography>
        </div>
        <div style={{textAlign:'center', alignItems:'center',fontFamily:'DM Sans, sans-serif',marginLeft:'-100px',marginRight:'-200px',fontSize:'12px'}}>
                <Typography variant="h6" style={{fontWeight:'bold',fontSize:'16px'}}>
                    Venue</Typography>
                <Typography variant="subtitle1" style={{fontSize:'14px'}}>
                    {venue}</Typography>
        </div>
        <div style={{ textAlign: 'center', alignItems: 'center', fontFamily: 'DM Sans, sans-serif', marginLeft: '-100px', marginRight: '-100px', fontSize: '12px' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '16px' }}>
              Attendees Request
          </Typography>
          <Typography variant="subtitle1" style={{ fontSize: '14px' }}>
              {request}
          </Typography>
        </div>
    
    <div style={{textAlign:'center', alignItems:'center',fontFamily:'DM Sans, sans-serif',marginLeft:'-200px',marginRight:'200px',fontSize:'12px'}}>
            <Typography variant="h6" style={{fontWeight:'bold',fontSize:'16px'}}>
                Joined</Typography>
            <Typography variant="subtitle1" style={{fontSize:'14px'}}>
                {joined} Rsvp'd</Typography>
    </div>
      
    </div> 
  );
};