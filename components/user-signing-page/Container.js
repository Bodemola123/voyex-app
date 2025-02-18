"use client";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { updateGoogleUserDetails } from "@/lib/features/authentication/auth";
import axios from "axios";
import Signing from "./Signing";
import EmailVerify from "./EmailVerify";
import SignupAccountSuccess from "./SignupAccountSuccess";
import SigninAccountSuccess from "./SigninAccountSuccess";
import BasicInfoContainer from "./BasicInfoContainer";
import { useDebounce } from "@/hooks/useDebounce";
import SigninLoading from "./SigninLoading";
import SignupLoading from "./SignupLoading";
import Cookies from "js-cookie";
import ForgotPassword from "./ForgotPasswordHome";
import VerifyEmailAuthentication from "./ResetVerifyOTP";
import ResetPassword from "./ResetPasswordHome";
import PasswordChanged from "./PasswordChangedHome";
import UserUploadDetails from "./UserUploadDetails";

const emailKey = process.env.EMAIL_KEY;

function Container() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { googleUserDetails } = useSelector((state) => state.auth);

  /// sign up section
  const [userEmail, setUserEmail] = useState("");
  const [value, setValue] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  /// sign in section
  const [userName1, setUserName1] = useState("");
  const [userPassword1, setUserPassword1] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [border, setBorder] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("signing");
  const debouncedValue = useDebounce(userEmail, 500);

  const [otpError, setOtpError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [mins, setMins] = useState("");
  const [secs, setSecs] = useState("");

  //////// forgot password section
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetValue, setResetValue] = useState("");

  //////////// Countdown timer
  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format the time as mm:ss
  // const formatTime = () => {
  //   const minutes = Math.floor(timeLeft / 60);
  //   const secs = timeLeft % 60;
  //   return `${minutes.toString().padStart(2, "0")}:${secs
  //     .toString()
  //     .padStart(2, "0")}`;
  // };

  useEffect(() => {
    const formatTime = () => {
      setMins(
        Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, "0")
      );
      setSecs((timeLeft % 60).toString().padStart(2, "0"));
    };
    currentSlide === "email-verify" && formatTime();
    currentSlide === "reset-verifyotp" && formatTime();
  }, [timeLeft, currentSlide]);

  useEffect(() => {
    //navigate to /search if googleUserDetails exists
    if (googleUserDetails) {
      toast("Navigating to Search");
      setTimeout(() => {
        router.push("/search");
      }, 5500);
    }
  }, [router, googleUserDetails]);

  const emailInput = (e) => {
    setUserEmail(e.target.value);
  };
  const usernameInput = (e) => {
    setUserName(e.target.value);
  };
  const countryInput = (e) => {
    setUserCountry(e.target.value);
  };
  const passwordInput = (e) => {
    setUserPassword(e.target.value);
  };

  //////////////////////////////////
  const passwordInput1 = (e) => {
    setUserPassword1(e.target.value);
  };

  ////////////////// GOOGLE USER SIGNUP /////////////////////////////////
  const googleUserSignup = useGoogleLogin({
    onSuccess: async (response) => {
      setLoadingGoogle(true);
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
          }
        );
        console.log(res);
        console.log(res.data);
        if (res.status === 200) {
          const response = await axios.post(
            `https://ek251cvxyd.execute-api.eu-north-1.amazonaws.com/default/users_voyex`,
            {
              email: res.data?.email,
              password: res.data?.sub,
              action: "sign_up",
            }
          );
          console.log("response", response);
          if (response.status === 201) {
            setCurrentSlide("user-signup-success");
            toast(response.data.message);
          }
          if (response.status === 400) {
            setCurrentSlide("signing");
            toast(response.data?.error);
          }
          dispatch(
            updateGoogleUserDetails({
              email: res.data?.email,
              username: res.data?.name,
              picture: res.data?.picture,
              id: res.data?.sub,
            })
          );
          // router.push("/search");
          // toast("Login Sucessfull");
        }
      } catch (err) {
        console.log(err);
        if (err.response.data?.error) {
          toast(err.response.data.error);
        } else toast(err.message);
      } finally {
        setLoadingGoogle(false);
      }
    },
  });
  
  ////////////////// GOOGLE USER SIGNIN /////////////////////////////////
  const googleUserSignin = useGoogleLogin({
    onSuccess: async (response) => {
      setLoadingGoogle(true);
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
          headers: {
              Authorization: `Bearer ${response.access_token}`,
          },
          }
        );
        // console.log(res);
        // console.log(res.data);
        if (res.status === 200) {
          const response = await axios.post(
            `https://ek251cvxyd.execute-api.eu-north-1.amazonaws.com/default/users_voyex`,
            {
              email: res.data?.email,
              password: res.data?.sub,
              action: "sign_in",
            }
          );
          // console.log("response", response);
          if (response.status === 200 && response.data.exists === true) {
            setCurrentSlide("signin-success");
            toast("Login successful");
            // Cookies.set("voyexUserName", res.data.name, { expires: 7 });
            }
          if (response.status === 200 && response.data.exists === false) {
            toast.warn("User doesn't exist!");
            return;
          }
          dispatch(
            updateGoogleUserDetails({
              email: res.data?.email,
              username: res.data?.name,
              picture: res.data?.picture,
              id: res.data?.sub,
            })
          );
          // router.push("/search");
          // toast("Login Sucessfull");
        }
      } catch (err) {
        console.log(err);
        if (err.response?.data?.message) {
          toast.warn(err.response.data.message);
        } else toast.warn(err.message);
      } finally {
        setLoadingGoogle(false);
      }
    },
  });
  

  ////////////////// USER SIGN UP /////////////////////////////////
  //----- authenticate email
  const signing = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!userEmail || !userPassword) {
        toast.warn("All fields are required");
        return;
      }
  
      if (!passwordRegex.test(userPassword)) {
        toast("Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!");
        return;
      }
  
      setLoading(true);
  
      // Retrieve access token and validate it
      let accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        const checkAccessResponse = await axios.post(
          `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
          {
            action: "access_check",
            access_token: accessToken,
          }
        );
  
        // If the access token is expired or invalid, refresh it
        if (checkAccessResponse.status === 200 && checkAccessResponse.data.valid === false) {
          accessToken = await refreshAccessToken(); // Call the function to refresh the token
          if (!accessToken) {
            toast("Session expired, please log in again.");
            localStorage.removeItem("access_token"); // Optionally clear the stored token
            setCurrentSlide("signing");
            return;
          }
        }
      }
  
      // Continue with the signup logic after access token validation
  
      // Check if the email is legitimate
      const check_legit_email = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${emailKey}&email=${userEmail}`
      );
      console.log(check_legit_email.data);
  
      if (check_legit_email.data.is_valid_format.value === false) {
        toast.warn("Invalid email format");
        return;
      }
  
      if (check_legit_email.data.is_smtp_valid.value === false && check_legit_email.data.deliverability === "UNDELIVERABLE") {
        toast.warn("Email broken, try another");
        return;
      }
  
      if (check_legit_email.data.is_smtp_valid.value === true && check_legit_email.data.is_valid_format.value === true) {
        ///////////// check if email is taken /////////////////////
        const check_available_email = await axios.get(
          `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api?email=${userEmail}`
        );
  
        /////////// if email exists, return/stop
        if (check_available_email.status === 200 && check_available_email.data.exists === true) {
          toast.warn("Email already in use");
          return;
        }
  
        /////////////// if email doesn't exist in database, send otp verification
        if (check_available_email.status === 200 && check_available_email.data.exists === false) {
          localStorage.setItem("user_email", userEmail);
          localStorage.setItem("user_password", userPassword);
  
          const send_otp = await axios.post(
            `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`,
            {
              email: localStorage.getItem("user_email"),
            }
          );
          if (send_otp.status === 200) {
            setCurrentSlide("email-verify");
            toast("OTP sent to email");
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast(error.response.data);
      } else toast(error.message);
      setCurrentSlide("signing");
    } finally {
      setLoading(false);
    }
  };
  
  const handleUserSignup = async () => {
    signing();
  };
  //----- verify email, then signup
  const verifying = async () => {
    try {
      setLoading(true);
  
      // Retrieve access token and validate it
      let accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        const checkAccessResponse = await axios.post(
          `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
          {
            action: "access_check",
            access_token: accessToken,
          }
        );
  
        // If the access token is expired or invalid, refresh it
        if (checkAccessResponse.status === 200 && checkAccessResponse.data.valid === false) {
          accessToken = await refreshAccessToken(); // Call the function to refresh the token
          if (!accessToken) {
            toast("Session expired, please log in again.");
            localStorage.removeItem("access_token"); // Optionally clear the stored token
            setCurrentSlide("signing");
            return;
          }
        }
      }
  
      // Continue with OTP verification logic
      const verify_otp = await axios.get(
        `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp?email=${localStorage.getItem(
          "user_email"
        )}&otp=${value}`
      );
      console.log("OTP Verifying⛔⛔⛔", verify_otp);
  
      if (verify_otp.status === 200) {
        setOtpError(false);
  
        // If OTP is valid, proceed to sign up the user
        const acceptEmailPassword = await axios.post(
          `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
          {
            email: localStorage.getItem("user_email"),
            password: localStorage.getItem("user_password"),
            action: "sign_up",
          }
        );
        console.log("Sign up response👉", acceptEmailPassword);
  
        if (acceptEmailPassword.status === 200) {
          toast.warn("User already exists");
          setCurrentSlide("signing");
        }
        if (acceptEmailPassword.status === 201) {
          setLoading(false);
          toast(acceptEmailPassword.data.message);
          setCurrentSlide("user-signup-success");
          localStorage.setItem("userId", acceptEmailPassword.data.user_id);
        }
        if (acceptEmailPassword.status === 409) {
          setCurrentSlide("signing");
        }
      }
    } catch (error) {
      console.log(error);
      setOtpError(true);
      if (error.response?.data?.message) {
        toast(error.response.data.message);
      } else toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    value.length === 6 && verifying();
    value.length !== 6 && setOtpError(false);
  }, [value.length]);

  ////////////////// USER SIGN IN /////////////////////////////////
  const userSignin = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!emailAddress || !userPassword1) {
        toast.warn("All input fields are required");
        return;
      }
      setLoading(true);
      setCurrentSlide("user-signin-loading");
  
      // Attempt to sign in the user
      const response = await axios.post(
        `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
        {
          email: emailAddress,
          password: userPassword1,
          action: "sign_in",
        }
      );
      console.log("user signin response", response);
  
      if (response.status === 200 && response.data.valid === false) {
        setCurrentSlide("signing");
        toast("User not found");
        return;
      }
  
      if (response.status === 200 && response.data.valid === true) {
        toast("Sign-in successful");
  
        // Store the access token and refresh token in localStorage
        const accessToken = response.data?.access_token;
        const refreshToken = response.data?.refresh_token;  // Assuming the refresh token is returned
  
        if (accessToken) {
          localStorage.setItem("access_token", accessToken);  // Save access token in localStorage
        }
  
        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);  // Save refresh token in localStorage
        }
  
        // Optionally, store other user details (like user ID)
        const userId = response.data?.user_id;
        if (userId) {
          localStorage.setItem("user_id", userId);  // Save user ID if needed
        }
  
        // Perform an access check to validate the token
        const checkAccessResponse = await axios.post(
          `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
          {
            action: "access_check",
            access_token: accessToken,  // Pass the stored access token
          }
        );
  
        if (checkAccessResponse.status === 200 && checkAccessResponse.data.valid === true) {
          console.log("Access is valid.");
          toast("Access is Valid");
          setCurrentSlide("user-signin-success");
  
          // Call the API with token refresh mechanism
          makeApiCallWithTokenRefresh();
        } else {
          console.log("Access is invalid or expired.");
          toast("Session expired, please log in again.");
          // Optionally, clear the stored token and user ID here
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_id");
        }
      }
  
      if (response.status === 404) {
        setCurrentSlide("signing");
        return;
      }
    } catch (error) {
      console.log("user_signin_error", error);
      if (error.response?.data) {
        toast(error.response.data.message);
        setCurrentSlide("signing");
      } else toast(error.message);
      if (error.message.includes("network error")) {
        toast("Network error, try again!");
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Refresh token logic using your API's endpoint
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
  
      if (!refreshToken) {
        throw new Error("No refresh token found.");
      }
  
      // Use the refresh token to request a new access token
      const response = await axios.post(
        `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
        {
          refresh_token: refreshToken,  // Send the refresh token
          action: "refresh_token",  // Make sure this action is correct based on your API's requirements
        }
      );
  
      if (response.status === 200 && response.data?.access_token) {
        const newAccessToken = response.data.access_token;
  
        // Store the new access token
        localStorage.setItem("access_token", newAccessToken);
  
        return newAccessToken;  // Return the new access token
      } else {
        throw new Error("Failed to refresh access token.");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  };
  
  // Example of how to use the refresh logic when an API call fails
  const makeApiCallWithTokenRefresh = async () => {
    try {
      let accessToken = localStorage.getItem("access_token");
  
      // Try to make the API call
      const response = await axios.get(
        `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      // Handle response if the access token is valid
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Token expired, refresh token
        try {
          const newAccessToken = await refreshAccessToken();
          // Retry the API call with the new token
          const retryResponse = await axios.get(
            "https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api",
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          console.log(retryResponse.data);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
        }
      } else {
        console.error("API call error:", error);
      }
    }
  };
  
  // Trigger sign-in
  const handleUserSignin = async () => {
    userSignin();
  };
  
  

  ////////////// USER FORGOT PASSWORD /////////////////
  const forgotPassword = async () => {
    if (!forgotEmail) {
      toast.warn("provide email address");
      return;
    }
    try {
      setLoading(true);
      /////////////// check if email is legit //////////////////
      const check_legit_email = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${emailKey}&email=${forgotEmail}`
      );
      console.log(check_legit_email.data);
      if (check_legit_email.data.is_valid_format.value === false) {
        toast.warn("invalid email format");
        return;
      }
      if (
        check_legit_email.data.is_smtp_valid.value === false &&
        check_legit_email.data.deliverability === "UNDELIVERABLE"
      ) {
        toast.warn("email broken, try another");
        return;
      }
      if (
        check_legit_email.data.is_smtp_valid.value === true &&
        check_legit_email.data.is_valid_format.value === true
      ) {
        ///// if email is legit? send otp
        const send_otp = await axios.post(
          `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`,
          {
            email: forgotEmail,
          }
        );
        console.log("OTP response", send_otp);
        if (send_otp.status === 200) {
          localStorage.setItem("reset_password_email", forgotEmail);
          setLoading(false);
          setCurrentSlide("reset-verifyotp");
          toast("OTP sent to email");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast(error.response.data);
      } else toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUserForgotPassword = async () => {
    forgotPassword();
  };
  ////////////// USER RESEND OTP /////////////////
  const resendOtp = async () => {
    try {
      setLoading(true);
      const resend_otp = await axios.post(
        `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`,
        {
          email: localStorage.getItem("user_email"),
        }
      );
      console.log("OTP response", resend_otp);
      if (resend_otp.status === 200) {
        setLoading(false);
        setCurrentSlide("email-verify");
        toast("OTP resent to email");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast(error.response.data);
      } else toast(error.message);
      if (error.message) {
        setCurrentSlide("signing");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleUserResendOtp = async () => {
    resendOtp();
  };
  ////////////// FORGOT PASSWORD USER RESEND OTP /////////////////
  const resendForgotPasswordOtp = async () => {
    try {
      setLoading(true);
      const resend_otp = await axios.post(
        `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`,
        {
          email: localStorage.getItem("reset_password_email"),
        }
      );
      console.log("OTP response", resend_otp);
      if (resend_otp.status === 200) {
        setLoading(false);
        setCurrentSlide("reset-verifyotp");
        toast("OTP resent to email");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        toast(error.response.data.message);
      } else toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUserResendForgotPasswordOtp = async () => {
    resendForgotPasswordOtp();
  };

  //----- verify reset-password otp & email, then display reset input fields
  const verifyResetPasswordOtp = async () => {
    try {
      setLoading(true);
      /////////////// check if otp is legit from email //////////////////
      const verify_otp = await axios.get(
        `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp?email=${localStorage.getItem(
          "reset_password_email"
        )}&otp=${resetValue}`
      );
      console.log("OTP Verifying⛔⛔⛔", verify_otp);
      // otp valid? change tab
      if (verify_otp.status === 200) {
        setOtpError(false);
        setCurrentSlide("reset-password");
      }
    } catch (error) {
      console.log(error);
      setOtpError(true);
      if (error.response?.data?.message) {
        toast(error.response.data.message);
      } else toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    resetValue.length === 6 && verifyResetPasswordOtp();
    resetValue.length !== 6 && setOtpError(false);
  }, [resetValue.length]);

  const handleCurrentSlide = () => {
    if (currentSlide === "signing") {
      return (
        <Signing
          emailInput={emailInput}
          passwordInput={passwordInput}
          handleUserSignup={handleUserSignup}
          /////////////////
          handleUserSignin={handleUserSignin}
          setEmailAddress={setEmailAddress}
          setUserPassword1={setUserPassword1}
          googleUserSignup={googleUserSignup}
          googleUserSignin={googleUserSignin}
          loading={loading}
          loadingGoogle={loadingGoogle}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      );
    } else if (currentSlide === "email-verify") {
      return (
        <EmailVerify
          value={value}
          setValue={setValue}
          loading={loading}
          otpError={otpError}
          mins={mins}
          secs={secs}
          handleUserResendOtp={handleUserResendOtp}
        />
      );
    } else if (currentSlide === "user-signin-loading") {
      return <SigninLoading />;
    } else if (currentSlide === "user-signup-loading") {
      return <SignupLoading />;
    } else if (currentSlide === "user-signup-success") {
      return <SignupAccountSuccess setCurrentSlide={setCurrentSlide} />;
    } else if (currentSlide === "user-signin-success") {
      return <SigninAccountSuccess setCurrentSlide={setCurrentSlide} />;
    } else if (currentSlide === "user-upload-details") {
      return <UserUploadDetails />;
    } else if (currentSlide === "forgot-password-home") {
      return (
        <ForgotPassword
          loading={loading}
          setCurrentSlide={setCurrentSlide}
          setForgotEmail={setForgotEmail}
          handleUserForgotPassword={handleUserForgotPassword}
        />
      );
    } else if (currentSlide === "reset-verifyotp") {
      return (
        <VerifyEmailAuthentication
          loading={loading}
          mins={mins}
          secs={secs}
          resetValue={resetValue}
          setResetValue={setResetValue}
          otpError={otpError}
          handleUserResendForgotPasswordOtp={handleUserResendForgotPasswordOtp}
        />
      );
    } else if (currentSlide === "reset-password") {
      return <ResetPassword setCurrentSlide={setCurrentSlide} />;
    } else if (currentSlide === "password-changed") {
      return <PasswordChanged setCurrentSlide={setCurrentSlide} />;
    } else
      return (
        <Signing
          emailInput={emailInput}
          passwordInput={passwordInput}
          handleUserSignup={handleUserSignup}
          /////////////////
          handleUserSignin={handleUserSignin}
          setEmailAddress={setEmailAddress}
          setUserPassword1={setUserPassword1}
          googleUserSignup={googleUserSignup}
          googleUserSignin={googleUserSignin}
          loading={loading}
          loadingGoogle={loadingGoogle}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      );
  };
  return handleCurrentSlide();

  // return (
  // <ForgotPassword
  //   setCurrentSlide={setCurrentSlide}
  //   setForgotEmail={setForgotEmail}
  //   handleUserForgotPassword={handleUserForgotPassword}
  // />
  // <PasswordChanged setCurrentSlide={setCurrentSlide} />
  // );
}
export default Container;
