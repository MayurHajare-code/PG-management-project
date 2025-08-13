import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const UserBookingDetails = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/users/${id}/bookings`, {
        withCredentials: true,
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <AdminLayout>
      {/* Internal CSS */}
      <style>{`
        .pg-container {
          margin-left: 0px;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .pg-title {
          font-size: 28px;
          margin-bottom: 20px;
          color: #333;
        }
        .section {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .section h2 {
          margin-bottom: 15px;
          font-size: 20px;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 5px;
          color: #444;
        }
        .info-row {
          margin: 8px 0;
        }
        .label {
          font-weight: bold;
          color: #555;
        }
        .value {
          margin-left: 10px;
          color: #222;
        }
        .no-data {
          color: #888;
        }
      `}</style>

      <div className="pg-container">
        <h1 className="pg-title">User {id} – Booking Details</h1>

        {bookings.length === 0 ? (
          <p className="no-data">No bookings found.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="section">
              <h2>Booking ID: {b.id}</h2>
              <div className="info-row">
                <span className="label">PG Name:</span>
                <span className="value">{b.pg.name}</span>
              </div>
              <div className="info-row">
                <span className="label">Location:</span>
                <span className="value">{b.pg.location}</span>
              </div>
              <div className="info-row">
                <span className="label">Rent:</span>
                <span className="value">₹{b.pg.rent}</span>
              </div>
              <div className="info-row">
                <span className="label">Booking Date:</span>
                <span className="value">{b.bookingDate}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default UserBookingDetails;





// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import AdminLayout from "../../components/AdminLayout";

// const UserBookingDetails = () => {
//   const { id } = useParams();
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/admin/users/${id}/bookings`, {
//         withCredentials: true,
//       })
//       .then((res) => setBookings(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   return (
//     <AdminLayout>
//       <div style={{ marginLeft: "240px", padding: "20px" }}>
//         <h1>User {id} – Booking Details</h1>
//         {bookings.length === 0 ? (
//           <p>No bookings found.</p>
//         ) : (
//           <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
//             <thead>
//               <tr>
//                 <th>Booking ID</th>
//                 <th>PG Name</th>
//                 <th>PG Location</th>
//                 <th>Rent</th>
//                 <th>Booking Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((b) => (
//                 <tr key={b.id}>
//                   <td>{b.id}</td>
//                   <td>{b.pg.name}</td>
//                   <td>{b.pg.location}</td>
//                   <td>{b.pg.rent}</td>
//                   <td>{b.bookingDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </AdminLayout>
//   );
// };

// export default UserBookingDetails;
