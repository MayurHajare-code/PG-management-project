import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const PGDetailsPage = () => {
  const { id } = useParams();
  const [pgData, setPgData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/pgs/${id}`, { withCredentials: true })
      .then((res) => setPgData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!pgData) return <p style={{ marginLeft: "0px", padding: "20px" }}>Loading...</p>;

  return (
    <AdminLayout>
      {/* Internal CSS */}
      <style>{`
        .pg-container {
          margin-left: 0px;
          padding: 20px;
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
          {/* <div className="info-row"><span className="label">ID:</span> <span className="value">{pgData.pgId}</span></div> */}
          <div className="info-row"><span className="label">Name:</span> <span className="value">{pgData.name}</span></div>
          <div className="info-row"><span className="label">Location:</span> <span className="value">{pgData.location}</span></div>
          <div className="info-row"><span className="label">Rent:</span> <span className="value">₹{pgData.rent}</span></div>
          {/* <div className="info-row"><span className="label">Address:</span> <span className="value">{pgData.address}</span></div> */}
        </div>

        <div className="section">
          <h2>Owner Info</h2>
          {/* <div className="info-row"><span className="label">ID:</span> <span className="value">{pgData.ownerId}</span></div> */}
          <div className="info-row"><span className="label">Name:</span> <span className="value">{pgData.ownerName}</span></div>
          <div className="info-row"><span className="label">Email:</span> <span className="value">{pgData.ownerEmail}</span></div>
          <div className="info-row"><span className="label">Phone:</span> <span className="value">{pgData.ownerPhone}</span></div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PGDetailsPage;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import AdminLayout from "../../components/AdminLayout";

// const PGDetailsPage = () => {
//   const { id } = useParams();
//   const [pgData, setPgData] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/admin/pgs/${id}`, { withCredentials: true })
//       .then((res) => setPgData(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!pgData) return <p>Loading...</p>;

//   return (
//     <AdminLayout>
//       <div style={{ marginLeft: "240px", padding: "20px" }}>
//         <h1>PG Details</h1>

//         <h2>PG Info</h2>
//         <p><strong>ID:</strong> {pgData.pgId}</p>
//         <p><strong>Name:</strong> {pgData.name}</p>
//         <p><strong>Location:</strong> {pgData.location}</p>
//         <p><strong>Rent:</strong> {pgData.rent}</p>
        

//         <h2>Owner Info</h2>
//         <p><strong>ID:</strong> {pgData.ownerId}</p>
//         <p><strong>Name:</strong> {pgData.ownerName}</p>
//         <p><strong>Email:</strong> {pgData.ownerEmail}</p>
//         <p><strong>Phone:</strong> {pgData.ownerPhone}</p>
//       </div>
//     </AdminLayout>
//   );
// };

// export default PGDetailsPage;
