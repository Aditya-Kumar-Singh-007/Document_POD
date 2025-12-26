import { loginStart, loginSuccess, loginFailure } from "../auth";
import { setTokenWithExpiry, removeToken } from "../../utils/tokenUtils";

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const res = await fetch(
        "https://documentpod-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await res.json();
      
      if (!res.ok || !data.authToken) {
        dispatch(loginFailure(data.error || "Login failed"));
        return;
      }
     
      // Store token with 24-hour expiry
      setTokenWithExpiry(data.authToken, 24);
      dispatch(loginSuccess(data.authToken));
      
    } catch (error) {
      dispatch(loginFailure("Network error. Please try again."));
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
      dispatch(loginSuccess(data.authToken));
      
    } catch (error) {
      dispatch(loginFailure("Network error. Please try again."));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    removeToken();
    dispatch({ type: 'auth/logout' });
  };
};
