import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../style/ProfilePage.css";

/*
    login page is common for all login (user, pg-owner, admin)
*/

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("username", form.email);
    params.append("password", form.password);

    try {
      // Step 1: Login
      await API.post("/login", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      // Step 2: Fetch role
      const res = await API.get("/home");
      const role = res.data.role;

      if (role === "ROLE_USER") {
        navigate("/");
      } else if (role === "ROLE_OWNER") {
        navigate("/pg_owner");
      } else {
        navigate("/unauthorized");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login_body">
      <form onSubmit={handleLogin} className="form-section">
        <h2>Login</h2>
        <input
          className="input"
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="btn">
          Login
        </button>
        <p>
          Doesn't have an account at yet?{" "}
          {/* <a href="/register" class="register-link" id="register-link">
            Register here
          </a> */}
           <Link to="/user_register" className="register-link" id="register-link">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
