import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

const PGsPage = () => {
  const [pgs, setPgs] = useState([]);
  const navigate = useNavigate();

  const fetchPGs = async () => {
    const res = await axios.get("http://localhost:8080/admin/pgs", {
      withCredentials: true,
    });
    setPgs(res.data);
  };

  useEffect(() => {
    fetchPGs();
  }, []);

  return (
    <AdminLayout>
      {/* Internal CSS */}
      <style>{`
        .pgs-container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .pgs-title {
          margin-bottom: 20px;
          font-size: 28px;
          color: #333;
        }

        .pgs-table {
          width: 100%;
          border-collapse: collapse;
        }

        .pgs-table th,
        .pgs-table td {
          padding: 10px;
          border: 1px solid #ccc;
          text-align: left;
        }

        .pgs-table th {
          background-color: #f4f4f4;
        }

        .pgs-table tr:nth-child(even) {
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

      <div className="pgs-container">
        <h1 className="pgs-title">PGs</h1>
        <table className="pgs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Rent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pgs.map((pg) => (
              <tr key={pg.id}>
                <td>{pg.id}</td>
                <td>{pg.name}</td>
                <td>{pg.location}</td>
                <td>{pg.rent}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/admin/pgs/${pg.id}`)}
                  >
                    View Details
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

export default PGsPage;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminLayout from "../../components/AdminLayout";
// import { useNavigate } from "react-router-dom";

// const PGsPage = () => {
//   const [pgs, setPgs] = useState([]);

//   const navigate = useNavigate();

//   const fetchPGs = async () => {
//     const res = await axios.get("http://localhost:8080/admin/pgs", {
//       withCredentials: true,
//     });
//     setPgs(res.data);
//   };

//   useEffect(() => {
//     fetchPGs();
//   }, []);

//   return (
//     <AdminLayout>
//       <div style={{ marginLeft: "0px", padding: "20px" }}>
//         <h1>PGs</h1>
//         <table
//           border="1"
//           cellPadding="8"
//           style={{ borderCollapse: "collapse" }}
//         >
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Location</th>
//               <th>Rent</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pgs.map((pg) => (
//               <tr key={pg.id}>
//                 <td>{pg.id}</td>
//                 <td>{pg.name}</td>
//                 <td>{pg.location}</td>
//                 <td>{pg.rent}</td>
//                 <td>
//                   <button onClick={() => navigate(`/admin/pgs/${pg.id}`)}>
//                     View Details
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

// export default PGsPage;
