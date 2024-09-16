import { Button } from '@mui/material'
import React from 'react'
import './EventCatBtn.css'
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';


export default function OrganEventCatBtn() {
  return (
    <Container maxWidth="lg">
    <div className='EventCatBtn'>
        <h2 style={{fontFamily: "'DM Sans', sans-serif"}}>Event Categories</h2>
        {/* <div className='cateventbtn' style={{display: "block", j ustifyContent: "center"}}> */}
        <div className='cateventbtn' style={{display: "block", justifyContent: "center"}}>
        <Link to="/OrganizerEventCategoryCEA"><Button><img className='catbtn' src="/img/Engineering.png" /></Button></Link>
        <Link to="/OrganizerEventCategoryCCS"><Button><img className='catbtn' src="/img/ccs.png" /></Button></Link>
        <Link to="/OrganizerEventCategoryCASE"><Button><img className='catbtn' src="/img/arts.png" /></Button></Link>
        <Link to="/OrganizerEventCategoryCMBA"><Button><img className='catbtn' src="/img/account.png" /></Button></Link>
        <Link to="/OrganizerEventCategoryCNAHS"><Button><img className='catbtn' src="/img/nursing.png" /></Button></Link>
        <Link to="/OrganizerEventCategoryCCJ"><Button><img className='catbtn' src="/img/crim.png" /></Button></Link>

        </div>
    </div>
    </Container>
  )
}
