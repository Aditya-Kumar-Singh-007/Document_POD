import React from 'react';

const DocumentSkeleton = () => {
  return (
    <div className="doc-card skeleton">
      <div className="doc-image-container skeleton-shimmer">
        <div className="skeleton-box" style={{width: '100%', height: '100%'}}></div>
      </div>
      <div className="doc-content">
        <div className="skeleton-box" style={{width: '80%', height: '20px', marginBottom: '1rem'}}></div>
        <div className="doc-actions">
          <div className="skeleton-box" style={{width: '70px', height: '36px'}}></div>
          <div className="skeleton-box" style={{width: '80px', height: '36px'}}></div>
        </div>
      </div>
      <div className="doc-footer">
        <div className="skeleton-box" style={{width: '50px', height: '16px'}}></div>
        <div className="skeleton-box" style={{width: '60px', height: '16px'}}></div>
        <div className="skeleton-box" style={{width: '70px', height: '16px'}}></div>
      </div>
    </div>
  );
};

const DocumentGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="documents-grid">
      {Array.from({ length: count }, (_, i) => (
        <DocumentSkeleton key={i} />
      ))}
    </div>
  );
};

export default DocumentGridSkeleton;