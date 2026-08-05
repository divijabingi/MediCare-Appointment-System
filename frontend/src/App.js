import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Navigation from "./components/Navigation";

import Home from "./pages/Home";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import BookAppointment from "./pages/appointment/BookAppointment";
import MyAppointments from "./pages/appointment/MyAppointments";

import ViewClient from "./pages/profile/ViewClient";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminAppointments from "./pages/admin/AdminAppointments";

const App = () => {

  return (

    <Router>

      <Navigation />

      <div
        style={{
          margin: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >

        <div style={{ width: 750 }}>

          <Routes>

            {/* Home */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* Appointment */}

            <Route
              path="/book_appointment"
              element={<BookAppointment />}
            />

            <Route
              path="/my_appointments"
              element={<MyAppointments />}
            />

            {/* Authentication */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* Profile */}

            <Route
              path="/view_client"
              element={<ViewClient />}
            />

            {/* Admin */}

            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            <Route
              path="/admin/doctors"
              element={<AdminDoctors />}
            />

            <Route
              path="/admin/appointments"
              element={<AdminAppointments />}
            />

            {/* Temporary Test Routes */}

            <Route
              path="/test"
              element={<h1>TEST PAGE</h1>}
            />

            <Route
              path="/hello"
              element={<h1>HELLO</h1>}
            />

          </Routes>

        </div>

      </div>

    </Router>

  );

}

export default App;