import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
//  import "../style/loginCss.css";
// import "../App.css";
import "../style/UpdatePG.css";

const UserRegister = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    role: "ROLE_USER",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Registered");
      navigate("/login");
    } catch {
      alert("Failed");
    }
  };

  return (
    <div className="user_body">
      <div className="container" style={{marginTop:"100px"}}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="form-section">
          <input
            className="input"
            type="text"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="input"
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className="input"
            type="text"
            placeholder="Phone"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit" className="btn">
            Register
          </button>
          <p>
            have an account at yet?{" "}
            <Link to="/login" className="register-link" id="register-link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
