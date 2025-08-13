import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <Header />
        <div style={styles.container}>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.text}>
          Welcome to our PG Accommodation System! We are committed to making the
          process of finding, booking, and managing Paying Guest accommodations
          simple, transparent, and efficient for both tenants and property owners.
        </p>
        <p style={styles.text}>
          Our platform connects users with verified PG properties across multiple
          cities. Tenants can search for accommodations based on location, rent,
          and facilities, while PG owners can easily list their properties,
          manage bookings, and track tenant history — all in one place.
        </p>
        <p style={styles.text}>
          We believe in providing a secure and user-friendly experience by using
          the latest technology. Our team of developers, designers, and support
          staff work tirelessly to ensure a seamless experience for every user.
        </p>
        <p style={styles.text}>
          Thank you for trusting us with your accommodation needs. Whether you’re
          looking for a comfortable place to stay or want to manage your PG
          efficiently, we are here to help you every step of the way.
        </p>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.1rem",
    color: "#555",
    lineHeight: "1.6",
  },
};

export default AboutUs;
