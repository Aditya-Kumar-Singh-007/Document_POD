import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  // Initialize theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const initialTheme = saved ? saved === 'dark' : false;
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(initialTheme ? 'dark-theme' : 'light-theme');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    // Remove any existing theme classes first
    document.body.classList.remove('light-theme', 'dark-theme');
    // Add the current theme class
    document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;