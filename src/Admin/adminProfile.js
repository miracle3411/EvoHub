import React, { useEffect } from "react";
import axios from 'axios';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Grid } from "@mui/material";
import Footer from "../Components/footer";
import Button from "@mui/material/Button";
import AdminHeader from "../Components/adminHeader";
import { Link } from 'react-router-dom';
import { useAdmin } from "../Components/AdminProvider";

export default function AdminProfile() {
  // const [adminData, setAdminData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { admin } = useAdmin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get('http://localhost:8080/admins/getAdmin/2');
        // setAdminData(response.data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);
console.log("admin: ", admin)
  return (
    <div>
      <AdminHeader />
      <div>
        <img
          src="./img/userprofile.jpg"
          alt="logo"
          className="banner"
          style={{ position: "absolute", zIndex: -1, width: "100%" }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginTop: "8.6rem" }}>
            <Avatar
              alt={admin ? admin.firstName : "Admin"}
              src={admin ? admin.avatarSrc : "/static/images/avatar/default.jpg"}
              sx={{ width: 120, height: 120 }}
            />
            <div></div>
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {admin && (
            <>
              <h2 style={{ fontSize: "2.8rem" }}>{admin.firstName || 'N/A'} {admin.lastName || 'N/A'}</h2>
              <p style={{ fontSize: "1.2rem", marginTop: "-1.8rem" }}>{admin.title || 'N/A'}</p>
            </>
          )}
        </div>
        <Container maxWidth="lg" sx={{ marginBottom: "5rem" }}>
          <Grid
            container
            spacing={2}
            style={{
              margin: "0 auto",
              fontFamily: "'DM Sans', sans-serif",
              marginTop: "5rem",
              padding: "5rem",
            }}
          >
            <Grid item xs={12} md={6} >
              {admin && (
                <div>
                  <p><b>First Name:</b> {admin.firstName || 'N/A'}</p>
                  <p><b>Last Name:</b> {admin.lastName || 'N/A'}</p>
                  <p><b>Department:</b> {admin.department || 'N/A'}</p>
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {admin && (
                <div>
                  <p><b>Email Address:</b> {admin.email || 'N/A'}</p>
                  <p><b>Phone:</b> {admin.phone || 'N/A'}</p>
                </div>
              )}
            </Grid>
          </Grid>
          <p>
            <h3>About Me</h3>
          </p>
          <textarea
            style={{
              border: "1px solid black",
              height: "10rem",
              width: "100%",
              margin: "0 auto",
              borderRadius: "20px",
              padding: "1rem",
              resize: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
            }}
            value={admin ? admin.bio : ""}
            readOnly
          />
           <Link to="/adminProfileEdit">
           <Button variant="contained">
              Edit
            </Button>
        </Link>
        </Container>
        <Footer />
      </div>
    </div>
  );
}