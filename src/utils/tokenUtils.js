// Token utility functions - Session-based (no persistence)
export const setTokenWithExpiry = (token, expiryHours = 24) => {
  // Use sessionStorage instead of localStorage
  sessionStorage.setItem('token', token);
};

export const getTokenWithExpiry = () => {
  // Get token from sessionStorage (clears when browser closes)
  return sessionStorage.getItem('token');
};

export const removeToken = () => {
  sessionStorage.removeItem('token');
  localStorage.removeItem('tokenData'); // Clean up any old localStorage data
  localStorage.removeItem('token');
};

export const isTokenExpired = () => {
  return !sessionStorage.getItem('token');
};