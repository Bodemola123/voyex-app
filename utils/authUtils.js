import axios from "axios";

// 1. Validate Access Token
export const checkAccessToken = async () => {
  const token = localStorage.getItem('access_token');
  console.log("Checking Access Token:", token); // Debugging log
  if (!token) return null;

  try {
      const response = await axios.post(
          'https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api',
          { action: "access_check", access_token: token }
      );
      console.log("Access Token Check Response:", response); // Log full response

      if (response.status === 200) {
          return token;
      } else {
          return await refreshAccessToken();
      }
  } catch (error) {
      console.error("Error validating token:", error);
      return await refreshAccessToken();
  }
};



// 2. Refresh Access Token
export const refreshAccessToken = async () => {
  try {
      const refreshToken = localStorage.getItem('refresh_token');
      console.log("Refreshing Access Token with Refresh Token:", refreshToken);

      const response = await axios.post(
          'https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api',
          { action: "refresh", refresh_token: refreshToken }
      );
      console.log("Refresh Token Response:", response.data); // Log full response

      if (response.status === 200 && response.data.access_token) {
          localStorage.setItem('access_token', response.data.access_token);
          if (response.data.refresh_token) {
              localStorage.setItem('refresh_token', response.data.refresh_token);
          }
          return response.data.access_token;
      } else {
          throw new Error("Unable to refresh token");
      }
  } catch (error) {
      console.error("Error refreshing token:", error);;
  }
};



// 3. Logout User and Redirect to Login
export const logoutUser = () => {
    //  console.warn("Logout triggered but temporarily disabled for debugging.");
    // console.log("Access Token Before Logout:", localStorage.getItem('access_token'));
    // console.log("Refresh Token Before Logout:", localStorage.getItem('refresh_token'));
    localStorage.removeItem("userType");
    localStorage.removeItem("orgType");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_password");
    localStorage.removeItem("fullName");
    localStorage.removeItem("firstName");
    localStorage.removeItem("userEmail")
    localStorage.removeItem("orgId")
    localStorage.removeItem('entityId')
    localStorage.removeItem("chat_id");
    localStorage.removeItem("messages");
    localStorage.removeItem('chats');
    localStorage.removeItem('orgEmail');
    localStorage.removeItem('orgName');
    localStorage.removeItem('poc')

  window.location.href = "/auth/user"// Redirect to login page
};
