import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../Components/header";
import Container from "@mui/material/Container";
import axios from "axios";
import "./OrganizerApplicationForm.css";
// import Button from "../Components/ButtonMaroon";
import Footer from "../Components/footer";
import { Button, TextField } from "@mui/material";
import { useUser } from '../Components/UserProvider';
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    // firstName: "",
    // middleName: "",
    // lastName: "",
    // email: "",
    // pass: "",
    role: "",
    // department: "",
    organization: "",
    message: "",
  });
  useEffect(() => {
    window.scroll(0, 0);
  }, []); // Empty dependency array means the effect runs only once on mount
  
  const [textFieldHeight, setTextFieldHeight] = useState('auto');

  const handleInputChange = (event) => {
      if (event && event.target) {
          const inputLines = event.target.value.split('\n').length;
          const fixedLineHeight = 1.5;
          const newHeight = `${inputLines * fixedLineHeight}em`;
          setTextFieldHeight(newHeight);
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (formData) => {
    // Check if required fields are filled
    if (
      // formData.firstName &&
      // formData.middleName &&
      // formData.lastName &&
      // formData.email &&
      // formData.pass &&
      formData.role &&
      // formData.department &&
      formData.organization &&
      formData.message
    ) {
      // // Check email format using a simple regular expression
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(formData.email)) {
      //   console.log("Email is not valid!");
      //   return false;
      // }

      // // Additional validation logic for specific fields
      // // Check the length of the password (assuming it's a required field)
      // if (formData.password && formData.password.length < 8) {
      //   console.log("Passowrd is too short!");
      //   return false;
      // }

      // // Check the format of the phone number (assuming it's optional)
      // const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
      // if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      //   console.log("Phone number is not in the correct format!");
      //   return false;
      // }

      // If all checks pass, the form is valid
      return true;
    }

    // If any required field is missing, the form is not valid
    return false;
  };

  const submitForm = async () => {
    console.log("Form Data:", formData);
    console.log("Is Form Valid:", validateForm(formData));
    try {
      if (!validateForm(formData)) {
        console.error("Please fill out all required fields.");
        return;
      }

      // Replace the following with actual user and organizer IDs
      // const userId = ""; // Add logic to get the user ID
      // const organizerId = ""; // Add logic to get the organizer ID

      // Make a POST request to the new endpoint
      const response = await axios.post(
        "http://localhost:8080/manageOrganizerRequest/insertManageOrganizerRequest",
        {
          userId: user.userid,
          fname: user.fname,
          mname: user.mname,
          lname: user.lname,
          email: user.email,
          pass: user.pass,
          role: formData.role,
          dept: user.dept,
          organization: formData.organization,
          message: formData.message,
          status: "Pending",
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      // Log the server response (for demonstration purposes)
      alert("Successfully Submitted", response.data);
      navigate("/EventUserHome");
      // You can perform additional actions based on the server response
      // For example, show a success message or redirect the user
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Error details:", error.response.data); // Log response data
      alert("Error submitting form. Please check the console for details.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the function to submit the form data
    submitForm();
  };

  return (
    <>
      <ResponsiveAppBar />
      <img
        src="img/organizerrequest.jpg"
        alt="logo"
        style={{ width: "100%" }}
      />
      <Container maxWidth="lg">
        <div className="centered-form">
          <h1 style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Application Form
          </h1>
          <div className="centered-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <h5>First Name:</h5>
                <input
                  type="text"
                  name="firstName"
                  // value={formData.firstName}
                  value={user.fname}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  style={{
                    borderRadius: "45px",
                    padding: "15px",
                    width: "100%",
                  }}
                  disabled
                />
              </div>
              <div className="form-group">
                <h5>Middle Name:</h5>
                <input
                  type="text"
                  name="middleName"
                  // value={formData.middleName}
                  value={user.mname}
                  placeholder="Enter Middle Name"
                  style={{
                    borderRadius: "45px",
                    padding: "15px",
                    width: "100%",
                  }}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <h5>Last Name:</h5>
                <input
                  type="text"
                  name="lastName"
                  // value={formData.lastName}
                  value={user.lname}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  style={{
                    borderRadius: "45px",
                    padding: "15px",
                    width: "100%",
                  }}
                  disabled
                />
              </div>
              {/* <div className="form-group">
                <h5>Event Name:</h5>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="Enter Event Name"
                  style={{
                    borderRadius: "45px",
                    padding: "15px",
                    width: "100%",
                  }}
                  required
                />
              </div> */}
              <div className="form-group">
                <h5>School Email Address:</h5>
                <input
                  type="email"
                  name="email"
                  // value={formData.email}
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter School Email Address"
                  style={{
                    borderRadius: "45px",
                    padding: "15px",
                    width: "100%",
                    maxWidth: "600px",
                  }}
                  disabled
                />
              </div>
              <div className="form-group">
                <h5>Please Select Role:</h5>
                <div>
                  <input
                    type="radio"
                    name="role"
                    value="faculty"
                    checked={formData.role === "faculty"}
                    onChange={handleChange}
                    required
                  />
                  <label>Faculty</label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                    required
                  />
                  <label>Student</label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="role"
                    value="staff"
                    checked={formData.role === "staff"}
                    onChange={handleChange}
                    required
                  />
                  <label>Staff</label>
                </div>
              </div>
              {/* <div className="form-group">
                <h5>Year Level</h5>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    width: "100%",
                    height: "50px",
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="None">None</option>
                </select>
              </div> */}
              <div className="form-group">
                <h5>Select Department</h5>
                <select
                  name="department"
                  // value={formData.department}
                  value={user.dept}
                  onChange={handleChange}
                  disabled
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    width: "100%",
                    height: "50px",
                  }}
                >
                  <option value="CEA">CEA</option>
                  <option value="CCS">CCS</option>
                  <option value="CMBA">CMBA</option>
                  <option value="CASE">CASE</option>
                  <option value="CNAHS">CNAHS</option>
                  <option value="CCJ">CCJ</option>
                  <option value="None">None</option>
                </select>
              </div>
              <div className="form-group">
                <h5>Select Organization</h5>
                <select
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "10px",
                    padding: "10px",
                    width: "100%",
                    height: "50px",
                  }}
                >
                  <option value="GDSC">GDSC</option>
                  <option value="CCS">CCS</option>
                  <option value="CMBA">CMBA</option>
                  <option value="CASE">CASE</option>
                  <option value="CNAHS">CNAHS</option>
                  <option value="CCJ">CCJ</option>
                  <option value="None">None</option>
                </select>
              </div>

              {/* <div className="form-group">
                <h5>Drag a Photo or Click to Upload:</h5>
                <div
                  className="drag-drop-area"
                  onClick={() =>
                    document.querySelector('input[name="photo"]').click()
                  }
                >
                  <div className="drag-drop-box">
                    {formData.photo ? (
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt="Uploaded"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <p>Drag & Drop or Click to Upload</p>
                    )}
                  </div>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, photo: e.target.files[0] })
                    }
                    style={{ display: "none" }}
                  />
                  
                </div>
              </div> */}

              <div style={{ marginBottom: "5rem" }}>
              <h5>Message to the Admin for Request of Approval</h5>
                    <TextField
                      className='txt'
                      id="fname"
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => { handleInputChange(e); handleChange(e); }}
                      type="text"
                      variant='outlined'
                      multiline
                      sx={{
                        width: "100%", maxWidth: "100%", padding: '1rem', display: "flex", maxHeight: "auto",
                        height: textFieldHeight, marginBottom: '1rem',
                      }}
                    />
                  </div>
              <div
                className="form-group"
                style={{ textAlign: "center", padding: "100px" }}
              >
                {/* <Button name="Submit" onClick={submitForm} /> */}
                <Button sx={{
                  backgroundColor: 'maroon', color: 'white', width: '19rem', height: '4rem', fontWeight: 'bold', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
                  display: "flex", justifyContent: "center", padding: 0, borderRadius: 50,

                }} onClick={submitForm}>Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ApplicationForm;
