// PGManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import OwnerLayout from "../components/OwnerLayout";
import "../style/PGManagement.css";

const PGManagement = () => {
  const [ownerName, setOwnerName] = useState("");
  const [pgList, setPgList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPGs();
    fetchOwnerName();
  }, []);

  const fetchPGs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/owner/pgs", {
        withCredentials: true,
      });
      setPgList(res.data);
    } catch (err) {
      console.error("Failed to fetch PGs", err);
    }
  };

  const fetchOwnerName = async () => {
    try {
      const res = await fetch("http://localhost:8080/home", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.role === "ROLE_OWNER") {
        setOwnerName(data.email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletePG = async (pgId) => {
    try {
      await axios.delete(`http://localhost:8080/owner/pgs/delete/${pgId}`, {
        withCredentials: true,
      });
      fetchPGs();
    } catch (err) {
      console.error("Failed to delete PG", err);
    }
  };

  const handleEdit = (pgId) => {
    navigate(`/pg_owner/pgs/edit/${pgId}`);
  };
  
  return (
  <OwnerLayout ownerName={ownerName}>
    {/* Internal CSS */}
    <style>{`
      .pg-management-container {
        padding: 20px;
        font-family: Arial, sans-serif;
      }

      .pg-management-container h2 {
        font-size: 26px;
        margin-bottom: 20px;
        color: #333;
      }

      .pg-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .pg-item {
        background: #fafafa;
        border: 1px solid #ccc;
        padding: 12px;
        margin-bottom: 12px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .pg-item strong {
        color: #222;
      }

      .pg-actions button {
        margin-left: 8px;
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
      }

      .pg-actions button:first-child {
        background-color: #4CAF50;
        color: white;
      }

      .pg-actions button:first-child:hover {
        background-color: #45a049;
      }

      .pg-actions button:last-child {
        background-color: #f44336;
        color: white;
      }

      .pg-actions button:last-child:hover {
        background-color: #d32f2f;
      }

      .add-pg-back-link {
        display: inline-block;
        margin-top: 15px;
        color: #007bff;
        text-decoration: none;
        font-size: 14px;
      }

      .add-pg-back-link:hover {
        text-decoration: underline;
      }
    `}</style>

    <div className="pg-management-container">
      <h2>Your PG Listings</h2>
      <ul className="pg-list">
        {pgList.map((pg) => (
          <li key={pg.id} className="pg-item">
            <span>
              <strong>{pg.name}</strong> - {pg.location} - ₹{pg.rent}
            </span>
            <div className="pg-actions">
              <button onClick={() => handleEdit(pg.id)}>Edit</button>
              <button onClick={() => deletePG(pg.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/pg_owner" className="add-pg-back-link">Back to Dashboard</Link>
    </div>
  </OwnerLayout>
);


};

export default PGManagement;
