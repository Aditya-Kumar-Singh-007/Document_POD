import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocument } from '../redux/actions/documentActions';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import filesGif from '../image/file.gif';
import serverGif from '../image/server.gif';
import viewIcon from '../image/view.png';
import viewIconDark from '../image/view-dark.png';
import categoryIcon from '../image/category.png';
import categoryIconDark from '../image/category-dark.png';
import settingIcon from '../image/setting.png';
import settingIconDark from '../image/setting-dark.png';
import uploadIcon from '../image/upload.png';
import uploadIconDark from '../image/upload-dark.png';

const Dashboard = () => {
  const { list, loading } = useSelector(state => state.documents);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchDocument());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const totalDocuments = list.length;
  const recentDocuments = list.slice(0, 5);
  const categories = [...new Set(list.map(doc => doc.category))];
  const totalSize = list.reduce((acc, doc) => acc + (doc.fileSize || 0), 0);

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'Loading...'}!</h1>
        <p>Here's what's happening with your documents</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <img src={filesGif} alt="Files" className="stat-gif" />
          </div>
          <div className="stat-info">
            <h3>{totalDocuments}</h3>
            <p>Total Documents</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <img src={isDark ? categoryIconDark : categoryIcon} alt="Categories" className="dashboard-icon" />
          </div>
          <div className="stat-info">
            <h3>{categories.length}</h3>
            <p>Categories</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <img src={serverGif} alt="Storage" className="stat-gif" />
          </div>
          <div className="stat-info">
            <h3>{formatFileSize(totalSize)}</h3>
            <p>Total Storage</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <img src={isDark ? viewIconDark : viewIcon} alt="Recent" className="dashboard-icon" />
          </div>
          <div className="stat-info">
            <h3>{recentDocuments.length}</h3>
            <p>Recent Files</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-documents">
          <h2>Recent Documents</h2>
          {loading ? (
            <p>Loading...</p>
          ) : recentDocuments.length > 0 ? (
            <div className="recent-list">
              {recentDocuments.map(doc => (
                <div key={doc._id} className="recent-item">
                  <div className="recent-icon">
                    <img src={isDark ? viewIconDark : viewIcon} alt="Document" className="dashboard-icon" />
                  </div>
                  <div className="recent-info">
                    <h4>{doc.title || doc.filename}</h4>
                    <p>{doc.category} • {formatFileSize(doc.fileSize)}</p>
                  </div>
                  <div className="recent-date">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No documents yet. Start by uploading your first document!</p>
              <button className="submit-button" onClick={() => navigate('/upload')}>
                Upload Document
              </button>
            </div>
          )}
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => navigate('/upload')}>
              <img src={isDark ? uploadIconDark : uploadIcon} alt="Upload" className="dashboard-icon" />
              Upload Document
            </button>
            <button className="action-btn" onClick={() => navigate('/documents')}>
              <span>📋</span>
              View All Documents
            </button>
            <button className="action-btn" onClick={() => navigate('/profile')}>
              <img src={isDark ? settingIconDark : settingIcon} alt="Settings" className="dashboard-icon" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;