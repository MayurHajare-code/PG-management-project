import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/admin/users", {
      withCredentials: true,
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      {/* Internal CSS */}
      <style>{`
        .users-container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .users-title {
          margin-bottom: 20px;
          font-size: 28px;
          color: #333;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
        }

        .users-table th,
        .users-table td {
          padding: 10px;
          border: 1px solid #ccc;
          text-align: left;
        }

        .users-table th {
          background-color: #f4f4f4;
        }

        .users-table tr:nth-child(even) {
          background-color: #fafafa;
        }

        .view-btn {
          padding: 6px 12px;
          background-color: #4CAF50;
          border: none;
          color: white;
          cursor: pointer;
          border-radius: 4px;
          font-size: 14px;
        }

        .view-btn:hover {
          background-color: #45a049;
        }
      `}</style>

      <div className="users-container">
        <h1 className="users-title">Users</h1>
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Register Date</th>
              <th>Booking Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.phone}</td>
                <td>{u.registerDate}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/admin/users/${u.id}/bookings`)}
                  >
                    View Booking Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminLayout from "../../components/AdminLayout";
// import { useNavigate } from "react-router-dom";

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);

//   const navigate = useNavigate();

//   const fetchUsers = async () => {
//     const res = await axios.get("http://localhost:8080/admin/users", {
//       withCredentials: true,
//     });
//     console.log(res.data);
//     setUsers(res.data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <AdminLayout>
//       <div style={{ marginLeft: "0px", padding: "20px" }}>
//         <h1>Users</h1>
//         <table
//           border="1"
//           cellPadding="8"
//           style={{ borderCollapse: "collapse" }}
//         >
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>Register Date</th>
//               <th>Booking Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id}>
//                 <td>{u.id}</td>
//                 <td>{u.name}</td>
//                 <td>{u.phone}</td>
//                 <td>{u.registerDate}</td>
//                 <td>
//                   <button
//                     onClick={() => navigate(`/admin/users/${u.id}/bookings`)}
//                   >
//                     View Booking Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </AdminLayout>
//   );
// };

// export default UsersPage;
