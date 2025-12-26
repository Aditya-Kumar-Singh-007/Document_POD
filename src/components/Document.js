import React, { useEffect, useState } from "react";
import DocumentItem from "./DocumentItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocument } from "../redux/actions/documentActions";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";

const Document = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { list, loading, error } = useSelector((state) => state.documents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchDocument());
    }
  }, [dispatch, isAuthenticated]);

  const filteredDocuments = list.filter(doc => {
    const matchesSearch = doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.filename?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAuthenticated) {
    return (
      <div className="container mt-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-muted">📁 Document Pod</h3>
                <p className="card-text">Please login to access your documents</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/login')}
                >
                  Login Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner message="Loading your documents..." />;
  }

  if (error) {
    return (
      <ErrorAlert 
        error={error} 
        onRetry={() => dispatch(fetchDocument())}
        retryText="Reload Documents"
      />
    );
  }

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="display-6 text-primary">
            📁 Your Documents
            <span className="badge bg-secondary ms-3">{list.length}</span>
          </h1>
          <p className="text-muted">Manage and organize your uploaded documents</p>
        </div>
        <div className="col-md-4 text-end">
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/upload')}
          >
            ➕ Upload Document
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              🔍
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="education">Education</option>
            <option value="finance">Finance</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="documents">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              📂
            </div>
            {list.length === 0 ? (
              <>
                <h3 className="text-muted">No documents uploaded yet</h3>
                <p className="text-muted">Start by uploading your first document</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/upload')}
                >
                  Upload Your First Document
                </button>
              </>
            ) : (
              <>
                <h3 className="text-muted">No documents match your search</h3>
                <p className="text-muted">Try adjusting your search terms or filters</p>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('');
                  }}
                >
                  Clear Filters
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="row">
            {filteredDocuments.map((doc) => (
              <DocumentItem key={doc._id} document={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;
