import React from 'react';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Developer</h1>
        <p>Get in touch with me for support, inquiries, or collaboration opportunities.</p>
        
        <div className="contact-info">
          <div className="contact-item">
            <h3>👤 Aditya Kumar Singh</h3>
            <p>Full Stack Developer</p>
          </div>
          
          <div className="contact-item">
            <h3>📍 Location</h3>
            <p>Prayagraj, Uttar Pradesh, India</p>
          </div>
          
          <div className="contact-item">
            <h3>📧 Email</h3>
            <p><a href="mailto:2604aditya@gmail.com">2604aditya@gmail.com</a></p>
          </div>
          
          <div className="contact-item">
            <h3>📞 Phone</h3>
            <p><a href="tel:+919696833917">+91 9696833917</a></p>
          </div>
        </div>
        
        <div className="social-links">
          <h2>Connect with me</h2>
          <div className="links-grid">
            <a href="https://www.linkedin.com/in/aditya-kumar-singh2604" target="_blank" rel="noopener noreferrer" className="social-link">
              <span>🔗</span>
              LinkedIn Profile
            </a>
            
            <a href="https://github.com/Aditya-Kumar-Singh-007" target="_blank" rel="noopener noreferrer" className="social-link">
              <span>🔗</span>
              GitHub Profile
            </a>
            
            <a href="https://iamadityakumarsingh.netlify.app/" target="_blank" rel="noopener noreferrer" className="social-link">
              <span>🔗</span>
              Portfolio Website
            </a>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>Send me a message</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-input" placeholder="Your name" />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-input" placeholder="Your email" />
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea className="form-input" rows="5" placeholder="Your message"></textarea>
            </div>
            
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;