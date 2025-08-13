import React, { useEffect, useState } from "react";
import axios from "axios";
import OwnerLayout from "../components/OwnerLayout";
import { Link } from "react-router-dom";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/owner/bookings", { withCredentials: true })
      .then((res) => {
        const bookingsWithEditFields = res.data.map((b) => ({
          ...b,
          editedStatus: b.status,
          editedRemark: b.remark || "",
        }));
        setBookings(bookingsWithEditFields);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings", err);
        setLoading(false);
      });


      fetch("http://localhost:8080/home", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "ROLE_OWNER") {
          setOwnerName(data.email); // extract email from "Welcome abc@gmail.com"
        }
      })
      .catch((err) => console.log(err));


  }, []);

  const handleStatusChange = (id, value) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, editedStatus: value } : b
      )
    );
  };

  const handleRemarkChange = (id, value) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, editedRemark: value } : b
      )
    );
  };

  const handleSave = (id) => {
    const booking = bookings.find((b) => b.id === id);
    axios
      .put(
        `http://localhost:8080/owner/bookings/${id}`,
        {
          status: booking.editedStatus,
          remark: booking.editedRemark,
        },
        { withCredentials: true }
      )
      .then(() => {
        alert("Booking updated");
        // Sync status/remark after successful update
        setBookings((prev) =>
          prev.map((b) =>
            b.id === id
              ? {
                  ...b,
                  status: b.editedStatus,
                  remark: b.editedRemark,
                }
              : b
          )
        );
      })
      .catch((err) => {
        console.error("Error updating status", err);
      });
  };

  if (loading) return <p>Loading bookings...</p>;
  return (
  <OwnerLayout ownerName={ownerName}>
    {/* Internal CSS */}
    <style>{`
      .bookings-container {
        padding: 20px;
        font-family: Arial, sans-serif;
      }

      .bookings-title {
        font-size: 26px;
        margin-bottom: 20px;
        color: #333;
      }

      .bookings-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      .bookings-table th,
      .bookings-table td {
        padding: 10px;
        border: 1px solid #ccc;
        text-align: left;
        vertical-align: middle;
      }

      .bookings-table th {
        background-color: #f4f4f4;
      }

      .bookings-table tr:nth-child(even) {
        background-color: #fafafa;
      }

      .status-select {
        padding: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
      }

      .remark-input {
        padding: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 150px;
      }

      .save-btn {
        padding: 6px 12px;
        background-color: #4CAF50;
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 4px;
        font-size: 14px;
      }

      .save-btn:hover {
        background-color: #45a049;
      }
    `}</style>

    <div className="bookings-container">
      <h2 className="bookings-title">Total Bookings</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>PG Name</th>
            <th>Check-in Date</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Remark</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.userName}</td>
              <td>{booking.userEmail}</td>
              <td>{booking.userPhone}</td>
              <td>{booking.pgName}</td>
              <td>{booking.checkinDate}</td>
              <td>{booking.comment}</td>
              <td>
                <select
                  className="status-select"
                  value={booking.editedStatus}
                  onChange={(e) =>
                    handleStatusChange(booking.id, e.target.value)
                  }
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="remark-input"
                  value={booking.editedRemark}
                  onChange={(e) =>
                    handleRemarkChange(booking.id, e.target.value)
                  }
                  placeholder="Add remark"
                />
              </td>
              <td>
                <button
                  className="save-btn"
                  onClick={() => handleSave(booking.id)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       <Link to="/pg_owner" className="add-pg-back-link">
            Back to Dashboard
          </Link>
    </div>
  </OwnerLayout>

  );
};

export default OwnerBookings;














// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import OwnerLayout from "../components/OwnerLayout";

// const OwnerBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [ownerName, setOwnerName] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/owner/bookings", { withCredentials: true })
//       .then((res) => {
//         setBookings(res.data);
//         setLoading(false);
//         console.log(res.data)
//       })
//       .catch((err) => {
//         console.error("Error fetching bookings", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleStatusChange = (bookingId, status, remark) => {
//     axios
//       .put(
//         `http://localhost:8080/owner/bookings/${bookingId}`,
//         { status, remark },
//         { withCredentials: true }
//       )
//       .then(() => {
//         alert("Booking updated");
//         // Refresh bookings after update
//         setBookings((prev) =>
//           prev.map((b) => (b.id === bookingId ? { ...b, status, remark } : b))
//         );
//       })
//       .catch((err) => {
//         console.error("Error updating status", err);
//       });
//   };

//   if (loading) return <p>Loading bookings...</p>;

//   return (
//     <OwnerLayout ownerName={ownerName}>
//       <div style={{ padding: "20px" }}>
//         <h2>Total Bookings</h2>
//         <table
//           border="1"
//           cellPadding="8"
//           style={{ width: "100%", marginTop: "10px", padding: "10px" }}
//         >
//           <thead>
//             <tr>
//               <th style={{ padding: "10px" }}>User</th>
//               <th style={{ padding: "10px" }}>PG Name</th>
//               <th style={{ padding: "10px" }}>Check-in Date</th>
//               <th style={{ padding: "10px" }}>Comment</th>
//               <th style={{ padding: "10px" }}>Status</th>
//               <th style={{ padding: "10px" }}>Remark</th>
//               <th style={{ padding: "10px" }}>Update</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking.id}>
//                 <td>{booking.user?.name || "N/A"}</td>
//                 <td>{booking.pg?.name || "N/A"}</td>

//                 <td>{booking.checkinDate}</td>
//                 <td>{booking.comment}</td>
//                 <td>
//                   <select
//                     value={booking.status}
//                     onChange={(e) =>
//                       handleStatusChange(
//                         booking.id,
//                         e.target.value,
//                         booking.remark || ""
//                       )
//                     }
//                   >
//                     <option value="PENDING">PENDING</option>
//                     <option value="APPROVED">APPROVED</option>
//                     <option value="REJECTED">REJECTED</option>
//                   </select>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={booking.remark || ""}
//                     onChange={(e) =>
//                       handleStatusChange(
//                         booking.id,
//                         booking.status,
//                         e.target.value
//                       )
//                     }
//                     placeholder="Add remark"
//                   />
//                 </td>
//                 <td>
//                   <button
//                     onClick={() =>
//                       handleStatusChange(
//                         booking.id,
//                         booking.status,
//                         booking.remark || ""
//                       )
//                     }
//                   >
//                     Save
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </OwnerLayout>
//   );
// };

// export default OwnerBookings;
