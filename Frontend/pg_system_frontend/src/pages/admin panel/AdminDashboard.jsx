// import React from "react";
// import { Outlet } from "react-router-dom";
// // import Sidebar from "./AdminSidebar";
// import AdminLayout from "../../components/AdminLayout";

// const AdminDashboard = () => {
//   return (
//       <AdminLayout >
//       {/* <h1>Admin Dashboard</h1> */}
//       <p>This is the Admin dashboard.</p>
//     </AdminLayout>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null); // null means loading

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/stats", { withCredentials: true })
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error(err);
        setStats({ users: 0, owners: 0, pgs: 0 }); // fallback
      });
  }, []);

  return (
    <AdminLayout>
      <style>{`
        .dashboard-container {
          margin-left: 0px;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .cards {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 20px;
        }
        .card {
          flex: 1;
          min-width: 220px;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }
        .card-title {
          font-size: 18px;
          color: #555;
          margin-bottom: 10px;
        }
        .card-value {
          font-size: 28px;
          font-weight: bold;
          color: #333;
        }
      `}</style>

      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>
        <div className="cards">
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <div className="card">
              <div className="card-title">Total Users</div>
              <div className="card-value">
                {stats ? stats.users : "Loading..."}
              </div>
            </div>
          </Link>

          <Link to="/admin/owners" style={{ textDecoration: "none" }}>
            <div className="card">
              <div className="card-title">Total Owners</div>
              <div className="card-value">
                {stats ? stats.owners : "Loading..."}
              </div>
            </div>
          </Link>

          <Link to="/admin/pgs" style={{ textDecoration: "none" }}>
            <div className="card">
              <div className="card-title">Total PGs</div>
              <div className="card-value">
                {stats ? stats.pgs : "Loading..."}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
