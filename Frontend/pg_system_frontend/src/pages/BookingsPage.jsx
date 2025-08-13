import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/bookings", { withCredentials: true })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Header />
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>My Bookings</h2>

      <div style={{ display: "flex", justifyContent: "center", margin:"50px" }}>
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "90%" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{padding:"10px", fontSize:"15px"}}>ID</th>
              <th style={{padding:"10px", fontSize:"15px"}}>Name</th>
              <th style={{padding:"10px", fontSize:"15px"}}>Location</th>
              <th style={{padding:"10px", fontSize:"15px"}}>Booking Date</th>
              <th style={{padding:"10px", fontSize:"15px"}}>Check-in Date</th>
              <th style={{padding:"10px", fontSize:"15px"}}>Status</th>
              <th style={{padding:"10px", fontSize:"15px"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No bookings found</td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.pg?.name || "N/A"}</td>
                  <td>{b.pg?.location || "N/A"}</td>
                  <td>{new Date(b.bookingDate).toLocaleString()}</td>
                  <td>{b.checkinDate}</td>
                  <td>{b.status || "Pending"}</td>
                  <td>
                    {/* Example action: Cancel (You can implement the handler) */}
                    <button style={{ padding: "4px 8px", color: "white", backgroundColor: "red", border: "none", borderRadius: "4px" }}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default BookingsPage;

