import React from 'react'
import { Button, Grid } from "@mui/material";
import Container from '@mui/material/Container';


export default function AboutUs() {
    return (
        <div>
            <Container maxWidth="lg">
                <div>

                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={7.5}>
                                <Button disabled sx={{
                                    backgroundColor: '#EAA021', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '19rem', height: '4rem',
                                    fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', display: "flex", justifyContent: "center",
                                    padding: 0, borderRadius: 50, zIndex: 2, "&.Mui-disabled": { color: "white" }
                                }}>About Us</Button>
                                <p style={{ marginBottom: "2rem", fontFamily: "'DM Sans', sans-serif" }}>Welcome to the Cebu Institute of Technology University (CIT-U) Event Management Platform, your gateway to the exciting world of events! We offer a specialized platform for event management that caters to the unique needs and interests of our university community. </p>

                                <Button disabled sx={{
                                    backgroundColor: '#EAA021', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '19rem', height: '4rem',
                                    fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', display: "flex", justifyContent: "center",
                                    padding: 0, borderRadius: 50, zIndex: 2, "&.Mui-disabled": { color: "white" }
                                }}>Our Mission</Button>
                                <p style={{ fontFamily: "'DM Sans', sans-serif" }}>Our mission is to connect students, and faculty with their passions and interests through seamless event management. We believe that every event, whether it's a seminar, club meeting, or a cultural celebration, plays a vital role in enriching our academic and cultural life.</p>

                            </Grid>
                            <Grid item xs={4.5}>
                                <img style={{ width: "100%", height: "100%", borderRadius: 20, display: "flex", objectFit: "cover" }} src="/img/about.jpg" alt="aboutus" />
                            </Grid>
                        </Grid>

                    </div>
                </div>
            </Container>
        </div>
    )
}
