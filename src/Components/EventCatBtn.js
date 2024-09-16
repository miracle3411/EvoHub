import { Button } from '@mui/material'
import React from 'react'
import './EventCatBtn.css'
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';


export default function EventCatBtn() {
  return (
    <Container maxWidth="lg">
    <div className='EventCatBtn'>
        <h2 style={{fontFamily: "'DM Sans', sans-serif"}}>Event Categories</h2>
        {/* <div className='cateventbtn' style={{display: "block", j ustifyContent: "center"}}> */}
        <div className='cateventbtn' style={{display: "block", justifyContent: "center"}}>
        <Link to='/EventCategoryCEA'><Button><img className='catbtn' src="/img/Engineering.png" /></Button></Link>
        <Link to="/EventCategoryCCS"><Button><img className='catbtn' src="/img/ccs.png" /></Button></Link>
        <Link to="/EventCategoryCASE"><Button><img className='catbtn' src="/img/arts.png" /></Button></Link>
       <Link to ="/EventCategoryCMBA"><Button><img className='catbtn' src="/img/account.png" /></Button></Link>
        <Link to ="/EventCategoryCNAHS"><Button><img className='catbtn' src="/img/nursing.png" /></Button></Link>
        <Link to ="/EventCategoryCCJ"><Button><img className='catbtn' src="/img/crim.png" /></Button></Link>
        </div>
    </div>
    </Container>
  )
}
