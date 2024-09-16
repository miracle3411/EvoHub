import React from 'react'
import Container from '@mui/material/Container';

export default function CampusVenues() {
    const venues = [
        { image: "/img/coveredcourt.jpg" },
        { image: "/img/sal.jpg" },
        { image: "/img/gym.jpg" },
        { image: "/img/masscom.jpg" },
        { image: "/img/lr.jpg" },
        { image: "/img/accre.jpg" }
    ];
    return (
        <div>
            <Container maxWidth="lg">
                <div>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", display: "flex", justifyContent: "center", marginTop: "10rem" }}>Campus Venues</h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", display: "flex", justifyContent: "center", marginBottom: "2rem" }}>Discover Our Diverse Cmapus Venues: Explore the Options for Your Next Event Gathering</p>
                </div>

                {venues.map((venue, index) => (
                    <img style={{ width: "22rem", borderRadius: "1rem", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem" }} src={venue.image} key={index} alt={venue.title} />
                ))}

            </Container>
        </div>
    )
}
