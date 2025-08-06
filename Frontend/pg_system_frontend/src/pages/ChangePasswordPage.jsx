import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import "../style/ChangePasswordPage.css"; // update
import "../style/ProfilePage.css";

const ChangePasswordPage = () => {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = () => {
    axios.post("http://localhost:8080/user/change-password", 
      { oldPassword: oldPwd, newPassword: newPwd },
      { withCredentials: true }
    )
    .then(() => setMsg("Password updated successfully"))
    .catch(() => setMsg("Failed to update password"));
  };

  return (
    <div>
      <Header />
      <div className="change-password-container">
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPwd}
          onChange={(e) => setOldPwd(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
        />
        <button onClick={handleChange}>Change</button>
        <p>{msg}</p>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePasswordPage;



// import React, { useState } from "react";
// import axios from "axios";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import "../style/ProfilePage.css";

// const ChangePasswordPage = () => {
//   const [oldPwd, setOldPwd] = useState("");
//   const [newPwd, setNewPwd] = useState("");
//   const [msg, setMsg] = useState("");

//   const handleChange = () => {
//     axios.post("http://localhost:8080/user/change-password", 
//       { oldPassword: oldPwd, newPassword: newPwd },
//       { withCredentials: true }
//     )
//     .then(() => setMsg("Password updated successfully"))
//     .catch(() => setMsg("Failed to update password"));
//   };

//   return (
//     <div>
//       <Header />
//       <h2>Change Password</h2>
//       <input type="password" placeholder="Old Password" value={oldPwd} onChange={e => setOldPwd(e.target.value)} />
//       <input type="password" placeholder="New Password" value={newPwd} onChange={e => setNewPwd(e.target.value)} />
//       <button onClick={handleChange}>Change</button>
//       <p>{msg}</p>
//       <Footer/>
//     </div>
//   );
// };

// export default ChangePasswordPage;
