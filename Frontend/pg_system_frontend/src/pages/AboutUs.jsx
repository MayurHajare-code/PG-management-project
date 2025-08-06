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
          Welcome to our website! We are dedicated to providing the best service
          for your needs. Our mission is to deliver high-quality solutions and
          ensure customer satisfaction.
        </p>
        <p style={styles.text}>
          Our team consists of passionate developers, designers, and support
          staff working together to create amazing experiences for our users.
        </p>
        <p style={styles.text}>
          Thank you for visiting us. We hope to serve you soon!
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
