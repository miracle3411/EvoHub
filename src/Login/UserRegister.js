import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField, FormControl, FormLabel, Select, InputLabel, InputAdornment, IconButton, Modal, Box, Typography, } from "@mui/material";
import './UserRegister.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function EventRegister() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [dept, setDept] = useState('Department');
    const [regis, setRegis] = useState(false);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [userData, setUserData] = useState({
        fname: '',
        mname: '',
        lname: '',
        dept: '',
        email: '',
        pass: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChangeDept = (e) => {
        const { value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            dept: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'pass') {
            // Password validation logic
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (passwordRegex.test(value)) {
                setUserData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                // Password is not valid, show an alert to the user
                alert('Invalid password. Follow the password combination rule.');
            }
        } else {
            // For other fields, update the state directly
            setUserData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSignUp = async () => {
        const emailInput = document.getElementById("email").value;

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (document.getElementById("fname").value != '' && document.getElementById("mname").value != '' && document.getElementById("lname").value != '' && document.getElementById("dept").value != '' && document.getElementById("email").value != '' && document.getElementById("pass").value != '') {
            if (document.getElementById("pass").value.length < 8) {
                alert('Password must be at least 8 characters.');
                return;
            }
            if (!emailRegex.test(emailInput)) {
                alert("Please enter a valid email address.");
                return;
            }
            if (document.getElementById("pass").value.length >= 8) {
                if (!(/[A-Z]/.test(document.getElementById("pass").value) && /[a-z]/.test(document.getElementById("pass").value) && /[\W_]/.test(document.getElementById("pass").value))) {
                    alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
                    return;
                }
            }
            if (!isChecked) {
                alert('Please agree to the Terms and Conditions.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/User/getAllUsers/');
                const inputEmail = document.getElementById("email").value;
                if (response.data.some(user => user.email === inputEmail)) {
                    alert('Email already exists');
                    return;
                }

                // Post request
                const response1 = await axios.post('http://localhost:8080/User/insertUser', {
                    fname: document.getElementById("fname").value,
                    mname: document.getElementById("mname").value,
                    lname: document.getElementById("lname").value,
                    dept: userData.dept,
                    email: document.getElementById("email").value,
                    pass: document.getElementById("pass").value,
                });


                console.log('Registration successful:', response.data);
                // Redirect or show a success message as needed
                // alert('Registration successful');
                handleOpen();
                setTimeout(() => {
                    // Proceed to setRegis(true) after the delay
                    setRegis(true);
                }, 2000);

            } catch (error) {
                console.error('Error during registration:', error);
                // Handle registration failure, show error message, etc.
            }

        } else {
            alert('Please fill all the fields');
        }
    };

    useEffect(() => {
        // Check if registration is successful
        if (regis) {
            // Redirect or show a success message as needed
            navigate('/');
        }
    }, [regis]);


    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                            Registration successful!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                            You can now log in as a user!
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <div className="reg-container">
                <Container maxWidth="x1">
                    <Grid container spacing={2} style={{ margin: "0 auto" }}>
                        <Grid item xs={6} md={6}>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <div className="in-container">
                                <Link to="/"><Button sx={{ display: 'flex', left: '52%', position: 'absolute' }} ><img className='back' src="/img/back.png" /></Button></Link>
                                <br /><br />
                                <h1 style={{ fontFamily: "'DM Sans', sans-serif" }}>Register as User</h1>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: "400" }}>Create your account. It's free and only takes a minute</h3>
                                <div>
                                    <TextField
                                        className='txt'
                                        id="fname"
                                        label="First Name"
                                        type="text"
                                        variant='outlined'
                                        onChange={handleChange}
                                    /><br />
                                    <TextField
                                        className='txt'
                                        id="mname"
                                        label="Middle Name"
                                        type="text"
                                        variant='outlined'
                                        onChange={handleChange}
                                    /><br />
                                    <TextField
                                        className='txt'
                                        id="lname"
                                        label="Last Name"
                                        type="text"
                                        variant='outlined'
                                        onChange={handleChange}
                                    /><br />
                                    {/* <TextField
                                        className='txt'
                                        id="dept"
                                        label="Department"
                                        type="text"
                                        variant='outlined'
                                        onChange={handleChange}
                                    /><br /> */}
                                    <FormControl fullWidth sx={{ textAlign: "center", width: "20rem", }}>
                                        <InputLabel id="demo-simple-select-label" sx={{ padding: 0, margin: "0 auto", }}>Department</InputLabel>

                                        <Select
                                            id="dept"
                                            name="department"
                                            labelId="demo-simple-select-label"
                                            label="Department"
                                            value={userData.dept}
                                            onChange={handleChangeDept}
                                            sx={{ width: '20rem', padding: 0, margin: "0 auto", borderRadius: 50, }}
                                        >
                                            <MenuItem value="CEA">College of Engineering and Architecture</MenuItem>
                                            <MenuItem value="CCS">College of Computer Studies</MenuItem>
                                            <MenuItem value="CCE">College of Civil Engineering</MenuItem>
                                            <MenuItem value="CCJ">College of Criminal Justice</MenuItem>
                                            <MenuItem value="CMBA">College of Management, Business and Accountancy</MenuItem>
                                            <MenuItem value="CASE">College of Arts, Sciences and Education</MenuItem>
                                            <MenuItem value="CNAHS">College of Nursing and Allied Health Sciences</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <br />

                                    <TextField
                                        className='txt'
                                        id="email"
                                        label="Email"
                                        type="email"
                                        variant='outlined'
                                        onChange={handleChange}
                                        sx={{ mt: 1 }}
                                    /><br />
                                    {/* <TextField
                                        className='txt'
                                        id="pass"
                                        label="Password"
                                        type="password"
                                        variant='outlined'
                                        onChange={handleChange}
                                    /> */}
                                    <TextField
                                        className='txt'
                                        id="pass"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        variant='outlined'
                                        onChange={handleChange}
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


                                    <p className='terms' style={{ fontFamily: "'DM Sans', sans-serif" }}><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />By signing up, I agree with <u>Terms and conditions.</u></p>


                                </div>
                                {/* {regis ? <Link to="/"><Button sx={{ backgroundColor: "#800000", ":hover": { backgroundColor: "#800000" } }} variant="contained" onClick={handleSignUp}>Sign up</Button></Link> : 
                                <Button sx={{ backgroundColor: "#800000", ":hover": { backgroundColor: "#800000" } }} variant="contained" onClick={handleSignUp}>Sign up</Button>
                                } */}
                                <Button sx={{ backgroundColor: "#800000", ":hover": { backgroundColor: "#800000" } }} variant="contained" onClick={handleSignUp}>Sign up</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
}
