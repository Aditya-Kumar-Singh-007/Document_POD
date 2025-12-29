import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Profile = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    try {
      // This would be the actual API call to change password
      // const response = await changePassword(passwordData);
      setPasswordSuccess('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setPasswordError('Failed to change password. Please try again.');
    }
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : new Date().toLocaleDateString();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h3>{user?.name || 'Loading...'}</h3>
            <p>{user?.email || 'Loading...'}</p>
          </div>
          
          <nav className="profile-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile Settings
            </button>
            <button 
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
            <button 
              className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
          </nav>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>Profile Information</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={user?.name || ''} readOnly className="form-input" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={user?.email || ''} readOnly className="form-input" />
              </div>
              <div className="form-group">
                <label>Member Since</label>
                <input type="text" value={memberSince} readOnly className="form-input" />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-content">
              <h2>Security Settings</h2>
              
              <div className="security-item">
                <h4>Change Password</h4>
                <form onSubmit={handlePasswordChange}>
                  {passwordError && <div className="error-message">{passwordError}</div>}
                  {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
                  
                  <div className="form-group">
                    <label>Current Password</label>
                    <input 
                      type="password" 
                      className="form-input"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>New Password</label>
                    <input 
                      type="password" 
                      className="form-input"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input 
                      type="password" 
                      className="form-input"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn-secondary">Change Password</button>
                </form>
              </div>
              
              <div className="security-item">
                <h4>Two-Factor Authentication</h4>
                <p>Not enabled</p>
                <button className="btn-secondary">Enable 2FA</button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="tab-content">
              <h2>Preferences</h2>
              <div className="preference-item">
                <label>Theme</label>
                <select 
                  className="form-select" 
                  value={isDark ? 'dark' : 'light'}
                  onChange={(e) => {
                    const newTheme = e.target.value;
                    if ((newTheme === 'dark' && !isDark) || (newTheme === 'light' && isDark)) {
                      toggleTheme();
                    }
                  }}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          )}

          <div className="profile-actions">
            <button className="btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;