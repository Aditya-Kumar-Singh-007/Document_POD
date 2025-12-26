import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { login } from "../redux/actions/authAction";
import { Link, useNavigate } from "react-router-dom";
import { clearError } from "../redux/auth";
import LoadingSpinner from "./LoadingSpinner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // Clear validation error when user starts typing
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!credentials.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!credentials.password) {
      errors.password = "Password is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(login(credentials));
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/documents");
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    // Clear errors when component unmounts
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner message="Logging you in..." />;
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Welcome Back</h3>
      
      {error && (
        <div className="alert alert-danger">
          {error}
          {error.includes("not found") && (
            <div className="mt-2">
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </div>
          )}
        </div>
      )}

      <form className="login-form" onSubmit={loginSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            autoComplete="username"
            className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
            onChange={onChange}
            name="email"
            value={credentials.email}
            id="email"
            placeholder="Enter your email"
          />
          {validationErrors.email && (
            <div className="invalid-feedback">{validationErrors.email}</div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password *
          </label>
          <input
            type="password"
            autoComplete="current-password"
            className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
            id="password"
            onChange={onChange}
            name="password"
            value={credentials.password}
            placeholder="Enter your password"
          />
          {validationErrors.password && (
            <div className="invalid-feedback">{validationErrors.password}</div>
          )}
        </div>
        
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
      <div className="text-center mt-3">
        <p className="text-muted">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;