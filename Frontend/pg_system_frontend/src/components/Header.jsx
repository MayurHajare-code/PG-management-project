import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../style/global.css";
import "../style/home.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/home", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout", {}, { withCredentials: true })
      .then(() => {
        alert("Logout successfully...");
        localStorage.removeItem("userEmail");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout failed", err);
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <nav>
        <Link to="/">
          <img src="img/logo.png" alt="logo" />
        </Link>
        <ul className="ul">
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="link" to="/pgs">
              PG
            </Link>
          </li>

          <li>
            <Link className="link" to="/contact">
              Contact
            </Link>
          </li>

          {!user ? (
            <>
              <li>
                <Link className="link" to="pg_owner/pg_owner_register">
                  Owner
                </Link>
              </li>
              <li>
                <Link className="link" to="/login">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li className="dropdown">
              <button onClick={toggleDropdown} className="dropbtn ">
                {user.name || "Account"} ▼
              </button>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <Link className="link" to="/profile">
                    Profile
                  </Link>
                  <Link className="link" to="/bookings">
                    Bookings
                  </Link>
                  <Link className="link" to="/change-password">
                    Change Password
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>

      <div className="sub-header"></div>
      <div className="sub-header-content">
        <h1>Lorem ipsum dolor sit amet.</h1>
      </div>
    </header>
  );
};

export default Header;
