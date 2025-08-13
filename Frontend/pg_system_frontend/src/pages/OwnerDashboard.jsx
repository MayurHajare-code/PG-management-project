// import React, { useEffect, useState } from "react";
// import OwnerLayout from "../components/OwnerLayout";

// const OwnerDashboard = () => {
//   const [ownerName, setOwnerName] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8080/home", {
//       credentials: "include"
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.role === "ROLE_OWNER") {
//           setOwnerName(data.email); // extract email from "Welcome abc@gmail.com"
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <OwnerLayout ownerName={ownerName}>
//       {/* <h1>Dashboard</h1> */}
//       <p>This is the PG Owner dashboard.</p>
//     </OwnerLayout>
//   );
// };

// export default OwnerDashboard;

import React, { useEffect, useState } from "react";
import OwnerLayout from "../components/OwnerLayout";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  const [ownerName, setOwnerName] = useState("");
  const [stats, setStats] = useState(null); // to store PG and booking count

  useEffect(() => {
    // Fetch owner info
    fetch("http://localhost:8080/home", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "ROLE_OWNER") {
          setOwnerName(data.email);

          // Fetch PG & booking stats for this owner
          fetch(`http://localhost:8080/owner/pgs/stats`, {
            credentials: "include",
          })
            .then((res) => res.json())
            .then((statsData) => setStats(statsData))
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <OwnerLayout ownerName={ownerName}>
      <style>{`
        .dashboard-container {
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
        <h1>PG Owner Dashboard</h1>
        <div className="cards">
          <Link to="/pg_owner/manage-pg"  style={{ textDecoration: "none" }}>
            <div className="card">
              <div className="card-title">Total PGs</div>
              <div className="card-value">
                {stats ? stats.pgs : "Loading..."}
              </div>
            </div>
          </Link>
          <Link to="/pg_owner/bookings"  style={{ textDecoration: "none" }}>
            <div className="card">
              <div className="card-title">Total Bookings</div>
              <div className="card-value">
                {stats ? stats.bookings : "Loading..."}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </OwnerLayout>
  );
};

export default OwnerDashboard;
