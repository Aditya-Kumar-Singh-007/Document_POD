import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDocument } from "../redux/actions/documentActions";
import deleteIcon from "../image/delete.png";

const DocumentItem = ({ document: doc, onDelete }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setIsDeleting(true);
      try {
        await dispatch(deleteDocument(doc._id));
        onDelete(doc._id); // Optimistic update
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  const handleView = () => {
    window.open(doc.fileUrl, "_blank");
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(doc.fileUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = url;

      const cleanFilename = doc.filename.replace(/"/g, "");

      const downloadName = doc.title
        ? `${doc.title}.${cleanFilename.split(".").pop()}`
        : cleanFilename;

      link.download = downloadName;
      window.document.body.appendChild(link);
      link.click();

      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const getFileIcon = (filename) => {
    const cleanFilename = filename?.replace(/"/g, "");
    const ext = cleanFilename?.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "txt":
        return "📃";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📁";
    }
  };


  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <div className={`doc-card ${isDeleting ? 'deleting' : ''}`}>
      <div className="doc-image-container">
        <div className="doc-image">
          <img 
            src={doc.fileUrl}
            alt={doc.filename}
            className="doc-preview-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="doc-icon" style={{display: 'none'}}>
            {getFileIcon(doc.filename)}
          </div>
        </div>
        <span className="doc-tag">{doc.category}</span>
      </div>

      <div className="doc-content">
        <h3
          className="doc-title"
          title={doc.title || doc.filename.replace(/"/g, "")}
        >
          {doc.title || doc.filename.replace(/"/g, "")}
        </h3>

        <div className="doc-actions">
          <button
            onClick={handleView}
            className="doc-btn doc-btn-view"
            title="Preview"
          >
            Preview
          </button>
          <button
            onClick={handleDownload}
            className="doc-btn doc-btn-download"
            title="Download"
          >
            Download
          </button>
        </div>
      </div>

      <div className="doc-footer">
        <span className="doc-size">{formatFileSize(doc.fileSize)}</span>
        <button
          onClick={handleDelete}
          className="doc-btn-delete-small"
          title="Delete"
        >
          <img src={deleteIcon} alt="Delete" className="delete-icon" />
        </button>
        <span className="doc-date">{formatDate(doc.createdAt)}</span>
      </div>
    </div>
  );
};

export default DocumentItem;
