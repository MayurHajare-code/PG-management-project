import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/OwnerLayout.css";

const OwnerLayout = ({ children, ownerName }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include"
    });
    navigate("/");
  };

  return (
    <div className="owner-layout">
      <aside className="sidebar">
        <h2>PG Owner</h2>
        <nav>
          <ul>
            <li><Link to="/pg_owner">Dashboard</Link></li>
            
            <li><Link to="/pg_owner/add-pg">Add PG</Link></li>
            <li><Link to="/pg_owner/manage-pg">Manage PGs</Link></li>
            <li><Link to="/pg_owner/bookings">Total Bookings</Link></li>

          </ul>
        </nav>
      </aside>

      <div className="main">
        <header className="navbar">
          <span>Welcome, {ownerName}</span>
          <button onClick={handleLogout}>Logout</button>
        </header>

        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default OwnerLayout;


// i want add total booking option in side bar  also i wnat logic for this also pg owner change the booking status 