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
        <div className="parent">
          <div id="div1">
            <img src="/img/bg-img1.jpg" alt="PG" />
            <h3>{pg.name}</h3>
          </div>

          <div id="div2">
            <table>
              <tbody>
                <tr><td className="property-name">State</td><td>{pg.state}</td></tr>
                <tr><td className="property-name">City</td><td>{pg.city}</td></tr>
                <tr><td className="property-name">Rent per month</td><td>₹{pg.rent}</td></tr>
                <tr><td className="property-name">Number of rooms</td><td>{pg.totalRooms}</td></tr>
                <tr><td className="property-name">Address</td><td>{pg.address}</td></tr>
              </tbody>
            </table>
          </div>

          <div id="div3">
            <table>
              <thead><tr><td colSpan="2"><h3>Meals Offered by PG</h3></td></tr></thead>
              <tbody>
                <tr><td className="property-name">Breakfast</td><td>{pg.meals?.breakfast ? "Yes" : "No"}</td></tr>
                <tr><td className="property-name">Lunch</td><td>{pg.meals?.lunch ? "Yes" : "No"}</td></tr>
                <tr><td className="property-name">Dinner</td><td>{pg.meals?.dinner ? "Yes" : "No"}</td></tr>
              </tbody>
            </table>
          </div>

          <div id="div4">
            <table>
              <thead><tr><td colSpan="2"><h3>Facilities</h3></td></tr></thead>
              <tbody>
                {pg.facilities?.length > 0 ? (
                  pg.facilities.map((fac, index) => (
                    <tr key={index}>
                      <td className="property-name">{index + 1}</td>
                      <td>{fac}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="2">No facilities listed.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div>
            <button
              onClick={openModal}
              className="book-btn"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Book PG
            </button>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
            textAlign: "center"
          }}>
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
            <button onClick={handleSubmitBooking} style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px 20px",
              marginRight: "10px",
              border: "none",
              borderRadius: "5px",
            }}>
              Submit
            </button>
            <button onClick={closeModal} style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
            }}>
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




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
//   import { useNavigate } from "react-router-dom"; // at top
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// import "../style/global.css";
// import "../style/pg-details.css";

// const PGDetailsById = () => {
//   const { id } = useParams();
//   const [pg, setPg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPG = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8080/pgs/${id}`);
//         setPg(res.data);
//       } catch (err) {
//         setError("PG not found or API error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchPG();
//   }, [id]);



//   const navigate = useNavigate(); // inside component

//   const handleBooking = async () => {
//     try {
//       // Send request using current session (cookies will be sent automatically)
//       const res = await axios.post(
//         `http://localhost:8080/user/book/${id}`, // Adjust endpoint to match yours
//         {},
//         { withCredentials: true } // REQUIRED for session cookies to be sent
//       );

//       alert("PG booked successfully!");
//     } catch (err) {
//       if (err.response?.status === 401 || err.response?.status === 403) {
//         alert("Please login to book this PG.");
//         navigate("/login"); // redirect to login page
//       } else {
//         console.error(err);
//         alert("Booking failed. Please try again.");
//       }
//     }
//   };

//   if (loading) return <p>Loading PG details...</p>;
//   if (error) return <p>{error}</p>;
//   if (!pg) return <p>No PG found.</p>;

//   return (
//     <>
//       <Header />
//       {/* <div className="sub-header-pg-detail"></div>
//       <h1 className="sub-header-pg-detail-head">Lorem ipsum dolor sit amet.</h1> */}

//       <main>
//         <div className="parent">
//           {/* Image & Name */}
//           <div id="div1">
//             <img src="/img/bg-img1.jpg" alt="PG" />
//             <h3>{pg.name}</h3>
//           </div>

//           {/* Basic PG Info */}
//           <div id="div2">
//             <table>
//               <tbody>
//                 <tr>
//                   <td className="property-name">State</td>
//                   <td>{pg.state}</td>
//                 </tr>
//                 <tr>
//                   <td className="property-name">City</td>
//                   <td>{pg.city}</td>
//                 </tr>
//                 <tr>
//                   <td className="property-name">Rent per month</td>
//                   <td>₹{pg.rent}</td>
//                 </tr>
//                 <tr>
//                   <td className="property-name">Number of rooms</td>
//                   <td>{pg.totalRooms}</td>
//                 </tr>
//                 <tr>
//                   <td className="property-name">Address</td>
//                   <td>{pg.address}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {/* Meals Offered */}
//           <div id="div3">
//             <table>
//               <thead>
//                 <tr>
//                   <td colSpan="2">
//                     <h3>Meals Offered by PG</h3>
//                   </td>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="property-name">Breakfast</td>
//                   <td>{pg.meals?.breakfast ? "Yes" : "No"}</td>
//                 </tr>
//                 <tr>
//                   <td className="property-name">Lunch</td>
//                   <td>{pg.meals?.lunch ? "Yes" : "No"}</td>
//                 </tr>
//                 <tr>
//                   <td className="property-name">Dinner</td>
//                   <td>{pg.meals?.dinner ? "Yes" : "No"}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {/* Facilities */}
//           <div id="div4">
//             <table>
//               <thead>
//                 <tr>
//                   <td colSpan="2">
//                     <h3>Facilities</h3>
//                   </td>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pg.facilities && pg.facilities.length > 0 ? (
//                   pg.facilities.map((fac, index) => (
//                     <tr key={index}>
//                       <td className="property-name">{index + 1}</td>
//                       <td>{fac}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="2">No facilities listed.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Book PG Button */}
//           <div >
//             <button
//               onClick={handleBooking}
//               className="book-btn"
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 fontSize: "16px",
//               }}
//             >
//               Book PG
//             </button>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default PGDetailsById;

// /* i want add book pg button but, it work only authorized userand save dat in database other wise move on login page


// */
