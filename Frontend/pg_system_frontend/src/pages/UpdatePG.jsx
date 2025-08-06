import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import OwnerLayout from "../components/OwnerLayout";
import "../style/UpdatePG.css";

const UpdatePG = () => {
  const { pgId } = useParams();
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = useState("");
  const [pg, setPg] = useState({ name: "", location: "", rent: "" });

  useEffect(() => {
    fetchPG();
    fetchOwnerName();
  }, []);

  const fetchPG = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/owner/pgs/${pgId}`, {
        withCredentials: true,
      });

      console.log("PG ID:", pgId);
      console.log("Response:", res.data);

      setPg(res.data); // Make sure it's a PG object like {name, location, rent}
    } catch (err) {
      console.error("Failed to load PG", err);
      if (err.response?.status === 404) {
        alert("PG not found. Please check the ID.");
      }
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

  const handleChange = (e) => {
    setPg({ ...pg, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/owner/pgs/update/${pgId}`, pg, {
        withCredentials: true,
      });
      navigate("/pg_owner/manage-pg");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <OwnerLayout ownerName={ownerName}>
      <div className="update-pg-container">
        <h2>Update PG</h2>

        {pg.name ? (
          <form onSubmit={handleSubmit} className="update-pg-form">
            <label>Name:</label>
            <input
              name="name"
              value={pg.name}
              onChange={handleChange}
              required
            />

            <label>Location:</label>
            <input
              name="location"
              value={pg.location}
              onChange={handleChange}
              required
            />

            <label>Rent:</label>
            <input
              name="rent"
              type="number"
              value={pg.rent}
              onChange={handleChange}
              required
            />

            <button type="submit">Update</button>
            <Link to="/pg_owner/manage-pg" className="add-pg-back-link">
              Back
            </Link>
          </form>
        ) : (
          <p>Loading PG details...</p>
        )}
      </div>
    </OwnerLayout>
  );
};

export default UpdatePG;
