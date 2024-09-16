import React from 'react';
import { Button, Grid } from "@mui/material";
import Container from '@mui/material/Container';

export default function ParticipantDecline({feedback}) {
  // Define the border style
  const borderStyle = {
    border: '1px solid #000', // You can customize the border color and style
    padding: '10px', // Optional: Add padding for better appearance
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <Container maxWidth="lg">
      <div style={borderStyle}>
        <div style={{ textAlign: "center" }}>
          <h2>Declined!</h2>
          <p>{feedback}</p>
        </div>
      </div>
    </Container>
  );
}
