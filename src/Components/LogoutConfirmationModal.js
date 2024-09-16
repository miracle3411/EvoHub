import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from "@mui/material";

const LogoutConfirmationModal = ({ open, handleClose, handleLogout }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
          Logout Confirmation
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
          Are you sure you want to log out?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" sx={{ marginRight: 2, backgroundColor: 'maroon', color: 'white', ":hover": { backgroundColor: '#6c0100' } }} onClick={handleLogout}>
            Yes
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose} sx={{ backgroundColor: '#EAA021', color: 'white', ":hover": { backgroundColor: '#D89000' } }}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogoutConfirmationModal;