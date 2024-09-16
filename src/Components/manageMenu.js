import React from 'react';
import { Typography } from "@mui/material";
import './EventRibbon.css';
import { Link } from 'react-router-dom';

export default function ManageRequests({ onDelete, onJoin, onRequests, onEdit}) {
  return (
    <div style={{ background: '#C02147', height: '85px', display: 'flex', justifyContent: 'flex-end' }}>
      <button >join</button>
      <button>requests</button>
      <button onClick={onDelete}>delete</button>
      <button>edit</button>
    </div>
  );
}

