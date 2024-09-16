import React from 'react'
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Button, Grid } from '@mui/material';
import Footer from '../Components/footer';
import { Link } from 'react-router-dom';
import { useUser } from '../Components/UserProvider';
import ResponsiveAppBarOrgan from '../Components/organHeader';
import { useOrganizer } from '../Components/OrganizerProvider';

export default function OrganizerProfile() {
    const { organizer } = useOrganizer();
    return (
        <div>
            <ResponsiveAppBarOrgan />
            <div >

                <img src="./img/userprofile.jpg" alt="logo" className="banner" style={{ position: "absolute", zIndex: -1 }} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ marginTop: "8.6rem" }}>
                        <Avatar alt={organizer.fname} src="/static/images/avatar/2.jpg" sx={{ width: 120, height: 120, fontSize: "3.5rem" }} />
                        <div>

                        </div>

                    </div>

                </div>
                <div style={{ marginTop: "1rem", textAlign: "center", marginTop: "-1.5rem", fontFamily: "'DM Sans', sans-serif" }}>
                    <h2 style={{ fontSize: "2.8rem" }} >{organizer.fname} {organizer.lname}</h2>
                    <p style={{ fontSize: "1.2rem", marginTop: "-1.8rem" }}>{organizer.organization}</p>
                </div>
                   <div style={{ textAlign: "right", marginTop: organizer.organization === null || organizer.organization === '' ? "11rem" : "7.4rem", marginRight: "9.5rem", fontFamily: "'DM Sans', sans-serif",  }}>
                    <Link to="/OrganizerProfileEdit"> <Button sx={{ color: 'black', padding: 0, margin: 0 }}><p style={{ fontSize: ".9rem" }}><u>Edit Profile</u></p></Button></Link>
                </div>
                

            </div>
            <Container maxWidth="lg" sx={{ marginBottom: "5rem" }}>
                <div>
                    <Grid container spacing={2} style={{ margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
                        <Grid item xs={6} md={6}>
                            <p><b>First Name:</b> {organizer.fname}</p>
                            <p><b>Middle Name:</b> {organizer.mname}</p>
                            <p><b>Last Name:</b> {organizer.lname}</p>
                            <p><b>Role:</b> {organizer.role}</p>
                            <p><b>Department:</b> {organizer.department}</p>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            
                            <p><b>Email Address:</b> {organizer.email}</p>
                            <p><b>Phone:</b> {organizer.mobNum}</p>
                        </Grid>
                        <Grid item xs={12} md={6}>


                        </Grid>
                    </Grid>
                    <div style={{ border: "1px solid black", height: "10rem", width: "100%", margin: "0 auto", borderRadius: "20px", margin: "2rem auto", padding: '1rem' }}>
                        <p>{organizer.bio}</p>
                    </div>

                </div>
            </Container>
            <Footer />
        </div>
    )
}
