import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { login } from "../redux/actions/authAction";
import { Link, useNavigate } from "react-router-dom";
import { clearError } from "../redux/auth";
import loginGif from "../image/Login.gif";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loginGif} alt="Logging in..." className="loading-gif" />
      </div>
    );
  }

  return (
    <div className="form-container">
      <h3 className="form-title auth-title">Welcome Back</h3>
      
      {error && (
        <div className="error-message">
          {error}
          {error.includes("not found") && (
            <div className="error-subtext">
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </div>
          )}
        </div>
      )}

      <form onSubmit={loginSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            autoComplete="username"
            className="form-input"
            onChange={onChange}
            name="email"
            value={credentials.email}
            id="email"
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
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="form-input password-input"
              id="password"
              onChange={onChange}
              name="password"
              value={credentials.password}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {validationErrors.password && (
            <div className="form-error">{validationErrors.password}</div>
          )}
        </div>
        
        <button
          type="submit"
          className="full-width"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
      <div className="center-text spacing-top">
        <p className="muted-text">
          Don't have an account? <Link to="/signup" className="auth-link">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;