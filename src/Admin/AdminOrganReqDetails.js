// import React from "react";
// import Container from "@mui/material/Container";
// import PersonPics from "../Components/People";
// import { Button } from "@mui/base";
// import { style } from "@mui/system";
import ButtonM from "../Components/ButtonMaroon";
import ButtonY from "../Components/ButtonYellow";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

// import Footer from "../Components/footer";

export default function AdminOrganReqDetails({
  setShowDetails,
  selectedTableId,
}) {
  // const [userData, setUserData] = useState(null);
  const [manageOrganizerRequest, setManageOrganizerRequest] = useState([]);

  useEffect(() => {
    if (selectedTableId) {
      axios
        .get(
          "http://localhost:8080/manageOrganizerRequest/getAllManageOrganizerRequests"
        )
        .then((response) => {
          // setUserData(response.data);
          const tmpEvent = response.data;
          const origEv = tmpEvent.find(
            (tmpEv) => tmpEv.organReqId === selectedTableId
          );
          console.log("origEv: ", origEv);
          setManageOrganizerRequest(origEv);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [selectedTableId]);

  return (
    <div>
      {/* <img
        src="./img/adminorganreq.jpg"
        alt="logo"
        className="banner"
        style={{ width: "100%" }}
      /> */}
      <div
        style={{
          border: "1px solid black",
          marginTop: "1rem",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {/* <Container maxWidth="lg">
          <h2
            style={{ fontFamily: "'DM Sans', sans-serif", marginTop: "5rem" }}
          >
            Organizer Request
          </h2> */}

        <div
          style={{
            backgroundColor: "#C02147",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "2rem",
          }}
        >
          <div>
            <img
              className="back"
              src="/img/back.png"
              style={{
                cursor: "pointer",
                marginLeft: "1rem",
                width: "42px",
                height: "42px",
              }}
              onClick={() => setShowDetails(false)}
            />
          </div>

          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                margin: "0 auto",
                padding: "0rem",
                color: "white",
                textAlign: "center",
              }}
            >
              User Details
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              textAlign: "center",
              marginRight: "1rem",
            }}
          >
            {/* <img
              src="./img/Edit.png"
              alt="Edit"
              style={{ cursor: "pointer", marginRight: "1rem" }}
              onClick={() => alert("Accept")}
            />
            <img
              src="./img/Delete.png"
              alt="Edit"
              style={{ cursor: "pointer" }}
              onClick={() => alert("Decline")}
            /> */}
          </div>
        </div>

        <div style={{ padding: "2rem" }}>
          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            First Name
          </p>
          <p style={{ textAlign: "justify" }}>{manageOrganizerRequest.fname}</p>

          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Middle Name
          </p>
          <p style={{ textAlign: "justify" }}>{manageOrganizerRequest.mname}</p>

          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Last Name
          </p>
          <p style={{ textAlign: "justify" }}>{manageOrganizerRequest.lname}</p>

          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Email Address
          </p>
          <p style={{ textAlign: "justify" }}>{manageOrganizerRequest.email}</p>

          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            User Identification
          </p>
          <p style={{ textAlign: "justify" }}>{manageOrganizerRequest.role}</p>

          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Department
          </p>
          <p style={{ textAlign: "justify" }}>{manageOrganizerRequest.dept}</p>

          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Organization
          </p>
          <p style={{ textAlign: "justify" }}>
            {manageOrganizerRequest.organization}
          </p>

          {/* <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Proof of Approval From SAO or Department
          </p> */}

          <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Message to the Admin for Request of Approval
          </p>
          <p style={{ textAlign: "justify" }}>
            {manageOrganizerRequest.message}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
            }}
          >
            {/* <ButtonM name="Accept" /> */}
            <Button sx={{
              backgroundColor: 'maroon', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '19rem', height: '4rem', fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
              display: "flex", justifyContent: "center", padding: 0, borderRadius: 50

            }}
            onClick={async () => {
              // handleDeleteUser(manageOrganizerRequest.organReqId)
              try {
                const updatedFormData = {
                  fname: manageOrganizerRequest.fname || "",
                  mname: manageOrganizerRequest.mname || "",
                  lname: manageOrganizerRequest.lname || "",
                  email: manageOrganizerRequest.email || "",
                  pass: manageOrganizerRequest.pass || "",
                  role: manageOrganizerRequest.role || "",
                  dept: manageOrganizerRequest.dept || "",
                  organization: manageOrganizerRequest.organization || "",
                  message: manageOrganizerRequest.message || "",
                  status: "Accepted" || "",
                };
                console.log("updated: ", updatedFormData);
                const response = await axios.put(
                  `http://localhost:8080/manageOrganizerRequest/updateManageOrganizerRequest?organReqId=${selectedTableId}`,
                  updatedFormData
                );
                console.log("API Response:", response.data);

                const insertResponse = await axios.post(
                  'http://localhost:8080/organizer/insertOrganizer',{
                  // updatedFormData,
                  fname: manageOrganizerRequest.fname,
                  mname: manageOrganizerRequest.mname,
                  lname: manageOrganizerRequest.lname,
                  email: manageOrganizerRequest.email,
                  pass: manageOrganizerRequest.pass,
                  role: manageOrganizerRequest.role,
                  organization: manageOrganizerRequest.organization,
                  department: manageOrganizerRequest.dept,
                });

                alert("User Successfully Accepted!");
                window.location.reload();
              } catch (error) {
                console.error(
                  "Error accepting event request:",
                  error
                );
              }
            }}
            >Accepted</Button>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
            {/* <ButtonY name="Decline" /> */}
            <Button sx={{
              backgroundColor: '#EAA021', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '19rem', height: '4rem', fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
              display: "flex", justifyContent: "center", padding: 0, borderRadius: 50
            }} 
            onClick={async () => {
              // handleDeleteUser(manageOrganizerRequest.organReqId)
              try {
                const updatedFormData = {
                  fname: manageOrganizerRequest.fname || "",
                  mname: manageOrganizerRequest.mname || "",
                  lname: manageOrganizerRequest.lname || "",
                  email: manageOrganizerRequest.email || "",
                  pass: manageOrganizerRequest.pass || "",
                  role: manageOrganizerRequest.role || "",
                  dept: manageOrganizerRequest.dept || "",
                  organization:
                    manageOrganizerRequest.organization || "",
                  message: manageOrganizerRequest.message || "",
                  status: "Declined" || "",
                };
                console.log("updated: ", updatedFormData);
                const response = await axios.put(
                  `http://localhost:8080/manageOrganizerRequest/updateManageOrganizerRequest?organReqId=${selectedTableId}`,
                  updatedFormData
                );
                console.log("API Response:", response.data);
                alert("User Successfully Declined!");
                window.location.reload();
              } catch (error) {
                console.error(
                  "Error accepting event request:",
                  error
                );
              }
            }}
            >Decline</Button>
          </div>
        </div>
        {/* </Container> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
