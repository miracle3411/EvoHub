import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/adminHeader'
import { Button, Container, MenuItem, Paper, Select, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import TableBody from '@mui/material/TableBody';
import Footer from '../Components/footer';
import AdminEventReqDetails from './AdminEventReqDetails';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

export default function AdminEventReq() {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [event, setEvents] = useState([]);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/Event/getAllEvents')
          .then(response => {
            // setEvents(response.data);
            const tmpEvent = response.data;
            const origEv = tmpEvent.filter(tmpEv => tmpEv.status === 2);
            console.log("origEv: ",origEv);
            setEvents(origEv);
            
          })
          .catch(error => {
            console.error('Error fetching events:', error);
          });
      }, []);
    console.log("event: ",event);
    //   const [formData, setFormData] = useState({
    //     title: event.title || '',
    //     description: event.description || '',
    //     date: event.date || '',
    //     time: event.time || '',
    //     duration: event.duration || '',
    //     location: event.location || '',
    //     organizer: event.organizer || '',
    //     organEmail: event.organEmail || '',
    //     yearlevel: event.yearlevel || '',
    //     department: event.department || '',
    //     payment: event.payment || '',
    //     maxAttend: event.maxAttend || '',
    //     status: event.status || '',
    //     image: event.image || '',
    //     orgid: event.orgid || '',
    // });
    // const [formData, setFormData] = useState({
    //     title: '',
    //     description: '',
    //     date: '',
    //     time: '',
    //     duration: '',
    //     location: '',
    //     organizer: '',
    //     organEmail: '',
    //     yearlevel: '',
    //     department: '',
    //     payment: '',
    //     maxAttend: '',
    //     status: '',
    //     image: '',
    //     orgid: '',
    //   });

    // const handleUpdateProfile = async (events) => {
    //     try {
    //         const updatedFormData = {
    //             title: events.title || '',
    //             description: events.description || '',
    //             date: events.date || '',
    //             time: events.time || '',
    //             duration: events.duration || '',
    //             location: events.location || '',
    //             organizer: events.organizer || '',
    //             organEmail: events.organEmail || '',
    //             yearlevel: events.yearlevel || '',
    //             department: events.department || '',
    //             payment: events.payment || '',
    //             maxAttend: events.maxAttend || '',
    //             status: 'Accepted',
    //             image: events.image || '',
    //             orgid: events.orgid || '',
    //           };

    //         const response = await axios.put(`http://localhost:8080/Event/updateEvent?eventid=${events.eventid}`, updatedFormData);

    //         alert('Profile updated successfully!');
    //     } catch (error) {
    //         console.error('Error updating user profile:', error);
    //     }
    // };

    // function createData(id, name, email, calories, fat, carbs, protein) {
    //     return { id, name, email, calories, fat, carbs, protein };
    // }
    // const rows = [
    //     createData(1, 'Jane Doe', 'jane.doe@gmail.com', 'Innovation Expo', 'GYM', 'CCS', '12-05-23'),
    //     createData(2, 'Clark Doe', 'jane.doe@gmail.com', 'Innovation Expo', 'GYM', 'CCS', '12-05-23'),
    //     createData(3, 'Jonas Doe', 'jane.doe@gmail.com', 'Innovation Expo', 'GYM', 'CCS', '12-05-23'),
    //     createData(4, 'Shem Doe', 'jane.doe@gmail.com', 'Innovation Expo', 'GYM', 'CCS', '12-05-23'),
    //     createData(5, 'Von Doe', 'jane.doe@gmail.com', 'Innovation Expo', 'GYM', 'CCS', '12-05-23'),
    //     createData(6, 'Ludi Doe', 'jane.doe@gmail.com', 'Innovation Expo', 'GYM', 'CCS', '12-05-23'),
    //     createData(7, 'John Doe', 'jane.doe@gmail.com', 'Innovation Expo', 'GYM', 'BSIT', '12-05-23'),
    // ];

    const [filterValue, setFilterValue] = useState(''); // State for the selected filter value
    const filteredRows = event.filter((events) => !filterValue || events.department === filterValue);
    return (
        <div>
            <AdminHeader />
            <img src="./img/GLE-Building.png" alt="logo" className="banner" />
            <Container maxWidth="lg">
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", marginTop: "5rem" }}>Event Request</h2>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        {/* Dropdown/Select for filtering */}
                        <Select
                            value={filterValue}
                            onChange={(e) => { setFilterValue(e.target.value); setShowDetails(false); }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="" >
                                All
                            </MenuItem>
                            {/* Add unique carb values from your rows */}
                            {[...new Set(event.map((events) => events.department))].map((department) => (
                                <MenuItem key={department} value={department}>
                                    {department}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <TextField
                            className='txt'
                            id="fname"
                            label="Search"
                            type="text"
                            variant='outlined'
                        />
                    </div>
                </div>

                <br /><br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#C02147' }}>
                                <TableCell align="center" sx={{ color: 'white' }}>Organizers</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>Event Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>Event Location</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>Event Date</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}></TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showDetails === true ? (
                                <>
                                    {filteredRows
                                        .filter(events => events.eventid === selectedTableId)
                                        .map((events) => (
                                            <TableRow
                                                key={events.eventid}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                                onClick={(e) => {
                                                    if (!e.target.closest('button')) {
                                                        // Only trigger the alert if the clicked element is not a button
                                                        // alert('You clicked on ' + row.id);
                                                        setShowDetails(!showDetails);
                                                        setSelectedTableId(events.eventid);
                                                        setCurrentId(null);

                                                    }
                                                }}

                                            >
                                                <TableCell component="th" scope="row" align='center'>
                                                <div style={{display:'flex', alignItems:'center'}}>
                                                <Avatar  alt={events.organizer} src="/static/images/avatar/2.jpg"  sx={{marginRight:'1rem'}} />
                                                    <div>
                                                       {events.organizer}
                                                    <p>{events.organEmail}</p> 
                                                    </div>
                                                    </div>
                                                    
                                                </TableCell>
                                                <TableCell align="center">{events.title}</TableCell>
                                                <TableCell align="center">{events.location}</TableCell>
                                                <TableCell align="center">{events.department}</TableCell>
                                                <TableCell align="center">{events.date}</TableCell>
                                                {/* <TableCell align="center" sx={{ zIndex: 1 }}><Button onClick={async() => { 
                                                    try {
                                                        const updatedFormData = {
                                                            title: events.title,
                                                            description: events.description || '',
                                                            date: events.date || '',
                                                            time: events.time || '',
                                                            duration: events.duration || '',
                                                            location: events.location || '',
                                                            organizer: events.organizer || '',
                                                            organEmail: events.organEmail || '',
                                                            yearlevel: events.yearlevel || '',
                                                            department: events.department || '',
                                                            payment: events.payment || '',
                                                            maxAttend: events.maxAttend || '',
                                                            status: 1 || '',
                                                            image: events.image || '',
                                                            orgid: events.orgid || '',
                                                          };
                                                        console.log("updated: ",updatedFormData);
                                                        const response = await axios.put(`http://localhost:8080/Event/updateEvent?eventid=${events.eventid}`, updatedFormData);
                                                        console.log("API Response:", response.data);
                                                        alert('Event Request Successfully Accepted!');
                                                        window.location.reload();
                                                    } catch (error) {
                                                        console.error('Error accepting event request:', error);
                                                    }
                                                    }}><img src="./img/Edit.png" alt="Edit" style={{
                                                        filter: 'sepia(60%) saturate(20000%) hue-rotate(31deg)',
                                                      }}/></Button></TableCell>
                                                <TableCell align="center"><Button onClick={async() => { 
                                                    try {
                                                        const updatedFormData = {
                                                            title: events.title,
                                                            description: events.description || '',
                                                            date: events.date || '',
                                                            time: events.time || '',
                                                            duration: events.duration || '',
                                                            location: events.location || '',
                                                            organizer: events.organizer || '',
                                                            organEmail: events.organEmail || '',
                                                            yearlevel: events.yearlevel || '',
                                                            department: events.department || '',
                                                            payment: events.payment || '',
                                                            maxAttend: events.maxAttend || '',
                                                            status: 0 || '',
                                                            image: events.image || '',
                                                            orgid: events.orgid || '',
                                                          };
                                                        console.log("updated: ",updatedFormData);
                                                        const response = await axios.put(`http://localhost:8080/Event/updateEvent?eventid=${events.eventid}`, updatedFormData);
                                                        console.log("API Response:", response.data);
                                                        alert('Event Request Successfully Declined!');
                                                        window.location.reload();
                                                    } catch (error) {
                                                        console.error('Error accepting event request:', error);
                                                    }
                                                    }}><img src="./img/Delete.png" alt="Edit" style={{
                                                        filter: 'sepia(80%) saturate(1000%) hue-rotate(330deg)',
                                                      }}/></Button></TableCell> */}
                                            </TableRow>
                                        ))}
                                </>
                            ) : (
                                <>
                                    {


                                        filteredRows.map((event) => (
                                            <TableRow
                                                key={event.eventid}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                                onClick={(e) => {
                                                    if (!e.target.closest('button')) {
                                                        // Only trigger the alert if the clicked element is not a button
                                                        // alert('You clicked on ' + row.id);
                                                        setShowDetails(!showDetails);
                                                        setSelectedTableId(event.eventid);
                                                        setCurrentId(event.eventid);
                                                        console.log("Current ID:", event.eventid);
                                                    }
                                                }}

                                            >

                                                <TableCell component="th" scope="row" align='center'>
                                                    <div style={{display:'flex', alignItems:'center'}}>
                                                <Avatar  alt={event.organizer} src="/static/images/avatar/2.jpg"  sx={{marginRight:'1rem' }} />
                                                    <div>
                                                       {event.organizer}
                                                    <p>{event.organEmail}</p> 
                                                    </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center">{event.title}</TableCell>
                                                <TableCell align="center">{event.location}</TableCell>
                                                <TableCell align="center">{event.department}</TableCell>
                                                <TableCell align="center">{event.date}</TableCell>
                                                <TableCell align="center" sx={{ zIndex: 1 }}><Button onClick={async() => { 
                                                    try {
                                                        const updatedFormData = {
                                                            title: event.title,
                                                            description: event.description || '',
                                                            date: event.date || '',
                                                            time: event.time || '',
                                                            duration: event.duration || '',
                                                            location: event.location || '',
                                                            organizer: event.organizer || '',
                                                            organEmail: event.organEmail || '',
                                                            yearlevel: event.yearlevel || '',
                                                            department: event.department || '',
                                                            payment: event.payment || '',
                                                            maxAttend: event.maxAttend || '',
                                                            status: 1 || '',
                                                            image: event.image || '',
                                                            orgid: event.orgid || '',
                                                          };
                                                        console.log("updated: ",updatedFormData);
                                                        const response = await axios.put(`http://localhost:8080/Event/updateEvent?eventid=${event.eventid}`, updatedFormData);
                                                        console.log("API Response:", response.data);
                                                        alert('Event Request Successfully Accepted!');
                                                        window.location.reload();
                                                    } catch (error) {
                                                        console.error('Error accepting event request:', error);
                                                    }
                                                    }}><img src="./img/Donecheck.png" alt="Edit" /></Button></TableCell>
                                                <TableCell align="center"><Button onClick={async() => { 
                                                    try {
                                                        const updatedFormData = {
                                                            title: event.title,
                                                            description: event.description || '',
                                                            date: event.date || '',
                                                            time: event.time || '',
                                                            duration: event.duration || '',
                                                            location: event.location || '',
                                                            organizer: event.organizer || '',
                                                            organEmail: event.organEmail || '',
                                                            yearlevel: event.yearlevel || '',
                                                            department: event.department || '',
                                                            payment: event.payment || '',
                                                            maxAttend: event.maxAttend || '',
                                                            status: 0 || '',
                                                            image: event.image || '',
                                                            orgid: event.orgid || '',
                                                          };
                                                        console.log("updated: ",updatedFormData);
                                                        const response = await axios.put(`http://localhost:8080/Event/updateEvent?eventid=${event.eventid}`, updatedFormData);
                                                        console.log("API Response:", response.data);
                                                        alert('Event Request Successfully Declined!');
                                                        window.location.reload();
                                                    } catch (error) {
                                                        console.error('Error accepting event request:', error);
                                                    }
                                                    }}><img src="./img/RedDeleteBtn.png" alt="Edit" /></Button></TableCell>
                                            </TableRow>
                                        ))}
                                </>
                            )}

                        </TableBody>
                    </Table>
                </TableContainer>
                {showDetails && (
                    <AdminEventReqDetails setShowDetails={setShowDetails} setId = {currentId} />
                )}
            </Container>
            <Footer />
        </div>
    )
}
