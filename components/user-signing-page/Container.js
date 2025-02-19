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
      if (!email || !password) {
        toast.warn("All fields are required");
        return;
      }

      if (!passwordRegex.test(password)) {
        toast("Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!");
        return;
      }

      setLoading(true);

      // Step 2: Check if email is valid format and deliverable
      const check_legit_email = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${emailKey}&email=${email}`);
      if (!check_legit_email.data.is_valid_format.value || check_legit_email.data.is_smtp_valid.value === false) {
        toast.warn("Invalid email format or email is undeliverable");
        return;
      }

      // Step 3: Check if email is available
      const check_available_email = await axios.get(`https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api?email=${email}`);
      if (check_available_email.data.exists) {
        toast.warn("Email already in use");
        return;
      }

      // Step 4: Send OTP for email verification
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_password", password);
      const send_otp = await axios.post(`https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`, { email });
      if (send_otp.status === 200) {
        setCurrentSlide("email-verify");
        toast("OTP sent to email");
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

 
  const handleUserSignup = async () => {
    signing();
  };
  //----- verify email, then signup
  const verifying = async () => {
    try {
      setLoading(true);
      /////////////// check if otp is legit from email //////////////////
      const verify_otp = await axios.get(
        `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp?email=${localStorage.getItem(
          "user_email"
        )}&otp=${value}`
      );
      console.log("OTP Verifying⛔⛔⛔", verify_otp);
      if (verify_otp.status === 200) {
        setOtpError(false);
        //////// OTP valid? accept org /////////////////
        const acceptEmailPassword = await axios.post(
          `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
          {
            email: localStorage.getItem("user_email"),
            password: localStorage.getItem("user_password"),
            action: "sign_up",
          }
        );
        console.log("sign up res👉", acceptEmailPassword);
        if (acceptEmailPassword.status === 200) {
          toast.warn("User already exists");
          setCurrentSlide("signing");
        }
        if (acceptEmailPassword.status === 201) {
          setLoading(false);
          toast(acceptEmailPassword.data.message);
          setCurrentSlide("user-signup-success");
          
          // Store both access token and refresh token in localStorage
          localStorage.setItem("userId", acceptEmailPassword.data.user_id);
          localStorage.setItem("access_token", acceptEmailPassword.data.token); // Store access token
          localStorage.setItem("refresh_token", acceptEmailPassword.data.refresh_token); // Store refresh token
          
          // Optionally check if the access token is valid right after signup
          await checkAccessToken();
        }
        
        if (acceptEmailPassword.status === 409) {
          setCurrentSlide("signing");
          toast("User already exists");
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

// 2. Check Access Token Validity and Refresh If Expired
const checkAccessToken = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    // No token, user is not authenticated
    setCurrentSlide("signing");
  }

  try {
    const response = await axios.post(
      'https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api',  // Endpoint to validate access token
      { access_token: token }
    );

    if (response.status === 200) {
      // Token is valid
      return token;
    } else {
      // Token is invalid, attempt to refresh it
      return await refreshAccessToken();
    }
  } catch (error) {
    console.error('Error validating token:', error);
    // If token validation fails, refresh it or logout
    return await refreshAccessToken();
  }
};


// 3. Refresh Access Token using Refresh Token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('Refresh token missing');
    }

    const response = await axios.post(
      'https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api',
      { refresh_token: refreshToken }
    );

    if (response.status === 200 && response.data.access_token) {
      // Save new access and refresh tokens to localStorage
      localStorage.setItem('access_token', response.data.access_token);
      if (response.data.refresh_token) {
        localStorage.setItem('refresh_token', response.data.refresh_token);
      }
      return response.data.access_token;
    } else {
      throw new Error('Unable to refresh token');
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    logoutUser();
  }
};

// 4. Logout User and Clear Tokens
const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  setCurrentSlide("signing");  // Redirect to login page
};
  const userSignin = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!emailAddress || !userPassword1) {
        toast.warn("all input fields required");
        return;
      }
      setLoading(true);
      setCurrentSlide("user-signin-loading");
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
        toast("user not found");
      }
      if (response.status === 200 && response.data.valid === true) {
              // Successful sign-in, save tokens in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);  // If provided
        setCurrentSlide("user-signin-success");
        toast("signin successful");
        // Cookies.set("voyexEmail", orgEmail, { expires: 7 });
              // Check if the token is valid
      await checkAccessToken();
      }
      if (response.status === 404) {
        setCurrentSlide("signing");
        return;
      }
    } catch (error) {
      console.log("user_signin_error", error);
      if (error.response.data) {
        toast(error.response.data.message);
        setCurrentSlide("signing");
      } else toast(error.message);
      if (error.message.includes("network error")) {
        toast("network error, try again!");
      }
    } finally {
      setLoading(false);
    }
  };
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
