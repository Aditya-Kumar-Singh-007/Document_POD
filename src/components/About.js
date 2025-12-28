import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-hero">
          <h1 className="about-title">
            📁 Document Pod
          </h1>
          <p className="about-subtitle">
            Your secure, cloud-based document management solution
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Document Pod?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📤</div>
              <h3>Easy Upload</h3>
              <p>Upload documents in multiple formats including PDF, DOC, images, and text files with drag-and-drop simplicity.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Storage</h3>
              <p>Your documents are encrypted and stored securely in the cloud with user authentication and access controls.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Organization</h3>
              <p>Organize documents by categories, search by filename or title, and filter to find what you need quickly.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>How It Works</h2>
          
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Sign Up</h3>
              <p>Create your free account to get started</p>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Upload</h3>
              <p>Upload your documents with titles and categories</p>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <h3>Organize</h3>
              <p>Categorize and manage your document library</p>
            </div>

            <div className="step-item">
              <div className="step-number">4</div>
              <h3>Access</h3>
              <p>View, download, and share your documents anytime</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <div className="formats-section">
            <h2>Supported File Formats</h2>
            <div className="formats-grid">
              <div className="format-item">
                <div className="format-icon">📄</div>
                <span>PDF</span>
              </div>
              <div className="format-item">
                <div className="format-icon">📝</div>
                <span>DOC/DOCX</span>
              </div>
              <div className="format-item">
                <div className="format-icon">📃</div>
                <span>TXT</span>
              </div>
              <div className="format-item">
                <div className="format-icon">🖼️</div>
                <span>JPG/PNG</span>
              </div>
              <div className="format-item">
                <div className="format-icon">📁</div>
                <span>And More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;