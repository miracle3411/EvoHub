import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ResponsiveAppBarOrgan from "../Components/organHeader";
import ButtonM from "../Components/ButtonMaroon";
import axios from "axios";
import { Button } from "@mui/material";
import { useOrganizer } from "../Components/OrganizerProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/footer";

export default function CreateEventForm() {
  const { organizer } = useOrganizer();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [allEvents, setAllEvents] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);

    axios
      .get(`http://localhost:8080/Event/getAllEvents`)
      .then((response) => {
        console.log(response.data);
        setAllEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    eventTitle: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    // organizer:"",
    year: "",
    department: "",
    payment: "",
    max: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      const timestamp = Date.now(); // Get current timestamp for unique identifier

      // Append the timestamp to the original filename
      const newFileName = `${timestamp}_${file.name}`;
      formData.append("file", file, newFileName);

      // Replace 'http://localhost:8080' with the actual base URL of your API
      const response = await axios.post(
        "http://localhost:8080/Image/upload",
        formData
      );

      // Assuming the response contains the image URL
      await setImageUrl(response.data);
      console.log(
        "Image uploaded successfully with new filename:",
        newFileName
      );

      // Clear the file input
      setFile(null);
    } catch (error) {
      alert("Error uploading image: " + error.message);
      console.error("Error uploading image:", error.message);
    }
  };

  const date = () => {};
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatDateForComparison = (dateString) => {
    const dateObject = new Date(dateString);
    const month = dateObject.toLocaleDateString("en-US", { month: "short" });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();

    return `${month} ${day}, ${year}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any required form field is empty
    for (const key in formData) {
      console.log(`Checking ${key}: ${formData[key]}`);
      if (!formData[key]) {
        alert(
          `Please fill in the ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return;
      }
    }
    const isLocationTaken = allEvents.some((existingEvent) => {
      const existingStartTime = new Date(`${existingEvent.date} ${existingEvent.time}`);
      const existingEndTime = new Date(existingStartTime.getTime() + existingEvent.duration * 60 * 60 * 1000); // convert duration to milliseconds
    
      const newStartTime = new Date(`${formData.date} ${formData.time}`);
      const newEndTime = new Date(newStartTime.getTime() + formData.duration * 60 * 60 * 1000); // convert duration to milliseconds
    
      console.log("Existing Event - Start Time:", existingStartTime);
      console.log("Existing Event - End Time:", existingEndTime);
      console.log("New Event - Start Time:", newStartTime);
      console.log("New Event - End Time:", newEndTime);
    
      return (
        existingEvent.location === formData.location &&
        existingEvent.date === formatDateForComparison(formData.date) && // Check if dates match
        !(newEndTime <= existingStartTime || newStartTime >= existingEndTime) // Check for time overlap
      );
    });
    
    
    if (isLocationTaken) {
      alert(
        "Warning: Another event already exists at the same location, date, and time."
      );
      return;
    }
    
    try {
      // Convert date format to string
      const formattedDate = new Date(formData.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
  
      const response = await axios.post(
        "http://localhost:8080/Event/insertEvent",
        {
          title: formData.eventTitle,
          description: formData.description,
          date: formattedDate, // Use the formatted date as a string
          time: formData.time,
          duration: formData.duration,
          location: formData.location,
          organizer: organizer.fname + " " + organizer.lname,
          yearlevel: formData.year,
          department: formData.department,
          payment: formData.payment,
          maxAttend: formData.max,
          image: imageUrl,
          orgid: organizer.oid,
          organEmail: organizer.email,
          status: 2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormSubmitted(true)
      // Alert after successful request
      window.alert('Request Successfully Requested to the Admin');
      // add navigate then proceed to
      navigate("/OrganizerHomePage");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
 


  console.log(organizer.oid);
  console.log(formData);
  return (
    <>
      <></>
      <ResponsiveAppBarOrgan />
      <img
        src="img/createEventBanner.png"
        alt="logo"
        style={{ width: "100%" }}
      />
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  textAlign: "left",
                }}
              >
                Create Event Form
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Event Title */}
                <div className="form-group">
                  <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "5rem",
                      color: "#666666",
                    }}
                  >
                    Event Title:
                  </h5>
                  <input
                    type="text"
                    id="eventTitle"
                    name="eventTitle"
                    value={formData.eventTitle}
                    onChange={handleChange}
                    placeholder="Enter Event Name"
                    style={{
                      width: "80%",
                      height: "50%",
                      borderRadius: "45px",
                      padding: "15px",
                    }}
                    required
                  />
                </div>

                {/*Description*/}
                <div className="form-group">
                  <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Descripton
                  </h5>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    placeholder="Enter Message Here"
                    style={{
                      width: "80%",
                      height: "154 px",
                      borderRadius: "45px",
                      padding: "15px",
                    }}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ display: "flex" }}>
                  {/* Date */}
                  <div className="form-group" style={{ flex: 1 }}>
                    <h5
                      style={{
                        fontFamily: "DM Sans",
                        marginTop: "1rem",
                        color: "#666666",
                      }}
                    >
                      Date
                    </h5>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      placeholder="Date"
                      style={{
                        width: "45%",
                        height: "45px",
                        borderRadius: "45px",
                        padding: "0 15px",
                      }}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  {/* Time 1 */}
                  <div className="form-group" style={{ flex: 1 }}>
                    <h5
                      style={{
                        fontFamily: "DM Sans",
                        marginTop: "1rem",
                        color: "#666666",
                      }}
                    >
                      Time
                    </h5>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="Time"
                      style={{
                        width: "45%", // Adjusted width
                        height: "45px",
                        borderRadius: "45px",
                        padding: "0 15px",
                      }}
                      required
                    />
                  </div>

                  {/* Duration */}
                  <div className="form-group" style={{ flex: 1 }}>
                    <h5
                      style={{
                        fontFamily: "DM Sans",
                        marginTop: "1rem",
                        color: "#666666",
                      }}
                    >
                      Duration (Hours)
                    </h5>
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="Hours"
                      style={{
                        width: "45%",
                        height: "45px",
                        borderRadius: "45px",
                        padding: "0 15px",
                      }}
                      required
                    />
                  </div>
                </div>
                {/* Your Location */}
                <div className="form-group" style={{ marginTop: "2rem" }}>
                  <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Location
                  </h5>
                  <select
                    id="location"
                    name="location" // Make sure the name attribute is "location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    style={{
                      width: "45%",
                      height: "50px",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <option value="" disabled>
                      Select location
                    </option>
                    <option value="Gymnasium">Gymnasium</option>
                    <option value="Learning Center">Learning Center</option>
                    <option value="Auditorium">Auditorium</option>
                    <option value="Wildcats Lounge<">Wildcats Lounge</option>
                    <option value="Covered Court">Covered Court</option>
                    <option value="Grandstand">Grandstand</option>{" "}
                    {/* Corrected the spelling here */}
                  </select>
                </div>
                {/* Organizer */}
                <div className="form-group" style={{ marginTop: "2rem" }}>
                  <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Head Organizer
                    <br />
                    Firstname
                  </h5>
                  <input
                    type="text"
                    id="organizer"
                    name="organizer"
                    // value={formData.organizer}
                    value={organizer.fname}
                    placeholder="Organizer name"
                    onChange={handleChange}
                    style={{
                      width: "30%",
                      height: "45px",
                      borderRadius: "45px",
                      padding: "0 15px",
                      marginRight: "10px",
                    }}
                    disabled
                  />
                  <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Last Name
                  </h5>
                  <input
                    type="text"
                    id="organizer"
                    name="organizer"
                    // value={formData.organizer}
                    value={organizer.lname}
                    placeholder="Organizer name"
                    onChange={handleChange}
                    style={{
                      width: "30%",
                      height: "45px",
                      borderRadius: "45px",
                      padding: "0 15px",
                      marginRight: "10px",
                    }}
                    disabled
                  />
                </div>
                {/* Specify year Level*/}
                <div className="form-group" style={{ marginTop: "2rem" }}>
                  <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Specify year Level
                  </h5>
                  <select
                    id="year"
                    name="year" // Make sure the name attribute is "location"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    style={{
                      width: "45%",
                      height: "50px",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <option value="" disabled>
                      Select Year Level
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="0">None</option>{" "}
                    {/* Corrected the spelling here */}
                  </select>
                </div>

                {/* Specify department*/}
                <div className="form-group" style={{ marginTop: "2rem" }}>
                  <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Specify department
                  </h5>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    style={{
                      width: "45%",
                      height: "50px",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <option value="" disabled>
                      Select department
                    </option>
                    <option value="CEA">CEA</option>
                    <option value="CCS">CCS</option>
                    <option value="CMBA">CMBA</option>
                    <option value="CASE">CASE</option>
                    <option value="CNAHS">CNAHS</option>
                    <option value="CCJ">CCJ</option>
                    <option value="None">None</option>
                  </select>
                </div>

                {/* Specify payment*/}
                <div className="form-group" style={{ marginTop: "2rem" }}>
                  <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Specify payment
                  </h5>
                  <select
                    id="payment"
                    name="payment" // Make sure the name attribute is "location"
                    value={formData.payment}
                    onChange={handleChange}
                    required
                    style={{
                      width: "45%",
                      height: "50px",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <option value="" disabled>
                      Required
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {/*  Maximum Attendees */}
                <div className="form-group" style={{ flex: 1 }}>
                  <h5
                    style={{
                      fontFamily: "DM Sans",
                      marginTop: "1rem",
                      color: "#666666",
                    }}
                  >
                    Maximum Attendees
                  </h5>
                  <input
                    type="number"
                    id="max"
                    name="max"
                    value={formData.max}
                    onChange={handleChange}
                    placeholder="Number of Attendees"
                    style={{
                      width: "45%",
                      height: "45px",
                      borderRadius: "45px",
                      padding: "0 15px",
                    }}
                    required
                  />
                </div>

                <input type="file" onChange={handleFileChange} />
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleUpload();
                  }}
                  disabled={!file}
                >
                  Upload Image
                </Button>

                {/* Submit  Button */}
                <div
                  className="form-group"
                  style={{ marginTop: "2rem", textAlign: "center" }}
                >
                  <Button
                    onClick={handleSubmit}
                    sx={{
                      backgroundColor: "maroon",
                      color: "white",
                      fontFamily: "'DM Sans', sans-serif",
                      width: "19rem",
                      height: "4rem",
                      fontWeight: "bold",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      padding: 0,
                      borderRadius: 50,
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Grid>
            <Grid xs={4}>
              <img src="img/tips.png" alt="logo" style={{ width: "100%" }} />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
