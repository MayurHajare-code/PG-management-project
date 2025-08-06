// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import Unauthorized from "./pages/Unauthorized";
import UserRegister from "./pages/UserRegister";
import PGOwnerRegister from "./pages/PGOwnerRegister";
import AddPG from "./pages/AddPG";
import PGManagement from "./pages/PGManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdatePG from "./pages/UpdatePG";
import HomePage from "./pages/homePage";
import PGDetailsById from "./pages/PGDetailsById";
import ProfilePage from "./pages/ProfilePage";
import BookingsPage from "./pages/BookingsPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import OwnerBookings from "./pages/OwnerBookings";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PGPage from "./pages/PGPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* no need to authorize */}
        <Route path="/" element={<HomePage />} />
        {/* no need to authorize */}
        <Route path="/pgs/:id" element={<PGDetailsById />} />
        {/*  need to authorize */}
        <Route path="/login" element={<Login />} />
        {/*  need to authorize */}
        <Route path="/user_register" element={<UserRegister />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/pgs" element={<PGPage />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} /> */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <BookingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <ChangePasswordPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="pg_owner/pg_owner_register"
          element={<PGOwnerRegister />}
        />

        {/* Protected Routes for PG Owner */}
        <Route
          path="/pg_owner"
          element={
            <ProtectedRoute allowedRoles={["ROLE_OWNER"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pg_owner/add-pg"
          element={
            <ProtectedRoute allowedRoles={["ROLE_OWNER"]}>
              <AddPG />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pg_owner/manage-pg"
          element={
            <ProtectedRoute allowedRoles={["ROLE_OWNER"]}>
              <PGManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pg_owner/pgs/edit/:pgId"
          element={
            <ProtectedRoute allowedRoles={["ROLE_OWNER"]}>
              <UpdatePG />
            </ProtectedRoute>
          }
        />

         <Route
          path="/pg_owner/bookings"
          element={
            <ProtectedRoute allowedRoles={["ROLE_OWNER"]}>
              <OwnerBookings />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;

{
  /* <Route
  path="/user"
  element={
    <ProtectedRoute allowedRoles={["ROLE_USER"]}>
      <UserDashboard />
    </ProtectedRoute>
  }
/> */
}
