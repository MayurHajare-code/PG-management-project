import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../style/global.css";
import "../style/pg-details.css";

const PGDetailsById = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [checkinDate, setCheckinDate] = useState("");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/pgs/${id}`);
        setPg(res.data);
      } catch (err) {
        setError("PG not found or API error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPG();
  }, [id]);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setCheckinDate("");
    setComment("");
  };

  const handleSubmitBooking = async () => {
    if (!checkinDate) {
      alert("Please select a check-in date.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/user/book/${id}`,
        { checkinDate, comment },
        { withCredentials: true }
      );
      alert("PG booked successfully!");
      closeModal();
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Please login to book this PG.");
        navigate("/login");
      } else {
        console.error(err);
        alert("Booking failed. Please try again.");
      }
    }
  };

  if (loading) return <p>Loading PG details...</p>;
  if (error) return <p>{error}</p>;
  if (!pg) return <p>No PG found.</p>;

  return (
    <>
      <Header />
      <main>
        <style>{`
        .pg-container {
          margin-left: 0px;
          padding: 20px 10%;
          font-family: Arial, sans-serif;
        }
        .pg-title {
          font-size: 28px;
          margin-bottom: 20px;
          color: #333;
        }
        .section {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .section h2 {
          margin-bottom: 15px;
          font-size: 20px;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 5px;
          color: #444;
        }
        .info-row {
          margin: 8px 0;
        }
        .label {
          font-weight: bold;
          color: #555;
        }
        .value {
          margin-left: 10px;
          color: #222;
        }
        
      `}</style>

        <div className="pg-container">
          <h1 className="pg-title">PG Details</h1>

          <div className="section">
            <h2>PG Info</h2>
            <div className="info-row">
              <span className="label">Name:</span>{" "}
              <span className="value">{pg.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Location:</span>{" "}
              <span className="value">{pg.location}</span>
            </div>
            <div className="info-row">
              <span className="label">Rent:</span>{" "}
              <span className="value">₹{pg.rent}</span>
            </div>
          </div>

          <div className="section">
            <h2>Owner Info</h2>
            <div className="info-row">
              <span className="label">Name:</span>{" "}
              <span className="value">{pg.ownerName}</span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>{" "}
              <span className="value">{pg.ownerEmail}</span>
            </div>
            <div className="info-row">
              <span className="label">Phone:</span>{" "}
              <span className="value">{pg.ownerPhone}</span>
            </div>
          </div>

          <button onClick={openModal} className="button">
            Book PG
          </button>
        </div>

        {/* <div id="div1">
            <img src="/img/bg-img1.jpg" alt="PG" />
            <h3>{pg.name}</h3>
          </div>

          <div id="div2">
            <table>
              <tbody>
                <tr><td className="property-name">location</td><td>{pg.location}</td></tr>
                <tr><td className="property-name">Rent per month</td><td>₹{pg.rent}</td></tr>
              </tbody>
            </table>
          </div> */}

        <div></div>
      </main>

      {/* Booking Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h2>Select Check-in Date</h2>
            <input
              type="date"
              value={checkinDate}
              onChange={(e) => setCheckinDate(e.target.value)}
              style={{
                padding: "10px",
                marginTop: "15px",
                marginBottom: "20px",
                width: "300px",
              }}
            />
            <textarea
              placeholder="Add comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="5"
              style={{
                width: "350px",
                padding: "10px",
                marginBottom: "20px",
              }}
            ></textarea>
            <button
              onClick={handleSubmitBooking}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "10px 20px",
                marginRight: "10px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Submit
            </button>
            <button
              onClick={closeModal}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PGDetailsById;
