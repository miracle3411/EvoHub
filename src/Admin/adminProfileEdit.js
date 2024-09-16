import React, { useState } from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Button, Grid, TextField } from "@mui/material";
import Footer from "../Components/footer";
import ButtonM from "../Components/ButtonMaroon";
import AdminHeader from "../Components/adminHeader";
import axios from 'axios';
import { useAdmin } from '../Components/AdminProvider';

export default function AdminProfileEdit() {
  const { admin, login } = useAdmin();
  const [selectedGender, setSelectedGender] = useState("");
  const [ textFieldHeight ] = useState("auto");
  const [formData, setFormData] = useState({
    adminName: admin.adminName,
    email: admin.email,
    pass: admin.pass,
    firstName: admin.firstName,
    middleName: admin.middleName,
    lastName: admin.lastName,
    gender: admin.gender,
    department: admin.department,
    title: admin.title,
    bio: admin.bio,
    country: admin.country,
    city: admin.city,
    birthdate: admin.birthdate,
    phone: admin.phone
  });

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  // const handleInputChange = (event) => {
  //   const { id, value } = event.target;
  //   setFormData({ ...formData, [id]: value });
  //   const inputLines = value.split("\n").length;
  //   const fixedLineHeight = 1.5;
  //   const newHeight = `${inputLines * fixedLineHeight}em`;
  //   setTextFieldHeight(newHeight);
  // };

  const handleProfileUpdate = async () => {
    try {
      // const data = { ...formData, gender: selectedGender };
      const response = await axios.put(
        `http://localhost:8080/admins/updateAdmin?adminid=${admin.adminId}`, // Ensure adminId is defined
        formData,

        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("formData", formData);
      login(response.data);
      alert('Profile Updated');
      // Handle success or navigate to another page upon successful update
    } catch (error) {
      alert('Error updating profile:', error);
      // Handle error state or display an error message to the user
    }
  };

  console.log(admin)
  return (
    <div>
      <AdminHeader />
      <div>
        <img
          src="./img/userprofile.jpg"
          alt="logo"
          className="banner"
          width="100%"
        />
      </div>

      <Container maxWidth="lg" sx={{ marginBottom: "5rem" }}>
        <div>
          <div
            style={{ marginTop: "3rem", display: "flex", alignItems: "center" }}
          >
            <Avatar
              alt="Kyle"
              src="/static/images/avatar/2.jpg"
              sx={{ width: 120, height: 120 }}
            />
            <p>&nbsp;</p>
            <ButtonM name="Upload" />
          </div>
          <Grid
            container
            spacing={2}
            style={{ margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}
          >
            <Grid item xs={6} md={6}>
              <p>
                <b>First Name:</b>
              </p>
              <TextField
                className="txt"
                id="firstName"
                type="text"
                variant="outlined"
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                value={formData.firstName}
              />
              <p>
                <b>Middle Name:</b>
              </p>
              <TextField
                className="txt"
                id="middleName"
                type="text"
                variant="outlined"
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                value={formData.middleName}
              />

              <p>
                <b>Last Name:</b>
              </p>
              <TextField
                className="txt"
                id="lastName"
                type="text"
                variant="outlined"
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                value={formData.lastName}
              />
              <div>
                <label>
                  <p>
                    <b>Gender: </b>
                    <select
                      value={selectedGender}
                      onChange={handleGenderChange} // Use handleGenderChange here
                      id="gender"
                      style={{ width: "20%", fontSize: ".9rem" }}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </p>
                </label>
              </div>

              <p>
                <b>Department:</b>
              </p>
              <TextField
                className="txt"
                id="department"
                type="text"
                variant="outlined"
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                value={formData.department}
              />
              <p>
                <b>Title:</b>
              </p>
              <TextField
                className="txt"
                id="title"
                type="text"
                variant="outlined"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                value={formData.title}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <p>
                <b>Email Address:</b>
              </p>
              <TextField
                className="txt"
                id="email"
                type="text"
                variant="outlined"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
              />
              <p>
                <b>Phone:</b>
              </p>
              <TextField
                className="txt"
                id="phone"
                type="text"
                variant="outlined"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                value={formData.phone}
              />
              <p>
                <b>Date of Birth:</b>
              </p>
              <TextField
                className="txt"
                id="birthdate"
                type="text"
                variant="outlined"
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                value={formData.birthdate}
              />
              <p>
                <b>City:</b>
              </p>
              <TextField
                className="txt"
                id="city"
                type="text"
                variant="outlined"
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                value={formData.city}
              />
              <p>
                <b>Country:</b>
              </p>
              <TextField
                className="txt"
                id="country"
                type="text"
                variant="outlined"
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                value={formData.country}
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
          </Grid>

          <div style={{ marginBottom: "5rem" }}>
            <p>Bio</p>
            <TextField
              className="txt"
              id="bio"
              label="I like cats"
              type="text"
              variant="outlined"
              multiline
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              value={formData.bio}
              sx={{
                width: "100%",
                maxWidth: "100%",
                maxHeight: "auto",
                padding: "1rem",
                display: "flex",
                height: textFieldHeight,
                marginBottom: "1rem",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button sx={{
            backgroundColor: 'maroon', color: 'white', fontFamily: "'DM Sans', sans-serif", width: '19rem', height: '4rem', fontWeight: 'bold',  fontSize: '1rem',
            display: "flex", justifyContent: "center", padding: 0, borderRadius: 50

          }} onClick={handleProfileUpdate}>Update Profile</Button>
        </div>
        {/* <button onClick={handleProfileUpdate}>
          update
        </button> */}
      </Container>
      <Footer />
    </div>
  );
}