import React, { useState } from "react";
import Container from "@mui/material/Container";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResponsiveAppBarOrgan from "../Components/organHeader";
import ButtonM from "../Components/ButtonMaroon";
import { Link } from 'react-router-dom'

export default function Attendees() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const [formData, setFormData] = useState({
    year: "",
    department: "",
    payment: "",
    max: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here
    // For example, you can send the formData to a server

    // Log the form data to the console (for demonstration purposes)
    console.log(formData);
  };

console.log(formData)
  return (
    <>
      <ResponsiveAppBarOrgan/>
      <img src="img/createEventBanner.png" alt="logo"  style={{width:"100%"}} />
      <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid  xs={8}>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif" ,textAlign:"left"}}>Attendees Requirements</h2>

            <form onSubmit={handleSubmit}>
               {/* Specify year Level*/}
               <div className="form-group" style={{ marginTop: "2rem" }}>
              <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Specify year Level
                  </h5>
                  <select
                    id="year"
                    name="year"  // Make sure the name attribute is "location"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    style={{
                      width: "45%",
                      height: "50px",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4<">4</option>
                    <option value="5">5</option>
                    <option value="None">None</option>  {/* Corrected the spelling here */}
                  </select>
                </div>

                {/* Specify department*/}
                <div className="form-group" style={{ marginTop: "2rem" }}>
              <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Specify department
                  </h5>
                  <select
                    id="department"
                    name="department"  // Make sure the name attribute is "location"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    style={{
                      width: "45%",
                      height: "50px",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <option value="CEA">CEA</option>
                    <option value="CCS">CCS</option>
                    <option value="CMBA">CMBA</option>
                    <option value="CASE<">CASE</option>
                    <option value="CNAHS">CNAHS</option>
                    <option value="CCJ">CCJ</option>  {/* Corrected the spelling here */}
                    <option value="None">None</option>  {/* Corrected the spelling here */}
                  </select>
                </div>

                {/* Specify payment*/}
                <div className="form-group" style={{ marginTop: "2rem" }}>
              <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Specify payment
                  </h5>
                  <select
                    id="payment"
                    name="payment"  // Make sure the name attribute is "location"
                    value={formData.payment}
                    onChange={handleChange}
                    required
                    style={{
                      width: "45%",
                      height: "50px",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {/*  Maximum Attendees */}
                <div className="form-group" style={{ flex: 1 }}>
                  <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Maximum Attendees
                  </h5>
                  <input
                    type="number"
                    id="max"
                    name="max"
                    value={formData.max}
                    onChange={handleChange}
                    placeholder="Number of Attendees"
                    style={{
                      width: "45%",
                      height: "45px",
                      borderRadius: "45px",
                      padding: "0 15px",
                    }}
                    required
                  />
                </div>


              {/* Submit Button */}
              <div
                className="form-group"
                style={{ marginTop: "2rem", textAlign: "center" }}
              >
                <ButtonM name="Submit"/>
              </div>
            </form>

          </Grid>
          <Grid  xs={4}>
            <img src="img/tips.png" alt="logo"  style={{width:"100%"}} />
          </Grid>
          
        </Grid>
      </Box>

      </Container>
    </>
  );
}
