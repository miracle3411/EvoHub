import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, IconButton, InputAdornment } from "@mui/material";
import './AdminLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAdmin } from '../Components/AdminProvider';

export default function EventAdmin() {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState(''); // Changed from password to pass
    const [showPassword, setShowPassword] = useState(false);
    const {login} = useAdmin();

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleLogIn = async () => {
        if (email !== '' || pass !== '') { // Changed from password to pass
            try {
                const response = await axios.get('http://localhost:8080/admins/getAllAdmin', {
                    email,
                    pass, // Changed from password to pass
                });

                const admins = response.data;
                const admin = admins.find(admin => admin.email === email && admin.pass === pass); // Changed from password to pass

                if (admin) {
                    if (!isChecked) {
                        alert('Please agree to the Terms and Conditions.');
                        return;
                    }
                    login(admin);
                    setIsLoggedIn(true);
                    alert('Admin logged in:', admin);
                    // Add logic for successful admin login
                    // For example: redirect or set admin status
                } else {
                    alert('Invalid email or password');
                    // Handle invalid login (show error message, etc.)
                }
            } catch (error) {
                alert('There was a problem with the login operation:', error);
                // Handle login failure, show error message, etc.
            }
        } else {
            alert("Please enter email or password");
            return;
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/Dashboard');
        }
    },  [isLoggedIn, navigate]);

    return (
        <div className="admin-container">
            <Container maxWidth="x1">
                <Grid container spacing={2} style={{ margin: "0 auto" }}>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                        <div className="in-container">
                            <img className='user' src="/img/admin.png" alt="Admin" />
                            <Link to="/">
                                <Button sx={{ left: '52%', position: 'absolute' }}>
                                    <img className='back' src="/img/back.png" alt="Back" />
                                </Button>
                            </Link>

                            <h1 style={{ fontFamily: "'DM Sans', sans-serif" }}>Log In as Admin</h1>
                            <div>
                                <TextField
                                    className='txt'
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    variant='outlined'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                /><br />
                                <TextField
                                    className='txt'
                                    id="pass"
                                    label="Password" // Changed from Password to Pass
                                    type={showPassword ? 'text' : 'password'}
                                    variant='outlined'
                                    value={pass} // Changed from password to pass
                                    onChange={(e) => setPass(e.target.value)} // Changed from setPassword to setPass
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
                                <p className='terms' style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />By signing in, I agree with <u>Terms and conditions.</u>
                                </p>
                            </div>
                            <Button
                                sx={{ backgroundColor: "#800000", ":hover": { backgroundColor: "#800000" } }}
                                variant="contained"
                                onClick={handleLogIn}
                            >
                                Sign In
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}