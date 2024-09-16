import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from './UserProvider'

export default function OrganizerReq() {
  const { user } = useUser();
  const navigate = useNavigate();
  // const isUserValid = user && user.eventTitle.trim() !== '';

  const validateForm = () => {
    // Check if required fields are filled
    if (
      user.fname &&
      user.mname &&
      user.lname &&
      user.dept &&
      user.email &&
      user.gender &&
      user.dob &&
      user.mobNum &&
      user.city &&
      user.country &&
      user.bio 
    ) {

      // If all checks pass, the form is valid
      return true;
    }

    // If any required field is missing, the form is not valid
    return false;
  };

  console.log("Is Form Valid:", validateForm());
  return (
    <div>
        <div style={{ position: 'relative', display: "flex", justifyContent: "center", height: '100%', width: '100%', margin: "0 auto", padding: 0 }}>
                <img style={{ minWidth: '100%', minHeight: '20vw', objectFit: 'cover', marginTop: 0}} src="/img/organreq.jpg" alt="logo" className='logo' />
                <Button sx={{
                    backgroundColor: '#EAA021', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '19rem', height: '4rem', fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
                    display: "flex", justifyContent: "center", padding: 0, borderRadius: 50, zIndex: 2, position: 'absolute', top: '78%', left: '67.5%', transform: 'translate(-50%, -50%)'
                }} onClick={() => (validateForm() ? navigate('/OrganizerAppllicationForm') : alert('Please fill in your user profile first'))}>Organize an Event</Button>
            </div>
    </div>
  )
}
