import { Avatar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, Container } from '@mui/material';
import React, { useState } from 'react';

const AttendeeTable = ({data}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [filterValue, setFilterValue] = useState('');

    

    function createData(id, name, email, eventName, department, yearLevel) {
        return { id, name, email, eventName, department, yearLevel };
    }

    const rows = [ 
        createData(2, 'John Doe', 'john.doe@gmail.com', 'TechXperience', 'CCS', '4'),
        createData(3, 'John Doe', 'john.doe@gmail.com', 'TechXperience', 'CCS', '4'),
        createData(4, 'John Doe', 'john.doe@gmail.com', 'TechXperience', 'CCS', '4'),
        createData(5, 'Jane Doe', 'jane.doe@gmail.com', 'TechXperience', 'CCS', '4'),
    ];

    const filteredRows = rows.filter((row) => !filterValue || row.carbs === filterValue);

    return (
        <Container>
            <div className="attendee-table">
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
                            {[...new Set(rows.map((row) => row.carbs))].map((carbs) => (
                                <MenuItem key={carbs} value={carbs}>
                                    {carbs}
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
                <br/>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#C02147' }}>
                                <TableCell align="center" sx={{ color: 'white' }}>Attendees</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>Event Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>Department</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>Year Level</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    // TableRow contents
                                >
                                   <TableCell component="th" scope="row" align='center'>
                                                <div style={{display:'flex', alignItems:'center'}}>
                                                <Avatar  alt={row.name} src="/static/images/avatar/2.jpg"  sx={{marginRight:'1rem'}} />
                                                    <div>
                                                       {row.name}
                                                    <p>{row.email}</p> 
                                                    </div>
                                                    </div>
                                                    
                                    </TableCell>
                                    <TableCell align="center">{row.eventName}</TableCell>
                                    <TableCell align="center">{row.department}</TableCell>
                                    <TableCell align="center">{row.yearLevel}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ border: '2px', borderColor: 'black', marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button>Previous</Button>
                    <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>Page 1 of 1</p>
                    <Button>Next</Button>
                </div>
            </div>
            </div>
        </Container>
    );
};

export default AttendeeTable;