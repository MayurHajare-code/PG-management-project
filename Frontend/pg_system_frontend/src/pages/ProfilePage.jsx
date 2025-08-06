import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    date: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/home", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setForm({
          email: res.data.email,
          name: res.data.name,
          phone: res.data.phone,
          date: res.data.date,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    const updateData = {
      name: form.name,
      phone: form.phone,
    };

    axios
      .put("http://localhost:8080/update-profile", updateData, {
        withCredentials: true,
      })
      .then(() => {
        alert("Profile updated successfully");
      })
      .catch((err) => console.error(err));
  };

  return user ? (
    <div>
      <Header />
      
      <form>
        <h2>Profile</h2>
        <label>Email:</label>
        <input type="text" name="email" value={form.email} readOnly />
        <br />

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <br />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <br />

        <label>Registered Date:</label>
        <input type="text" name="date" value={form.date} readOnly />
        <br />
        <br />

        <button className="btn" onClick={handleUpdate}>Update Profile</button>
      </form>
      <Footer />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ProfilePage;
