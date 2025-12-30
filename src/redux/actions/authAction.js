import { loginStart, loginSuccess, loginFailure } from "../auth";
import { setTokenWithExpiry, removeToken } from "../../utils/tokenUtils";
import { apiCache } from "../../utils/apiCache";

const BASE_URL = process.env.REACT_APP_API_URL || "https://documentpod-backend.onrender.com";
const USER_CACHE_TTL = parseInt(process.env.REACT_APP_USER_CACHE_TTL) || 600000; // 10 minutes

export const fetchUser = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      if (!token) return;
      
      // Check cache first
      const cacheKey = `user_${token.slice(-10)}`;
      const cachedUser = apiCache.get(cacheKey);
      
      if (cachedUser) {
        dispatch({ type: 'auth/setUser', payload: cachedUser });
        return;
      }
      
      const controller = new AbortController();
      
      const res = await fetch(`${BASE_URL}/api/auth/fetchuser`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
        signal: controller.signal
      });
      
      if (res.ok) {
        const userData = await res.json();
        // Cache user data for configured time
        apiCache.set(cacheKey, userData, USER_CACHE_TTL);
        dispatch({ type: 'auth/setUser', payload: userData });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Failed to fetch user:', error);
      }
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const controller = new AbortController();
      
      const res = await fetch(
        `${BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
          signal: controller.signal
        }
      );
      const data = await res.json();
      
      if (!res.ok || !data.authToken) {
        dispatch(loginFailure(data.error || "Login failed"));
        return;
      }
     
      setTokenWithExpiry(data.authToken, 24);
      dispatch(loginSuccess({ token: data.authToken }));
      dispatch(fetchUser());
      
    } catch (error) {
      if (error.name === 'AbortError') {
        dispatch(loginFailure("Request cancelled. Please try again."));
      } else {
        dispatch(loginFailure("Network error. Please try again."));
      }
    }
  };
};

export const signUp = (userInfo) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const res = await fetch(
        `${BASE_URL}/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );
      
      const data = await res.json();
      
      if (!res.ok || !data.authToken) {
        dispatch(loginFailure(data.error || "Signup failed"));
        return;
      }
      
      // Store token with 24-hour expiry
      setTokenWithExpiry(data.authToken, 24);
      dispatch(loginSuccess({ token: data.authToken }));
      
      // Fetch user data after successful signup
      dispatch(fetchUser());
      
    } catch (error) {
      dispatch(loginFailure("Network error. Please try again."));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    removeToken();
    apiCache.clear(); // Clear all cached data on logout
    dispatch({ type: 'auth/logout' });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    removeToken();
    apiCache.clear(); // Clear all cached data on logout
    dispatch({ type: 'auth/logout' });
  };
};
