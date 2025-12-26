import React from "react";
import { useDispatch } from "react-redux";
import { deleteDocument } from "../redux/actions/documentActions";

const DocumentItem = ({document: doc}) => {
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this document?')) {
            dispatch(deleteDocument(doc._id));
        }
    };
    
    const handleView = () => {
        window.open(doc.fileUrl, '_blank');
    };
    
    const handleDownload = async () => {
        try {
            const response = await fetch(doc.fileUrl);
            const blob = await response.blob();
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = window.document.createElement('a');
            link.href = url;
            
            // Clean filename by removing quotes
            const cleanFilename = doc.filename.replace(/"/g, '');
            
            // Use title if available, otherwise use filename
            const downloadName = doc.title ? 
                `${doc.title}.${cleanFilename.split('.').pop()}` : 
                cleanFilename;
                
            link.download = downloadName;
            window.document.body.appendChild(link);
            link.click();
            
            // Cleanup
            window.document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        }
    };
    
    const getFileIcon = (filename) => {
        const cleanFilename = filename?.replace(/"/g, '');
        const ext = cleanFilename?.split('.').pop()?.toLowerCase();
        switch(ext) {
            case 'pdf': return '📄';
            case 'doc': case 'docx': return '📝';
            case 'txt': return '📃';
            case 'jpg': case 'jpeg': case 'png': return '🖼️';
            default: return '📁';
        }
    };
    
    const formatFileSize = (bytes) => {
        if (!bytes || bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid Date';
        }
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <span className="file-icon" style={{fontSize: '24px'}}>
                        {getFileIcon(doc.filename)}
                    </span>
                    <span className="badge bg-secondary text-capitalize">{doc.category}</span>
                </div>
                
                <div className="card-body d-flex flex-column">
                    <h6 className="card-title text-truncate" title={doc.title || doc.filename.replace(/"/g, '')}>
                        {doc.title || doc.filename.replace(/"/g, '')}
                    </h6>
                    
                    <p className="card-text text-muted small mb-2">
                        <strong>File:</strong> {doc.filename.replace(/"/g, '')}
                    </p>
                    
                    <p className="card-text text-muted small mb-2">
                        <strong>Size:</strong> {formatFileSize(doc.fileSize)}
                    </p>
                    
                    <p className="card-text text-muted small mb-3">
                        <strong>Uploaded:</strong> {formatDate(doc.createdAt)}
                    </p>
                    
                    <div className="mt-auto">
                        <div className="btn-group w-100" role="group">
                            <button 
                                className="btn btn-primary btn-sm"
                                onClick={handleView}
                                title="View Document"
                            >
                                👁️ View
                            </button>
                            
                            <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={handleDownload}
                                title="Download Document"
                            >
                                ⬇️ Download
                            </button>
                            
                            <button 
                                className="btn btn-outline-danger btn-sm"
                                onClick={handleDelete}
                                title="Delete Document"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentItem;