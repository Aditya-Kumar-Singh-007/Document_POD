import { loginStart, loginSuccess, loginFailure } from "../auth";
import { setTokenWithExpiry, removeToken } from "../../utils/tokenUtils";
import { apiCache } from "../../utils/apiCache";

const BASE_URL = "https://documentpod-backend.onrender.com";

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
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const res = await fetch(`${BASE_URL}/api/auth/fetchuser`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (res.ok) {
        const userData = await res.json();
        // Cache user data for 10 minutes
        apiCache.set(cacheKey, userData, 10 * 60 * 1000);
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
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
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

      clearTimeout(timeoutId);
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
        dispatch(loginFailure("Login timeout. Please try again."));
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
        "https://documentpod-backend.onrender.com/api/auth/createuser",
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
