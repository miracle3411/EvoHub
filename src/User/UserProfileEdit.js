import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import ResponsiveAppBar from '../Components/header';
import Avatar from '@mui/material/Avatar';
import { Button, Grid, TextField } from '@mui/material';
import Footer from '../Components/footer';
import { useUser } from '../Components/UserProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserProfileEdit() {
    const { user, login } = useUser();
    const [selectedGender, setSelectedGender] = useState(user.gender || '');
    const [regis, setRegis] = useState(false);
    const navigate = useNavigate();

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
        handleTextChange('gender', event.target.value);
    };

    const [formData, setFormData] = useState({
        fname: user.fname || '',
        mname: user.mname || '',
        lname: user.lname || '',
        dept: user.dept || '',
        email: user.email || '',
        pass: user.pass || '',
        gender: user.gender || '',
        dob: user.dob || '',
        mobNum: user.mobNum || '',
        city: user.city || '',
        country: user.country || '',
        bio: user.bio || '',
    });
    const handleTextChange = (field, value) => {
        if (field === 'dob') {
            const formattedDate = new Date(value).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });

            setFormData((prevData) => ({
                ...prevData,
                [field]: formattedDate || '',
            }));
        }  else if (field === 'mobNum') {
            // Allow only numbers and limit length to 11 digits
            const sanitizedPhoneNumber = value.replace(/\D/g, '').slice(0, 11);
            
            // Format phone number as XXX-XXX-XXXX
            const formattedPhoneNumber = sanitizedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            
            setFormData((prevData) => ({
                ...prevData,
                [field]: formattedPhoneNumber,
            }));
        }
            else {
            setFormData((prevData) => ({
                ...prevData,
                [field]: value,
            }));
        }
    };

    const handleUpdateProfile = async () => {
        try {

            const response = await axios.put(`http://localhost:8080/User/updateUser?userid=${user.userid}`, formData);

            login(response.data);
            setRegis(true);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    useEffect(() => {
        // Check if registration is successful
        if (regis) {
            // Redirect or show a success message as needed
            navigate('/UserProfile');
        }
    }, [regis, navigate]);

    const [textFieldHeight, setTextFieldHeight] = useState('auto');

    const handleInputChange = (event) => {
        if (event && event.target) {
            const inputLines = event.target.value.split('\n').length;
            const fixedLineHeight = 1.5;
            const newHeight = `${inputLines * fixedLineHeight}em`;
            setTextFieldHeight(newHeight);
        }
    };

    const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 15);
  const maxDateString = maxDate.toISOString().split('T')[0];



    return (
        <div>
            <ResponsiveAppBar />
            <div style={{ marginBottom: "18rem" }}>
                <img src="./img/userprofile.jpg" alt="logo" className="banner" style={{ position: "absolute", zIndex: -1 }} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ marginTop: "8.6rem" }}>
                        <Avatar alt={user.fname} src="/static/images/avatar/2.jpg" sx={{ width: 120, height: 120, fontSize: "3.5rem" }} />
                        <div>

                        </div>

                    </div>

                </div>
            </div>

            <Container maxWidth="lg" sx={{ marginBottom: "5rem" }}>
                <div>
                    {/* <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
                        <Avatar alt={user.fname} src="/static/images/avatar/2.jpg" sx={{ width: 120, height: 120, fontSize: "3.5rem" }} />
                    </div> */}
                    <Grid container spacing={2} style={{ margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
                        <Grid item xs={6} md={6}>
                            <p><b>First Name:</b></p>
                            <TextField
                                className='txt'
                                id="fname"
                                // placeholder= 'First Name'
                                value={formData.fname}
                                onChange={(e) => handleTextChange('fname', e.target.value)}
                                type="text"
                                variant='outlined'
                                disabled

                            />
                            <p><b>Middle Name:</b></p>
                            <TextField
                                className='txt'
                                id="fname"
                                placeholder='Middle Name'
                                value={formData.mname}
                                type="text"
                                variant='outlined'
                                disabled
                            />
                            <p><b>Last Name:</b></p>
                            <TextField
                                className='txt'
                                id="lname"
                                value={formData.lname}
                                placeholder='Last Name'
                                type="text"
                                variant='outlined'
                                disabled
                            />
                            <div>
                                <label>
                                    <p><b>Gender: </b>
                                        <select value={selectedGender} onChange={handleGenderChange} disabled={user.gender != null}>
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </p>
                                </label>
                            </div>

                            <p><b>Department:</b></p>
                            <TextField
                                className='txt'
                                id="dept"
                                placeholder='Department'
                                value={formData.dept}
                                onChange={(e) => handleTextChange('dept', e.target.value)}
                                type="text"
                                variant='outlined'
                                disabled
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>

                            <p><b>Email Address:</b></p>
                            <TextField
                                className='txt'
                                id="email"
                                placeholder='Email Address'
                                value={formData.email}
                                onChange={(e) => handleTextChange('email', e.target.value)}
                                type="text"
                                variant='outlined'
                                disabled
                            />
                            <p><b>Phone:</b></p>
                            <TextField
                                className='txt'
                                id="phone"
                                // placeholder= '09191234567'
                                value={formData.mobNum}
                                onChange={(e) => handleTextChange('mobNum', e.target.value)}
                                type="text"
                                variant='outlined'

                            />
                            {/* <p><b>Date of Birth:</b></p>
                            <TextField
                                className='txt'
                                id="fname"
                                // placeholder= 'january 01, 2023'
                                value={formData.dob}
                                onChange={(e) => handleTextChange('dob', e.target.value)}
                                type="text"
                                variant='outlined'
                                disabled={user.dob != null}
                            /> */}
                            <div className="form-group" style={{ flex: 1 }}>
                                <p><b>Date of Birth:</b></p>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    // value={formData.dob}
                                    onChange={(e) => handleTextChange('dob', e.target.value)}
                                    placeholder="Date"
                                    disabled={user.dob != null}
                                    style={{
                                        width: "50%",
                                        height: "45px",
                                        borderRadius: "45px",
                                        padding: "0 15px",
                                        borderColor: "#e5e5e5",
                                    }}
                                    required
                                    max={maxDateString}
                                />
                            </div>
                            <p><b>City:</b></p>
                            <TextField
                                className='txt'
                                id="fname"
                                // placeholder= 'City'
                                value={formData.city}
                                onChange={(e) => handleTextChange('city', e.target.value)}
                                type="text"
                                variant='outlined'
                            />
                            <p><b>Country:</b></p>
                            <TextField
                                className='txt'
                                id="fname"
                                // placeholder= 'Country'
                                value={formData.country}
                                onChange={(e) => handleTextChange('country', e.target.value)}
                                type="text"
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        </Grid>
                    </Grid>

                    <div style={{ marginBottom: "5rem" }}>
                        <TextField
                            className='txt'
                            id="fname"
                            placeholder='User Bio'
                            value={formData.bio}
                            onChange={(e) => { handleTextChange('bio', e.target.value); handleInputChange(e); }}
                            type="text"
                            variant='outlined'
                            multiline
                            sx={{
                                width: "100%", maxWidth: "100%", maxHeight: "auto", padding: '1rem', display: "flex", 
                                height: textFieldHeight, marginBottom: '1rem',
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>

                    <Button sx={{
                        backgroundColor: 'maroon', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '19rem', height: '4rem', fontWeight: 'bold', fontSize: '1rem',
                        display: "flex", justifyContent: "center", padding: 0, borderRadius: 50
                    }} onClick={handleUpdateProfile}>Update Profile</Button>
                </div>

            </Container>
            <Footer />
        </div>
    )
}
