// Token utility functions
export const setTokenWithExpiry = (token, expiryHours = 24) => {
  const now = new Date();
  const expiry = new Date(now.getTime() + (expiryHours * 60 * 60 * 1000));
  
  const tokenData = {
    token: token,
    expiry: expiry.getTime()
  };
  
  localStorage.setItem('tokenData', JSON.stringify(tokenData));
};

export const getTokenWithExpiry = () => {
  const tokenDataString = localStorage.getItem('tokenData');
  
  if (!tokenDataString) {
    return null;
  }
  
  try {
    const tokenData = JSON.parse(tokenDataString);
    const now = new Date().getTime();
    
    if (now > tokenData.expiry) {
      // Token expired
      localStorage.removeItem('tokenData');
      localStorage.removeItem('token'); // Remove old token if exists
      return null;
    }
    
    return tokenData.token;
  } catch (error) {
    // Invalid token data
    localStorage.removeItem('tokenData');
    localStorage.removeItem('token');
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem('tokenData');
  localStorage.removeItem('token'); // Remove old token if exists
};

export const isTokenExpired = () => {
  const tokenDataString = localStorage.getItem('tokenData');
  
  if (!tokenDataString) {
    return true;
  }
  
  try {
    const tokenData = JSON.parse(tokenDataString);
    const now = new Date().getTime();
    return now > tokenData.expiry;
  } catch (error) {
    return true;
  }
};