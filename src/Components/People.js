import React from "react"
import ResponsiveAppBar from "../Components/header"
import EventCatBtn from "../Components/EventCatBtn"
import "../Components/EventCatBtn.css"
import AboutUs from "../Components/AboutUs"
import Container from '@mui/material/Container';

export default function PersonPics({image,name,motto}){

  return(
   <>
  <div style={{ textAlign:"center",margin:"50px" }}>
    <img src={image} alt="logo" style={{ width: "200px" }} />
    <h3>{name}</h3>
    <p>{motto}</p>
</div>


    
  
      
  </>
  )
}