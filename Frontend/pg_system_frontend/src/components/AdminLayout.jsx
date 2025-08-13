import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/OwnerLayout.css";

const AdminLayout = ({ children, ownerName }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/");
  };

  return (
    <div className="owner-layout">
      <aside className="sidebar">
        <h2>Admin</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>

            {/* <li><Link to="/pg_owner/add-pg">Add PG</Link></li>
            <li><Link to="/pg_owner/manage-pg">Manage PGs</Link></li>
            <li><Link to="/pg_owner/bookings">Total Bookings</Link></li> */}

            <li>
              <Link to="/admin/users">Users</Link>
            </li>
            <li>
              <Link to="/admin/owners">Owners</Link>
            </li>
            <li>
              <Link to="/admin/pgs">PGs</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="main">
        <header className="navbar">
          <span>Welcome to Admin Page</span>
          <button onClick={handleLogout}>Logout</button>
        </header>

        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
