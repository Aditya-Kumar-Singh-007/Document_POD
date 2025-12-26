import React, { useEffect, useState } from "react";
import { signUp } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError } from "../redux/auth";
import LoadingSpinner from "./LoadingSpinner";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    // Clear validation error when user starts typing
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!userInfo.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!userInfo.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!userInfo.password) {
      errors.password = "Password is required";
    } else if (userInfo.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (userInfo.password !== userInfo.reEnterPassword) {
      errors.reEnterPassword = "Passwords do not match";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const registerNewUser = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(
      signUp({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      })
    );
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
    return <LoadingSpinner message="Creating your account..." />;
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Create Account</h3>
      
      {error && (
        <div className="alert alert-danger">
          {error}
          {error.includes("already exists") && (
            <div className="mt-2">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          )}
        </div>
      )}

      <form onSubmit={registerNewUser}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            onChange={onChange}
            name="name"
            value={userInfo.name}
            autoComplete="name"
            className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
            id="name"
            placeholder="Enter your full name"
          />
          {validationErrors.name && (
            <div className="invalid-feedback">{validationErrors.name}</div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={onChange}
            className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
            id="email"
            autoComplete="email"
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
            name="password"
            value={userInfo.password}
            onChange={onChange}
            className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
            autoComplete="new-password"
            id="password"
            placeholder="Create a password"
          />
          {validationErrors.password && (
            <div className="invalid-feedback">{validationErrors.password}</div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="reEnterPassword" className="form-label">
            Confirm Password *
          </label>
          <input
            type="password"
            onChange={onChange}
            name="reEnterPassword"
            value={userInfo.reEnterPassword}
            autoComplete="new-password"
            className={`form-control ${validationErrors.reEnterPassword ? 'is-invalid' : ''}`}
            id="reEnterPassword"
            placeholder="Confirm your password"
          />
          {validationErrors.reEnterPassword && (
            <div className="invalid-feedback">{validationErrors.reEnterPassword}</div>
          )}
        </div>
        
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      
      <div className="text-center mt-3">
        <p className="text-muted">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
