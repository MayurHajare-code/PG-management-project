import React, { useEffect, useState } from "react";
import OwnerLayout from "../components/OwnerLayout";

const OwnerDashboard = () => {
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/home", {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "ROLE_OWNER") {
          setOwnerName(data.email); // extract email from "Welcome abc@gmail.com"
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <OwnerLayout ownerName={ownerName}>
      <h1>Dashboard</h1>
      <p>This is the PG Owner dashboard.</p>
    </OwnerLayout>
  );
};

export default OwnerDashboard;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const OwnerDashboard = () => {
//   const [owner, setOwner] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/home", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setOwner(res.data);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch owner info:", err);
//         navigate("/unauthorized"); // Redirect to unauthorized if not logged in or invalid
//       });
//   }, []);

//   const handleLogout = () => {
//     axios
//       .post(
//         "http://localhost:8080/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       )
//       .then(() => {
//         navigate("/"); // Redirect to login page
//       })
//       .catch((err) => {
//         console.error("Logout failed:", err);
//       });
//   };

//   if (!owner) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Welcome PG Owner</h2>
//       <p>
//         <strong>Email:</strong> {owner.email}
//       </p>
//       <p>
//         <strong>Role:</strong> {owner.role}
//       </p>

//       <ul>
//         <li>
          
//           <Link to="/owner/add-pg" >
//             add pg
//           </Link>
//         </li>
//         <li>
//           <Link to="/owner/manage-pg" >
//             manage pg
//           </Link>
//         </li>
//       </ul>

//       <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default OwnerDashboard;
