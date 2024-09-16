import React from 'react'
import './LoginRegister.css'
import { Button, Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

export default function Event() {
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      
      <div className="eve-container">
      <Container maxWidth="x1">
        <Grid container spacing={2} style={{ margin: "0 auto" }}>
          <Grid item xs={12} md={6}>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="in-container">
              <h1 style={{ fontFamily: "'DM Sans', sans-serif" }}>Enjoy with us</h1>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif" }}>Join us today</h2>

              <Link to="/EventUser"><Button variant="outlined"><img className='user-image' src="/img/user.png" />Sign in as User</Button></Link><br />
              <Link to="/EventOrganizer"><Button variant="outlined"><img className='user-image' src="/img/organizer.png" />Sign in as Organizer</Button></Link><br />
              <Link to="/EventAdmin"><Button variant="outlined"><img className='user-image' src="/img/admin.png" />Sign in as Admin</Button></Link>
              <div style={{ display: "flex", padding: 0, margin: "0 auto", justifyContent: "center" }}>
                <div className='horizonBar'></div>

                <p className='or'>OR</p>

                <div className='horizonBar'></div>
              </div>
              <Link to="/EventRegister"><Button sx={{ backgroundColor: "#800000", ":hover": { backgroundColor: "#800000" } }} variant="contained">Sign up</Button></Link>
              <p className='terms' style={{ fontFamily: "'DM Sans', sans-serif" }}>By signing up, you agree to the <u>Terms of Service</u> and <u>Privacy Policy</u>, including <u>cookie use</u>.</p>
            </div>
            <div>
            
            </div>
           
          </Grid>
        </Grid>
        </Container>
        
      </div>
      
    </>
  );
}
