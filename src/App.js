import React from 'react';
import Navbar from "./components/Navbar";
import { Provider } from "react-redux"; 
import { store } from "./redux/store";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Document from "./components/Document";
import UploadDocument from "./components/UploadDocument";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
