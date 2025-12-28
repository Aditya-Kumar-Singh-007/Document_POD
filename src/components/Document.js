import React, { useEffect, useState, useCallback, useMemo } from "react";
import DocumentItem from "./DocumentItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocument } from "../redux/actions/documentActions";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import documentFetchGif from "../image/documentFetch.gif";
import uploadIcon from "../image/upload.png";

const Document = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { list, loading, error } = useSelector((state) => state.documents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [localDocuments, setLocalDocuments] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchDocument());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    setLocalDocuments(list);
  }, [list]);

  const handleDocumentDelete = useCallback((docId) => {
    setLocalDocuments(prev => prev.filter(doc => doc._id !== docId));
  }, []);

  const filteredDocuments = useMemo(() => {
    return localDocuments.filter(doc => {
      const matchesSearch = doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.filename?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filterCategory || doc.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [localDocuments, searchTerm, filterCategory]);

  if (!isAuthenticated) {
    return (
      <div className="container text-center">
        <div className="form-container">
          <h3> Document Pod</h3>
          <p>Please login to access your documents</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Login Now
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <img src={documentFetchGif} alt="Loading documents..." className="loading-gif" />
      </div>
    );
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
    <div className="documents-page">
      <div className="documents-header">
        <div className="header-left">
          <h1 className="documents-title">
            Your Documents
            <span className="documents-count">{list.length}</span>
          </h1>
        </div>
        <div className="header-right">
          <div className="search-input">
            <input
              type="text"
              className="form-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-select">
            <select
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button className="submit-button" onClick={() => navigate('/upload')}>
            <img src={uploadIcon} alt="Upload" className="upload-icon" />
            Upload
          </button>
        </div>
      </div>

      <div>
        {filteredDocuments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"></div>
            {list.length === 0 ? (
              <>
                <h3 className="empty-title">No documents uploaded yet</h3>
                <p className="empty-text">Start by uploading your first document</p>
                <button className="submit-button" onClick={() => navigate('/upload')}>
                  <img src={uploadIcon} alt="Upload" className="upload-icon" />
                  Upload Your First Document
                </button>
              </>
            ) : (
              <>
                <h3 className="empty-title">No documents match your search</h3>
                <p className="empty-text">Try adjusting your search terms or filters</p>
                <button 
                  className="submit-button"
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
          <div className="documents-grid">
            {filteredDocuments.map((doc) => (
              <DocumentItem 
                key={doc._id} 
                document={doc} 
                onDelete={handleDocumentDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;
