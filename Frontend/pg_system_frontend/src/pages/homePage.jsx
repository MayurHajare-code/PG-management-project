import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  const [pgs, setPgs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/pgs").then((res) => setPgs(res.data));
  }, []);

  return (
    <div>
      <Header />
      <main>
        {/* <h1 className="homePage-head">Available PGs</h1>
        <div className="parent">
          {pgs.map((pg) => (
            <Link key={pg.id} to={`/pgs/${pg.id}`} className="a">
              <div className="card">
                {/* haer images is static i will chage later .................................... *
                {/* <img src="/img/bg-img1.jpg" alt="PG" />     
                <div className="card-data">
                  <h3>PG Name: {pg.name}</h3>
                  <p>
                    <span className="card-categary">{pg.type}</span> PG in{" "}
                    {pg.location}
                  </p>
                  <p>
                    Start at{" "}
                    <span className="card-price">&#8377; {pg.rent}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div> */}

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
          text-transform: capitalize;
        }
        .value {
          margin-left: 10px;
          color: #222;
          text-transform: capitalize;
        }
        
      `}</style>

        <div className="pg-container">
          <h1 className="pg-title">Available PG's</h1>

          {pgs.map((pg) => (
            <Link key={pg.id} to={`/pgs/${pg.id}`} className="a">
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
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
