import React from "react";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Document from "./components/Document";
import UploadDocument from "./components/UploadDocument";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuthInit } from "./hooks/useAuthInit";
import RippleGrid from "./components/RippleGrid"; // 👈 must be default import
import "./App.css";

function AppContent() {
  useAuthInit();

  return (
    <>
      {/* 🌌 GLOBAL WEBGL BACKGROUND */}
      <RippleGrid
        enableRainbow={true}
        gridColor="#ffffff"
        rippleIntensity={0.05}
        gridSize={10}
        gridThickness={15}
        mouseInteraction={true}
        mouseInteractionRadius={0.8}
        opacity={1.2}
      />

      {/* FOREGROUND UI */}
      <div className="relative z-20 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <Document />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadDocument />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
