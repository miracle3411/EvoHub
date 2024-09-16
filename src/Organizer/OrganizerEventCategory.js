import React from "react";
import "../Components/EventCatBtn.css";
import Footer from "../Components/footer";
import "./OrganizerApplicationForm.css";
import OrganEventCatBtn from "../Components/OrganEventCatBtn";
import ResponsiveAppBarOrgan from "../Components/organHeader";

export default function OrganizerEventCategory() {
  return (
    <>
      <ResponsiveAppBarOrgan />
      <img src="./img/EventBanner.png" alt="logo" className="banner" />
      <OrganEventCatBtn />
      <Footer />
    </>
  );
}
