import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
// import "../style/loginCss.css";
import "../style/UpdatePG.css";

const PGOwnerRegister = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "ROLE_OWNER",
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
    <div className="pg_owner_body">
      <div className="container">
        <h2>PG Owner Registeration</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" >
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

export default PGOwnerRegister;
