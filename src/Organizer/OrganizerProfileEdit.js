import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import ResponsiveAppBar from '../Components/header';
import Avatar from '@mui/material/Avatar';
import { Button, Grid, TextField } from '@mui/material';
import Footer from '../Components/footer';
import ButtonM from '../Components/ButtonMaroon';
import { useUser } from '../Components/UserProvider';
import { useOrganizer } from '../Components/OrganizerProvider';
import axios from 'axios';

export default function OrganizerProfileEdit() {
    // const { user, login } = useUser();
    const { organizer, login } = useOrganizer();

    const [selectedGender, setSelectedGender] = useState(organizer.gender || '');

    const [lastname, setLastname] = useState('');

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
        handleTextChange('gender', event.target.value);
    };

    const [formData, setFormData] = useState({
        fname: organizer.fname || '',
        mname: organizer.mname || '',
        lname: organizer.lname || '',
        department: organizer.department || '',
        pass: organizer.pass || '',
        email: organizer.email || '',
        role: organizer.role || '',
        organization: organizer.organization || '',
        mobNum: organizer.mobNum || '',
        bio: organizer.bio || '',
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
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [field]: value,
            }));
        }
    };

    const handleUpdateProfile = async () => {
        try {

            const response = await axios.put(`http://localhost:8080/organizer/updateOrganizer?oid=${organizer.oid}`, formData);

            login(response.data);

            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating organizer profile:', error);
        }
    };

    const [textFieldHeight, setTextFieldHeight] = useState('auto');

    const handleInputChange = (event) => {
        if (event && event.target) {
            const inputLines = event.target.value.split('\n').length;
            const fixedLineHeight = 1.5;
            const newHeight = `${inputLines * fixedLineHeight}em`;
            setTextFieldHeight(newHeight);
        }
    };



    return (
        <div>
            <ResponsiveAppBar />
            <div style={{ marginBottom: "18rem" }}>
                <img src="./img/userprofile.jpg" alt="logo" className="banner" style={{ position: "absolute", zIndex: -1 }} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ marginTop: "8.6rem" }}>
                        <Avatar alt={organizer.fname} src="/static/images/avatar/2.jpg" sx={{ width: 120, height: 120, fontSize: "3.5rem" }} />
                        <div>

                        </div>

                    </div>

                </div>
            </div>

            <Container maxWidth="lg" sx={{ marginBottom: "5rem" }}>
                <div>
                    {/* <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
                        <Avatar alt={organizer.fname} src="/static/images/avatar/2.jpg" sx={{ width: 120, height: 120, fontSize: "3.5rem" }} />
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

                            <p><b>Role:</b></p>
                            <TextField
                                className='txt'
                                id="dept"
                                // placeholder='Role'
                                value={formData.role}
                                onChange={(e) => handleTextChange('dept', e.target.value)}
                                type="text"
                                variant='outlined'
                                disabled
                            />


                        </Grid>
                        <Grid item xs={6} md={6}>
                            <p><b>Department:</b></p>
                            <TextField
                                className='txt'
                                id="dept"
                                placeholder='Department'
                                value={formData.department}
                                onChange={(e) => handleTextChange('dept', e.target.value)}
                                type="text"
                                variant='outlined'
                                disabled
                            />

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
                                disabled={organizer.dob != null}
                            /> */}
                        </Grid>
                        <Grid item xs={12} md={6}>
                        </Grid>
                    </Grid>

                    <div style={{ marginBottom: "5rem" }}>
                        <TextField
                            className='txt'
                            id="fname"
                            placeholder='organizer Bio'
                            value={formData.bio}
                            onChange={(e) => { handleTextChange('bio', e.target.value); handleInputChange(e); }}
                            type="text"
                            variant='outlined'
                            multiline
                            sx={{
                                width: "100%", maxWidth: "100%", maxHeight: "auto", padding: '1rem', display: "flex", maxHeight: "auto",
                                height: textFieldHeight, padding: 0, marginBottom: '1rem',
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>

                    <Button sx={{
                        backgroundColor: 'maroon', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '19rem', height: '4rem', fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
                        display: "flex", justifyContent: "center", padding: 0, borderRadius: 50
                    }} onClick={handleUpdateProfile}>Update Profile</Button>
                </div>

            </Container>
            <Footer />
        </div>
    )
}
