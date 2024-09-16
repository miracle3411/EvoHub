import React, { useEffect, useState } from "react";
import AdminHeader from "../Components/adminHeader";
import axios from "axios";
import {
  Button,
  Container,
  MenuItem,
  Paper,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import Footer from "../Components/footer";
import AdminOrganReqDetails from "./AdminOrganReqDetails";
import Avatar from "@mui/material/Avatar";

export default function AdminOrganReq() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [manageOrganizerRequest, setManageOrganizerRequest] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/manageOrganizerRequest/getAllManageOrganizerRequests"
      )
      .then((response) => {
        // setEvents(response.data);
        const tmpEvent = response.data;
        const origEv = tmpEvent.filter((tmpEv) => tmpEv.status === "Pending");
        console.log("origEv: ", origEv);
        setManageOrganizerRequest(origEv);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "http://localhost:8080/participantrequest/getAllParRequests"
  //     )
  //     .then((response) => {
  //       // setEvents(response.data);
  //       const tmpEvent = response.data;
  //       console.log("tmpEvent: ", tmpEvent);
  //       const origEv = tmpEvent.filter((tmpEv) => tmpEv.status === "Accepted");
  //       console.log("origEv: ", origEv);
  //       // setManageOrganizerRequest(origEv);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching events:", error);
  //     });
  // }, []);

  function createData(id, name, email, role, department, organization) {
    return { id, name, email, role, department, organization };
  }
  const rows = [
    createData(1, "Jane Doe", "jane.doe@gmail.com", "Faculty", "CCS", "GDSC"),
    createData(2, "Clark Doe", "jane.doe@gmail.com", "Student", "CCS", "GDSC"),
    createData(3, "Jonas Doe", "jane.doe@gmail.com", "Student", "CCS", "GDSC"),
    createData(4, "Shem Doe", "jane.doe@gmail.com", "Faculty", "CCS", "GDSC"),
    createData(5, "Von Doe", "jane.doe@gmail.com", "Staff", "CCS", "GDSC"),
    createData(6, "Ludi Doe", "jane.doe@gmail.com", "Student", "CCS", "GDSC"),
    createData(7, "John Doe", "jane.doe@gmail.com", "Staff", "BSIT", "GDSC"),
  ];

  const [filterValue, setFilterValue] = useState(""); // State for the selected filter value
  const filteredRows = manageOrganizerRequest.filter(
    (manageOrganizerRequests) =>
      !filterValue || manageOrganizerRequests.dept === filterValue
  );

  console.log(manageOrganizerRequest);

  // const handleDeleteUser = (organReqId) => {
  //   if (organReqId) {
  //     axios
  //       .delete(
  //         `http://localhost:8080/manageOrganizerRequest/updateManageOrganizerRequest/${organReqId}`
  //       )
  //       .then(() => {
  //         alert("User deleted successfully");
  //         setShowDetails(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error deleting user:", error);
  //       });
  //   }
  // };
  const handleDeleteUser = async (organReqId) => {
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
        status: "Decline" || "",
      };
      console.log("updated: ", updatedFormData);
      const response = await axios.put(
        `http://localhost:8080/manageOrganizerRequest/updateManageOrganizerRequest?organReqId=${organReqId}`,
        updatedFormData
      );
      console.log("API Response:", response.data);
      alert("Event Request Successfully Declined!");
      window.location.reload();
    } catch (error) {
      console.error("Error accepting event request:", error);
    }
  };
  return (
    <div>
      <AdminHeader />
      <img src="./img/adminorganreq.jpg" alt="logo" className="banner" />
      <Container maxWidth="lg">
        <h2 style={{ fontFamily: "'DM Sans', sans-serif", marginTop: "5rem" }}>
          Organizer Request
        </h2>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {/* Dropdown/Select for filtering */}
            <Select
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                setShowDetails(false);
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">All</MenuItem>
              {/* Add unique carb values from your rows */}
              {[
                ...new Set(
                  manageOrganizerRequest.map(
                    (manageOrganizerRequests) => manageOrganizerRequests.dept
                  )
                ),
              ].map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <TextField
              className="txt"
              id="fname"
              label="Search"
              type="text"
              variant="outlined"
            />
          </div>
        </div>

        <br />
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#C02147" }}>
                <TableCell align="center" sx={{ color: "white" }}>
                  Users
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  User Identification
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Department
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  Organization
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}></TableCell>
                <TableCell align="center" sx={{ color: "white" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showDetails === true ? (
                // <AdminOrganReqDetails setShowDetails={setShowDetails} />
                // ) : (
                <>
                  {filteredRows
                    .filter(
                      (manageOrganizerRequest) =>
                        manageOrganizerRequest.organReqId === selectedTableId
                    )
                    .map((manageOrganizerRequest) => (
                      <TableRow
                        key={manageOrganizerRequest.organReqId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          if (!e.target.closest("button")) {
                            // Only trigger the alert if the clicked element is not a button
                            // alert('You clicked on ' + row.id);
                            setShowDetails(!showDetails);
                            setSelectedTableId(
                              manageOrganizerRequest.organReqId
                            );
                          }
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Avatar
                              alt={manageOrganizerRequest.fname}
                              src="/static/images/avatar/2.jpg"
                              sx={{ marginRight: "1rem" }}
                            />
                            <div>
                              {manageOrganizerRequest.fname}
                              <p>{manageOrganizerRequest.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {manageOrganizerRequest.role}
                        </TableCell>
                        <TableCell align="center">
                          {manageOrganizerRequest.dept}
                        </TableCell>
                        <TableCell align="center">
                          {manageOrganizerRequest.organization}
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              ) : (
                <>
                  {filteredRows.map((manageOrganizerRequest) => (
                    <TableRow
                      key={manageOrganizerRequest.organReqId}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        if (!e.target.closest("button")) {
                          // Only trigger the alert if the clicked element is not a button
                          // alert('You clicked on ' + row.id);
                          setShowDetails(!showDetails);
                          setSelectedTableId(manageOrganizerRequest.organReqId);
                        }
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            alt={manageOrganizerRequest.fname}
                            src="/static/images/avatar/2.jpg"
                            sx={{ marginRight: "1rem" }}
                          />
                          <div>
                            {manageOrganizerRequest.fname}
                            <p>{manageOrganizerRequest.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {manageOrganizerRequest.role}
                      </TableCell>
                      <TableCell align="center">
                        {manageOrganizerRequest.dept}
                      </TableCell>
                      <TableCell align="center">
                        {manageOrganizerRequest.organization}
                      </TableCell>
                      <TableCell align="center" sx={{ zIndex: 1 }}>
                        <Button
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
                                `http://localhost:8080/manageOrganizerRequest/updateManageOrganizerRequest?organReqId=${manageOrganizerRequest.organReqId}`,
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
                        >
                          <img src="./img/Donecheck.png" alt="Edit" />
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
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
                                `http://localhost:8080/manageOrganizerRequest/updateManageOrganizerRequest?organReqId=${manageOrganizerRequest.organReqId}`,
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
                        >
                          <img src="./img/RedDeleteBtn.png" alt="Edit" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {showDetails && (
          <AdminOrganReqDetails
            setShowDetails={setShowDetails}
            selectedTableId={selectedTableId}
          />
        )}
      </Container>
      <Footer />
    </div>
  );
}
