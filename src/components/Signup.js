import React, { useEffect, useState } from "react";
import { signUp } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError } from "../redux/auth";
import loginGif from "../image/Login.gif";

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
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loginGif} alt="Creating account..." className="loading-gif" />
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title auth-title">Create Account</h3>
      
      {error && (
        <div className="error-message">
          {error}
          {error.includes("already exists") && (
            <div className="error-subtext">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          )}
        </div>
      )}

      <form onSubmit={registerNewUser}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            onChange={onChange}
            name="name"
            value={userInfo.name}
            autoComplete="name"
            className="form-input"
            id="name"
            placeholder="Enter your full name"
          />
          {validationErrors.name && (
            <div className="form-error">{validationErrors.name}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={onChange}
            className="form-input"
            id="email"
            autoComplete="email"
            placeholder="Enter your email"
          />
          {validationErrors.email && (
            <div className="form-error">{validationErrors.email}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={onChange}
            className="form-input"
            autoComplete="new-password"
            id="password"
            placeholder="Create a password"
          />
          {validationErrors.password && (
            <div className="form-error">{validationErrors.password}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="reEnterPassword" className="form-label">
            Confirm Password *
          </label>
          <input
            type="password"
            onChange={onChange}
            name="reEnterPassword"
            value={userInfo.reEnterPassword}
            autoComplete="new-password"
            className="form-input"
            id="reEnterPassword"
            placeholder="Confirm your password"
          />
          {validationErrors.reEnterPassword && (
            <div className="form-error">{validationErrors.reEnterPassword}</div>
          )}
        </div>
        
        <button
          type="submit"
          className="submit-button full-width"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      
      <div className="center-text spacing-top">
        <p className="muted-text">
          Already have an account? <Link to="/login" className="auth-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
