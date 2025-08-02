import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerDashboard = ({ ownerId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get(`/pg-owner/${ownerId}/booking-requests`).then(res => setRequests(res.data));
  }, []);

  const approveRequest = (id) => {
    axios.post(`/pg-owner/approve-request/${id}`).then(() => alert('Request approved'));
  };

  return (
    <div>
      <h2>Booking Requests</h2>
      {requests.map(req => (
        <div key={req.id}>
          <p>User: {req.user.username}, PG: {req.pg.name}, Status: {req.status}</p>
          <button onClick={() => approveRequest(req.id)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default OwnerDashboard;