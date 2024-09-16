import React from 'react'
import ResponsiveAppBar from './Components/header'
import EventCatBtn from './Components/EventCatBtn'


export default function UsedEventCategory() {
  return (
    <div style={{margin: 0, padding: 0}}>
        <ResponsiveAppBar />
        
        <div style={{display: "flex", justifyContent: "center", height: '100%', width: '100%', margin: "0 auto", padding: 0}}>
            <img style={{ minWidth: '100%', minHeight: '35vw', objectFit: 'cover', marginTop: 0}} src="/img/landing.jpg" alt="logo" className='logo'  />
        </div>

       
        <EventCatBtn />
    </div>
  )
}
