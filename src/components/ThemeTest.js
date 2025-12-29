import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeTest = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px',
      border: '2px solid',
      borderColor: isDark ? '#374151' : '#e0e0e0',
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#e5e7eb' : '#1a1a1a',
      borderRadius: '8px'
    }}>
      <h3>Theme Test Component</h3>
      <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
      <p>Body classes: {document.body.className}</p>
      <button 
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          backgroundColor: isDark ? '#374151' : '#f0f0f0',
          color: isDark ? '#e5e7eb' : '#1a1a1a',
          border: '1px solid',
          borderColor: isDark ? '#4b5563' : '#d0d0d0',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Toggle Theme (Test)
      </button>
    </div>
  );
};

export default ThemeTest;