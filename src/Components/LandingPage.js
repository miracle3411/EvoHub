import { Button, Container, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';

export default function LandingPage() {
  const navigate = useNavigate();

  const [event, setEvents] = useState([]);

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

  // const [searchValue, setSearchValue] = useState('');

  // const handleSearchChange = (event, value) => {
  //   setSearchValue(value);
  // };

  // const filteredEvents = event.filter(
  //   (event) =>
  //     event.status === 1 || event.title.toLowerCase().includes(searchValue.toLowerCase())
  // );

  const submitForm = async () => {
    axios.get('http://localhost:8080/Event/getAllEvents')
    .then(response => {
      const filteredEvents = response.data.find(participant => participant.status === 1 && participant.title === document.getElementById('searchEvent').value);
      console.log(filteredEvents)
      // Set the filtered participants
      console.log("event: ", filteredEvents);
      navigate(`/UserEventPage/${filteredEvents.eventid}`)
      // Set the events if needed
      // setEvents(filteredParticipants);
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    });
  }

  // useEffect(() => {
  //   axios.get('http://localhost:8080/Event/getAllEvents')
  //             .then(response => {
  //               const filteredEvents = response.data.find(participant => participant.status === 1 || participant.title === document.getElementById('searchEvent').value);
  //               console.log(filteredEvents)
  //               // Set the filtered participants
  //               setEvents(filteredEvents);
  //               // Set the events if needed
  //               // setEvents(filteredParticipants);
  //             })
  //             .catch(error => {
  //               console.error('Error fetching events:', error);
  //             });
  // }, []);

  return (
    <div style={{ position: 'relative', display: "flex", justifyContent: "center", height: '100%', width: '100%', margin: "0 auto", padding: 0 }}>
      <div style={{ display: "flex", justifyContent: "center", height: '100%', width: '100%', margin: "0 auto", padding: 0 }}>
        <img style={{ minWidth: '100%', minHeight: '35vw', objectFit: 'cover', marginTop: 0 }} src="/img/land.jpg" alt="logo" className='logo' />
      </div>
      <div style={{
        backgroundColor: '#C02147', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '68rem', height: '8.5rem', fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
        display: "flex", justifyContent: "center", alignItems: "center", padding: 0, borderRadius: 50, zIndex: 2, position: 'absolute', top: '86%', left: '50%', transform: 'translate(-50%, -50%)'
      }}>
        {/* <TextField
          className='txt'
          id='searchEvent'
          label="Search event here..."
          type="text"
          variant='outlined'
          InputProps={{ sx: { backgroundColor: 'white', height: "5rem" } }}
          InputLabelProps={{ sx: { position: 'absolute', top: '.2rem' } }}
          sx={{ margin: "0", padding: 0, width: "38rem", right: "1.5rem" }}

        /> */}
        {/* <Autocomplete
      id="searchEvent"
      // options={filteredEvents}
      options={event.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search event here..."
          variant="outlined"
          InputProps={{ sx: { backgroundColor: 'white', height: '5rem' } }}
          InputLabelProps={{ sx: { position: 'absolute', top: '.2rem' } }}
          sx={{ margin: '0', padding: 0, width: '38rem', right: '1.5rem' }}
        />
      )}
      // onInputChange={handleSearchChange}
    /> */}
     <Autocomplete
        id="searchEvent"
        freeSolo
        options={event.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="Search event here..." variant='standard' sx={{marginLeft: "1rem", width: '36rem'}}/>}
        sx={{ margin: "0", padding: 0, width: "38rem", right: "1.5rem", backgroundColor: 'white', borderRadius: 50 }}
      />
        <Button  sx={{
          backgroundColor: '#EAA021', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '18rem', height: '4rem',
          display: "flex", justifyContent: "center", left: "1.5rem", padding: 0, borderRadius: 50
        }}
          onClick={submitForm}>Search Event</Button>
      </div>
    </div>
  )
}
