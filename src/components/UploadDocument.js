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
    
    // File type validation
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Invalid file type. Please upload PDF, DOC, DOCX, TXT, or image files.');
      return;
    }
    
    // File size validation (5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File too large. Please upload files smaller than 5MB.');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleSubmit=(e)=>{    e.preventDefault();

    // Debug logging
    console.log('File:', file);
    console.log('Title:', title);
    console.log('Category:', category);
    console.log('Token exists:', !!token);
    console.log('File type:', file?.type);
    console.log('File size:', file?.size);

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

    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

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
    <div className="container mt-5">
      <div className="form-card" style={{maxWidth: '600px', margin: '0 auto'}}>
        <h2 className="form-title">Upload Document</h2>
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
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
            <div className="text-small text-muted" style={{marginTop: '6px'}}>
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
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Uploading...
              </>
            ) : (
              "Upload Document"
            )}
          </button>
        </form>
      </div>
    </div>
  );
    };


export default UploadDocument
