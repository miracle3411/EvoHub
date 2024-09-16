import React from 'react'
import './EventUserHome.css'
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

export default function EventUserHome() {
  return (
    <>
    <div className='userHome'>
    <AppBar sx={{width: "100%", maxWidth: "100%", height: "60px", margin: "0 auto", padding: "0", display: "block", backgroundColor: "white" }}>
        <Toolbar>

        <Typography >
            <img src="/img/citlogo.png"  className='citlogo'/>
            </Typography>
            <Typography >
            <Button style={{color: "black"}}>Home</Button>
            </Typography>
        </Toolbar>
        
    </AppBar>
    </div>

    </>
  );
}
