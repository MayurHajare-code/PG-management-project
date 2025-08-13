import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

const PGPage = () => {
  const [pgs, setPgs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/pgs").then((res) => setPgs(res.data));
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h1 className="homePage-head">All Available PGs</h1>
        <div className="parent">
          {pgs.map((pg) => (
            <Link key={pg.id} to={`/pgs/${pg.id}`}>
              <div className="card">
                {/* haer images is static i will chage later .................................... */}
                <img src="/img/bg-img1.jpg" alt="PG" />    
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PGPage;
