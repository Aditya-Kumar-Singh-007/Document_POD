import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 text-primary mb-3">
            📁 Document Pod
          </h1>
          <p className="lead text-muted">
            Your secure, cloud-based document management solution
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Why Choose Document Pod?</h2>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="fas fa-cloud-upload-alt fa-3x text-primary"></i>
              </div>
              <h5 className="card-title">Easy Upload</h5>
              <p className="card-text">
                Upload documents in multiple formats including PDF, DOC, images, and text files with drag-and-drop simplicity.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="fas fa-shield-alt fa-3x text-success"></i>
              </div>
              <h5 className="card-title">Secure Storage</h5>
              <p className="card-text">
                Your documents are encrypted and stored securely in the cloud with user authentication and access controls.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="fas fa-search fa-3x text-info"></i>
              </div>
              <h5 className="card-title">Smart Organization</h5>
              <p className="card-text">
                Organize documents by categories, search by filename or title, and filter to find what you need quickly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4">How It Works</h2>
        </div>
        
        <div className="col-md-3 text-center mb-4">
          <div className="mb-3">
            <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
              <span className="fw-bold">1</span>
            </div>
          </div>
          <h5>Sign Up</h5>
          <p className="text-muted">Create your free account to get started</p>
        </div>

        <div className="col-md-3 text-center mb-4">
          <div className="mb-3">
            <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
              <span className="fw-bold">2</span>
            </div>
          </div>
          <h5>Upload</h5>
          <p className="text-muted">Upload your documents with titles and categories</p>
        </div>

        <div className="col-md-3 text-center mb-4">
          <div className="mb-3">
            <div className="rounded-circle bg-info text-white d-inline-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
              <span className="fw-bold">3</span>
            </div>
          </div>
          <h5>Organize</h5>
          <p className="text-muted">Categorize and manage your document library</p>
        </div>

        <div className="col-md-3 text-center mb-4">
          <div className="mb-3">
            <div className="rounded-circle bg-warning text-white d-inline-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
              <span className="fw-bold">4</span>
            </div>
          </div>
          <h5>Access</h5>
          <p className="text-muted">View, download, and share your documents anytime</p>
        </div>
      </div>

      {/* Supported Formats Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body">
              <h3 className="text-center mb-4">Supported File Formats</h3>
              <div className="row text-center">
                <div className="col-md-2 col-4 mb-3">
                  <div className="mb-2">
                    <i className="fas fa-file-pdf fa-2x text-danger"></i>
                  </div>
                  <small className="text-muted">PDF</small>
                </div>
                <div className="col-md-2 col-4 mb-3">
                  <div className="mb-2">
                    <i className="fas fa-file-word fa-2x text-primary"></i>
                  </div>
                  <small className="text-muted">DOC/DOCX</small>
                </div>
                <div className="col-md-2 col-4 mb-3">
                  <div className="mb-2">
                    <i className="fas fa-file-alt fa-2x text-secondary"></i>
                  </div>
                  <small className="text-muted">TXT</small>
                </div>
                <div className="col-md-2 col-4 mb-3">
                  <div className="mb-2">
                    <i className="fas fa-file-image fa-2x text-success"></i>
                  </div>
                  <small className="text-muted">JPG/PNG</small>
                </div>
                <div className="col-md-2 col-4 mb-3">
                  <div className="mb-2">
                    <i className="fas fa-file fa-2x text-info"></i>
                  </div>
                  <small className="text-muted">And More</small>
                </div>
                <div className="col-md-2 col-4 mb-3">
                  <div className="mb-2">
                    <span className="badge bg-primary">5MB</span>
                  </div>
                  <small className="text-muted">Max Size</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <div className="card bg-primary text-white">
            <div className="card-body py-5">
              <h3 className="card-title">Ready to Get Started?</h3>
              <p className="card-text mb-4">
                Join thousands of users who trust Document Pod for their document management needs.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <button className="btn btn-light btn-lg">
                  <i className="fas fa-user-plus"></i> Sign Up Free
                </button>
                <button className="btn btn-outline-light btn-lg">
                  <i className="fas fa-sign-in-alt"></i> Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="row">
        <div className="col-12 text-center text-muted">
          <hr />
          <p className="mb-4">
            <small>
              Document Pod - Secure, Simple, Smart Document Management
              <br />
              Built with React & Node.js | Hosted on secure cloud infrastructure
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;