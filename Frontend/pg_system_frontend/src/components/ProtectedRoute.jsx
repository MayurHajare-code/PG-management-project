


import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [auth, setAuth] = useState({ loading: true, authorized: false });

  useEffect(() => {
    axios.get("http://localhost:8080/home", { withCredentials: true })
      .then((res) => {
        const userRole = res.data.role;
        if (allowedRoles.includes(userRole)) {
          setAuth({ loading: false, authorized: true });
        } else {
          setAuth({ loading: false, authorized: false });
        }
      })
      .catch(() => {
        setAuth({ loading: false, authorized: false });
      });
  }, []);

  if (auth.loading) return <p>Checking authorization...</p>;
  if (!auth.authorized) return <Navigate to="/unauthorized" />;
  return children;
};

export default ProtectedRoute;



