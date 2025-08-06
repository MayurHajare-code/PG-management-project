import React, { useEffect, useState } from "react";
import axios from "axios";
import OwnerLayout from "../components/OwnerLayout";

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
      <div style={{ padding: "20px" }}>
        <h2>Total Bookings</h2>
        <table
          border="1"
          cellPadding="8"
          style={{ width: "100%", marginTop: "10px", padding: "10px" }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px" }} >User Name</th>
              <th style={{ padding: "10px" }} >Email</th>
              <th style={{ padding: "10px" }} >Phone</th>
              <th style={{ padding: "10px" }} >PG Name</th>
              <th style={{ padding: "10px" }} >Check-in Date</th>
              <th style={{ padding: "10px" }} >Comment</th>
              <th style={{ padding: "10px" }} >Status</th>
              <th style={{ padding: "10px" }} >Remark</th>
              <th style={{ padding: "10px" }} >Update</th>
              
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
                    value={booking.editedRemark}
                    onChange={(e) =>
                      handleRemarkChange(booking.id, e.target.value)
                    }
                    placeholder="Add remark"
                  />
                </td>
                <td>
                  <button onClick={() => handleSave(booking.id)}>Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
