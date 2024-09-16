import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField, IconButton, InputAdornment } from "@mui/material";
import './UserLogin.css'
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useUser } from '../Components/UserProvider';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function EventUser() {
    const { login } = useUser();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   
   

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleLogIn = async () => {
        if (document.getElementById("email").value !== "" || document.getElementById("pass").value !== "") {
            const email = document.getElementById("email").value;
            const pass = document.getElementById("pass").value;
    
            try {
                const userResponse = await axios.get('http://localhost:8080/User/getAllUsers');
                const organizerResponse = await axios.get('http://localhost:8080/organizer/getAllOrganizers');
    
                const users = userResponse.data;
                const organizers = organizerResponse.data;
    
                // Check if the user's email exists in the list of organizers
                const isOrganizer = organizers.some(org => org.email === email);
                if (isOrganizer) {
                    alert('Your email is associated with an organizer account. Please log in using the organizer login.');
                    return;
                }
    
                const user = users.find(user => user.email === email && user.pass === pass);
    
                if (user) {
                    // Login successful
                    if (!isChecked) {
                        alert('Please agree to the Terms and Conditions.');
                        return;
                    }
    
                    login(user);
                    setIsLoggedIn(true);
                    console.log('User logged in:', user);
    
                } else {
                    alert('Invalid email or password');
                    // Handle invalid login (show error message, etc.)
                }
            } catch (error) {
                console.error('There was a problem with the login operation:', error);
                // Handle login failure, show error message, etc.
            }
        } else {
            alert("Please enter email or password");
            return;
        }
    };
    
    useEffect(() => {
        // Check if registration is successful
        if (isLoggedIn) {
            // Redirect or show a success message as needed
            navigate('/EventUserHome');
        }
    }, [isLoggedIn]);

    return (
        <>
            <div className="user-container">
                <Container maxWidth="x1">
                    <Grid container spacing={2} style={{ margin: "0 auto" }}>
                        <Grid item xs={12} md={6}>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="in-container">
                                <img className='user' src="/img/user.png" />
                                <Link to="/"><Button sx={{ left: '52%', position: 'absolute' }} ><img className='back' src="/img/back.png" /></Button></Link>
                                <h1 style={{ fontFamily: "'DM Sans', sans-serif" }}>Log In as User</h1>
                                <div>
                                    <TextField
                                        className='txt'
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        variant='outlined'
                                    /><br />
                                    {/* <TextField
                                        className='txt'
                                        id="pass"
                                        label="Password"
                                        type="password"
                                        variant='outlined'
                                    /> */}

                                    <TextField
                                        className='txt'
                                        id="pass"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        variant='outlined'
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleTogglePasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div style={{ display: "flex", padding: 0, margin: "0 auto", justifyContent: "center" }}>


                                    <p className='terms' style={{ fontFamily: "'DM Sans', sans-serif" }}><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />By signing in, I agree with <u>Terms and conditions.</u></p>

                                </div>

                                <Button sx={{ backgroundColor: "#800000", ":hover": { backgroundColor: "#800000" } }} variant="contained"
                                    onClick={handleLogIn}
                                >Sign In</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
}
