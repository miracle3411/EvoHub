import React from "react";
import "../User/UserEventCategory.css";
import "../Components/EventCatBtn.css";
import AboutUs from "../Components/AboutUs";
import Container from "@mui/material/Container";
import PersonPics from "../Components/People";

export default function PersonProfile() {
  const Developers = [
    {
      image: "./img/Profile-3.png",
      name: "Robert Amaba",
      motto: "Go with the flow",
    },
    {
      image: "/img/Profile-1.png",
      name: "Irish Leigh San Juan",
      motto: "Two is better than one",
    },
    {
      image: "/img/Profile-2.png",
      name: " Katrina Dela Pena",
      motto: "Master in control z",
    },
    {
      image: "/img/Profile.png",
      name: "Kyle Weig",
      motto: "Embrace to journey",
    },
  ];
  return (
    <>
      <Container maxWidth="lg">
        <AboutUs />
        <br />
        <br />
        <br />
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Developers
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Developers.map((developer, index) => (
            <div>
              <PersonPics
                image={developer.image}
                name={developer.name}
                motto={developer.motto}
              />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
