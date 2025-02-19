import axios from "axios";

// 1. Validate Access Token
export const checkAccessToken = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return null;
  }

  try {
    const response = await axios.post(
      "https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api",
      {
        action: "access_check",
        access_token: token,
      }
    );

    return response.status === 200 ? token : await refreshAccessToken();
  } catch (error) {
    console.error("Error validating token:", error);
    return await refreshAccessToken();
  }
};

// 2. Refresh Access Token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("Refresh token missing");

    const response = await axios.post(
      "https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api",
      {
        action: "refresh",
        refresh_token: refreshToken,
      }
    );

    if (response.status === 200 && response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
      if (response.data.refresh_token) {
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }
      return response.data.access_token;
    } else {
      throw new Error("Unable to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    logoutUser();
  }
};

// 3. Logout User and Redirect to Login
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/auth/user"; // Redirect to login page
};
