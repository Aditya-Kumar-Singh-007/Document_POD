import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadDocument } from '../redux/actions/documentActions';
import { resetUpload } from '../redux/upload';

const UploadDocument = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {loading,error,success}=useSelector((state)=>state.upload);
  const token = useSelector((state) => state.auth.token);

  const [file,setFile]=useState(null);
  const [title,setTitle]=useState('');
  const [category,setCategory]=useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;
    
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Invalid file type. Please upload PDF, DOC, DOCX, TXT, or image files.');
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File too large. Please upload files smaller than 5MB.');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(!file){
      alert("Please select a file");
      return;
    }
    
    if(!category){
      alert("Please select a category");
      return;
    }
    
    if(!token){
      alert("Please login first");
      return;
    }
    
    const formData=new FormData();
    formData.append('file',file);
    formData.append('title', title);
    formData.append('category', category);

    dispatch(uploadDocument(formData));
  };

  useEffect(()=>{
    if(success){
      dispatch(resetUpload());
      navigate('/documents');
    }
  },[success,dispatch,navigate]);

  useEffect(()=>{
    return()=>{
      dispatch(resetUpload());
    }
  },[dispatch]);
    
  return (
    <div className="form-container">
      <h2 className="form-title">Upload Document</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {success && (
        <div className="success-message">
          Document uploaded successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select File</label>
          <input
            type="file"
            className="form-input"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
          <div className="muted-text small-text">
            Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 5MB)
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Title (optional)</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter document title"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="other">Other</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="education">Education</option>
            <option value="finance">Finance</option>
          </select>
        </div>

        <button
          type="submit"
          className="full-width"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Document"}
        </button>
      </form>
    </div>
  );
};

export default UploadDocument;
