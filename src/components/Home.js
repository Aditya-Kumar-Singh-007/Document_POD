import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="container" style={{paddingTop: '60px', paddingBottom: '60px'}}>
      <div className="text-center" style={{marginBottom: '60px'}}>
        <h1 className="text-title" style={{fontSize: '48px', marginBottom: '20px'}}>
          Document POD
        </h1>
        <p className="text-body" style={{fontSize: '20px', color: '#64748B', marginBottom: '40px'}}>
          Your secure, cloud-based document management solution
        </p>
        {!isAuthenticated ? (
          <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/signup')}
              style={{padding: '16px 32px', fontSize: '16px'}}
            >
              Get Started Free
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => navigate('/login')}
              style={{padding: '16px 32px', fontSize: '16px'}}
            >
              Login
            </button>
          </div>
        ) : (
          <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/documents')}
              style={{padding: '16px 32px', fontSize: '16px'}}
            >
              View Documents
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/upload')}
              style={{padding: '16px 32px', fontSize: '16px'}}
            >
              Upload Document
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-3" style={{marginTop: '80px'}}>
        <div className="card">
          <div className="card-body" style={{textAlign: 'center', padding: '40px 24px'}}>
            <div style={{fontSize: '48px', marginBottom: '20px'}}>📤</div>
            <h3 className="text-section" style={{marginBottom: '12px'}}>Easy Upload</h3>
            <p className="text-body">Upload documents in multiple formats with drag-and-drop simplicity</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body" style={{textAlign: 'center', padding: '40px 24px'}}>
            <div style={{fontSize: '48px', marginBottom: '20px'}}>🔒</div>
            <h3 className="text-section" style={{marginBottom: '12px'}}>Secure Storage</h3>
            <p className="text-body">Your documents are encrypted and stored securely in the cloud</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body" style={{textAlign: 'center', padding: '40px 24px'}}>
            <div style={{fontSize: '48px', marginBottom: '20px'}}>🔍</div>
            <h3 className="text-section" style={{marginBottom: '12px'}}>Smart Organization</h3>
            <p className="text-body">Find documents quickly with powerful search and categorization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;