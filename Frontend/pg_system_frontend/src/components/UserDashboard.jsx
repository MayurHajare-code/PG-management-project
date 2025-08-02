import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [pgList, setPgList] = useState([]);

  useEffect(() => {
    axios.get('/users/pgs')
      .then(res => {
        console.log(res.data);
        
        setPgList(res.data); 
      })
      .catch(err => {
        console.error('Failed to fetch PGs:', err);
      });
  }, []);

  return (
    <div>
      <h2>All PG Listings</h2>
      {Array.isArray(pgList) && pgList.length > 0 ? (
        pgList.map(pg => (
          <div key={pg.id}>
            <p><strong>{pg.name}</strong> - ₹{pg.price}</p>
            <p>{pg.location}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No PGs available.</p>
      )}
    </div>
  );
};

export default UserDashboard;