import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import OwnerLayout from "../components/OwnerLayout";
// import "../style/AddPG.css";
import "../style/UpdatePG.css";

const AddPG = () => {
  const [ownerName, setOwnerName] = useState("");

  const navigate = useNavigate();
  const [pgData, setPgData] = useState({
    name: "",
    location: "",
    rent: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPgData({
      ...pgData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/owner/pgs/add",
        pgData,
        {
          withCredentials: true, // important for session cookies
        }
      );

      setMessage("PG added successfully!");
      setError("");
      setPgData({ name: "", location: "", rent: "" });
    } catch (err) {
      setMessage("");
      if (err.response && err.response.status === 403) {
        setError("Unauthorized: Only PG Owners can add PGs.");
        navigate("/unauthorized");
      } else {
        setError("Error adding PG.");
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/home", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "ROLE_OWNER") {
          setOwnerName(data.email); // extract email from "Welcome abc@gmail.com"
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  return (
    <OwnerLayout ownerName={ownerName}>
      <div className="container">
        <h2>Add PG Details</h2>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
      
            <label>PG Name:</label>
            <input
              type="text"
              name="name"
              value={pgData.name}
              onChange={handleChange}
              required
            />
        
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={pgData.location}
              onChange={handleChange}
              required
            />
         
            <label>Rent:</label>
            <input
              type="number"
              name="rent"
              value={pgData.rent}
              onChange={handleChange}
              required
            />
          

          {/* <div>
            <label>PG Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div> */}

          <button type="submit" className="add-pg-submit-btn">
            Add PG
          </button>

          <Link to="/pg_owner" className="add-pg-back-link">
            Back to Dashboard
          </Link>
        </form>
      </div>
    </OwnerLayout>
  );
};

export default AddPG;
