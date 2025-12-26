import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/auth";
import { logoutUser } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { getTokenWithExpiry } from "../utils/tokenUtils";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  useEffect(() => {
    const token = getTokenWithExpiry();
    if (token) {
      dispatch(loginSuccess(token));
    }
  }, [dispatch]);
  
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          📁 Document Pod
        </Link>
        
        
        
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/documents">
                    My Documents
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/upload">
                    Upload
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          <div className="d-flex">
            {!isAuthenticated ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-light" to="/signup">
                  Sign Up
                </Link>
              </>
            ) : (
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
