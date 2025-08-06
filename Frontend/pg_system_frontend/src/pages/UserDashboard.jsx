import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/home", { withCredentials: true })
      .then((res) => setUserData(res.data))
      .catch((err) => {
        console.error(err);
        navigate("/unauthorized");
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/home", { withCredentials: true })
      .then((res) => setUserData(res.data))
      .catch((err) => {
        console.error(err);
        navigate("/unauthorized");
      });

    // Fetch bookings
    axios
      .get("http://localhost:8080/users/bookings", { withCredentials: true })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout", {}, { withCredentials: true })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {userData ? (
        <div>
          {/* <p><strong>Name:</strong> {userData.name}</p> */}
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Role:</strong> {userData.role}
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <hr />

      <h3>My Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>PG Name</th>
              <th>City</th>
              <th>Rent</th>
              <th>Booking ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.pg?.name}</td>
                <td>{booking.pg?.city}</td>
                <td>₹{booking.pg?.rent}</td>
                <td>{booking.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboard;
