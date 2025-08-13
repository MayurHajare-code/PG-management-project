import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const OwnersPage = () => {
  const [owners, setOwners] = useState([]);

  const fetchOwners = async () => {
    const res = await axios.get("http://localhost:8080/admin/owners", {
      withCredentials: true,
    });
    setOwners(res.data);
  };

  const deleteOwner = async (id) => {
    await axios.delete(`http://localhost:8080/admin/owners/${id}`, {
      withCredentials: true,
    });
    fetchOwners();
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  return (
    <AdminLayout>
      {/* Internal CSS */}
      <style>{`
        .owners-container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .owners-title {
          margin-bottom: 20px;
          font-size: 28px;
          color: #333;
        }

        .owners-table {
          width: 100%;
          border-collapse: collapse;
        }

        .owners-table th,
        .owners-table td {
          padding: 10px;
          border: 1px solid #ccc;
          text-align: left;
        }

        .owners-table th {
          background-color: #f4f4f4;
        }

        .owners-table tr:nth-child(even) {
          background-color: #fafafa;
        }

        .action-btn {
          padding: 6px 12px;
          background-color: #f44336;
          border: none;
          color: white;
          cursor: pointer;
          border-radius: 4px;
          font-size: 14px;
        }

        .action-btn:hover {
          background-color: #d32f2f;
        }
      `}</style>

      <div className="owners-container">
        <h1 className="owners-title">Owners</h1>
        <table className="owners-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Register Date</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {owners.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.name}</td>
                <td>{o.phone}</td>
                <td>{o.registerDate}</td>
                {/* <td>
                  <button
                    className="action-btn"
                    onClick={() => deleteOwner(o.id)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default OwnersPage;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminLayout from "../../components/AdminLayout";

// const OwnersPage = () => {
//   const [owners, setOwners] = useState([]);

//   const fetchOwners = async () => {
//     const res = await axios.get("http://localhost:8080/admin/owners", {
//       withCredentials: true,
//     });
//     setOwners(res.data);
//   };

//   const deleteOwner = async (id) => {
//     await axios.delete(`http://localhost:8080/admin/owners/${id}`, {
//       withCredentials: true,
//     });
//     fetchOwners();
//   };

//   useEffect(() => {
//     fetchOwners();
//   }, []);

//   return (
//     <AdminLayout>
//       <div style={{ marginLeft: "0px", padding: "20px" }}>
//         <h1>Owners</h1>
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
//               {/* <th>Action</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {owners.map((o) => (
//               <tr key={o.id}>
//                 <td>{o.id}</td>
//                 <td>{o.name}</td>
//                 <td>{o.phone}</td>
//                 <td>{o.registerDate}</td>
//                 {/* <td>
//                   <button onClick={() => deleteOwner(o.id)}>Update</button>
//                 </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </AdminLayout>
//   );
// };

// export default OwnersPage;
