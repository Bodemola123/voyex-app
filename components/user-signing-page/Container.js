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
  const [email, setUserEmail] = useState("");
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
  const debouncedValue = useDebounce(email, 500);

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
  if (googleUserDetails) {
    toast("Google details saved successfully! ✅");
  }
}, [googleUserDetails]);


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
      if (!response?.access_token) {
        toast("Google authentication failed. Please try again.");
        return;
      }
      setLoadingGoogle(true);
      toast("Processing your signup...");
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        if (res.status !== 200) {
          throw new Error("Failed to retrieve Google user info.");
        }
  
        if (res.status === 200) {
          const apiResponse = await axios.post(
            "https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api",
            {
              email: res.data?.email,
              password: res.data?.sub,
              action: "sign_up",
            }
          );
          console.log("API Response:",apiResponse.data);

          if (apiResponse.status === 201) {
            setCurrentSlide("user-signup-success");
            toast(apiResponse.data.message);
  
            // ✅ Store Access & Refresh Tokens if provided
            if (apiResponse.data.access_token) {
              localStorage.setItem("access_token", apiResponse.data.access_token);
            }
            if (apiResponse.data.refresh_token) {
              localStorage.setItem("refresh_token", apiResponse.data.refresh_token);
            }
            const entityId = apiResponse.data.user_id;
localStorage.setItem("entityId", entityId);
        let userType = apiResponse.data.user_id ? "user" : "organization";
        localStorage.setItem("userType", userType);
                        const email = res.data?.email
                localStorage.setItem("userEmail", email);



            // Store User Details
            dispatch(
              updateGoogleUserDetails({
                email: res.data?.email,
                username: res.data?.name,
                picture: res.data?.picture,
                id: res.data?.sub,
              })
            );
          }else if (apiResponse.status === 400) {
            setCurrentSlide("signing");
            toast(apiResponse.data?.error);
          } 
          else if (apiResponse.status === 200) {  // ✅ Handle "User already exists"
            setCurrentSlide("signing");
            toast("User already exists.");
          }
          else if (apiResponse.status === 409) {  // ✅ Handle "User already exists"
            setCurrentSlide("signing");
            toast("User already exists.");
          }
        }
      } catch (err) {
        console.error(err);
        setCurrentSlide("signing");
        if (err.response?.data?.error) {
          toast(err.response.data.error);
        } else {
          toast(err.message);
        }
      } finally {
        setLoadingGoogle(false);
      }
    },
  });
  

  ////////////////// GOOGLE USER SIGNIN /////////////////////////////////
  const googleUserSignin = useGoogleLogin({
    onSuccess: async (response) => {
      if (!response?.access_token) {
        toast("Google authentication failed. Please try again.");
        return;
      }
      setLoadingGoogle(true);
      toast("Signing in...");
      try {
        // Fetch Google user info
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        if (res.status !== 200) {
          throw new Error("Failed to retrieve Google user info.");
        }
        if (res.status === 200) {
          // Sign in to your API
          const apiResponse = await axios.post(
            "https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api",
            {
              email: res.data?.email,
              password: res.data?.sub,
              action: "sign_in",
            }
          );
          console.log("API Response:", apiResponse.data);


          // ✅ Console log access & refresh tokens (if they exist)
            console.log("Access Token:", apiResponse.data.access_token );
          console.log("Refresh Token:", apiResponse.data.refresh_token );

          if (apiResponse.status === 200 && apiResponse.data.valid === true) {
            let userType = apiResponse.data.user_id ? "user" : "organization";
            localStorage.setItem("userType", userType);
            const entityId = apiResponse.data.user_id;
localStorage.setItem("entityId", entityId);

      
            // Fetch full name if user
            if (userType === "user") {
              const userId = apiResponse.data.user_id;
      
              try {
                const profileResponse = await axios.get(
                  `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api?user_id=${userId}`
                );
                console.log("✅ Profile data:", profileResponse.data); 
                const role = profileResponse.data?.org_details?.role || "None"
                localStorage.setItem("role", role)
                const accessLevel = profileResponse.data?.org_details?.access_level || "None"
                localStorage.setItem("accessLevel", accessLevel)// <-- Add this line
                const email = profileResponse.data?.email
                localStorage.setItem("userEmail", email);
                const fullName = profileResponse.data?.fullname || "Explorer";
                const firstName = fullName.trim().split(" ")[0];
      
                localStorage.setItem("fullName", fullName);
                localStorage.setItem("firstName", firstName);
              } catch (profileErr) {
                console.error("Failed to fetch user profile:", profileErr);
                localStorage.setItem("firstName", "Explorer");
              }
            }
            setCurrentSlide("user-signin-success");
            toast("Login successful");
  
            // ✅ Store tokens if provided
            if (apiResponse.data.access_token) {
              localStorage.setItem("access_token", apiResponse.data.access_token);
            }
            if (apiResponse.data.refresh_token) {
              localStorage.setItem("refresh_token", apiResponse.data.refresh_token);
            }
  
            // Store User Details
            dispatch(
              updateGoogleUserDetails({
                email: res.data?.email,
                username: res.data?.name,
                picture: res.data?.picture,
                id: res.data?.sub,
              })
            );
  
            // ✅ Check & refresh token if needed
            setTimeout(() => {
              checkAccessToken();
            }, 1000);
          } 
          
          else if (apiResponse.status === 200 && apiResponse.data.valid === false) {
            toast.warn("User doesn't exist!");
            return;
          }
          else if (apiResponse.status === 404) { 
            toast.warn("User doesn't exist! Please sign up.");
            setCurrentSlide("signing");
          }
        }
      } catch (err) {
        console.error(err);
        if (err.response?.data?.message) {
          toast.warn("User not found");
        } else {
          toast.warn("User not found");
        }
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
        if (!email || !userPassword) {
            toast.warn("All fields are required");
            return;
        }

        // if (!passwordRegex.test(password)) {
        //   toast("Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!");
        //   return;
        // }

        setLoading(true);

        // Step 2: Check if email is valid format and deliverable (Commented out for now)
        // const check_legit_email = await axios.get(
        //     `https://emailvalidation.abstractapi.com/v1/?api_key=${emailKey}&email=${email}`
        // );
        // if (!check_legit_email.data.is_valid_format.value || check_legit_email.data.is_smtp_valid.value === false) {
        //     toast.warn("Invalid email format or email is undeliverable");
        //     return;
        // }

        // Step 3: Check if email is available
        const check_available_email = await axios.get(
            `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api?email=${email}`
        );
        if (check_available_email.data.exists) {
            toast.warn("Email already in use");
            return;
        }

        // Step 4: Send OTP for email verification
        localStorage.setItem("user_email", email);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("user_password", userPassword);
        const send_otp = await axios.post(
            `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`,
            { email }
        );

        if (send_otp.status === 200) {
            setCurrentSlide("email-verify");
            toast("OTP sent to email. Kindly check spam mail if not seen in inbox");
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
        
        console.log("Sign up response 👉", acceptEmailPassword);
        
        if (acceptEmailPassword.status === 200) {
          toast.warn("User already exists");
          setCurrentSlide("signing");
        }
        
        if (acceptEmailPassword.status === 201) {
          setLoading(false);
          toast("Sign up Successful");
          setCurrentSlide("user-signup-success");
        
          // ✅ Log tokens from the response
          console.log("Access Token from API:", acceptEmailPassword.data.access_token);
          console.log("Refresh Token from API:", acceptEmailPassword.data.refresh_token);
                  let userType = acceptEmailPassword.data.user_id ? "user" : "organization";
        localStorage.setItem("userType", userType);
        
          // ✅ Save both access and refresh tokens in localStorage
          localStorage.setItem("userId", acceptEmailPassword.data.user_id);
localStorage.setItem("entityId", acceptEmailPassword.data.user_id);

          localStorage.setItem("access_token", acceptEmailPassword.data.access_token);
          localStorage.setItem("refresh_token", acceptEmailPassword.data.refresh_token);
        
          // ✅ Confirm tokens were saved in localStorage
          console.log("Access Token in localStorage:", localStorage.getItem("access_token"));
          console.log("Refresh Token in localStorage:", localStorage.getItem("refresh_token"));
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
  const checkAccessToken = async () => {
    const token = localStorage.getItem('access_token');
    console.log("Checking Access Token:", token); // Debugging log
    if (!token) return null;
  
    try {
        const response = await axios.post(
            'https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api',
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
  const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        console.log("Refreshing Access Token with Refresh Token:", refreshToken);
  
        const response = await axios.post(
            'https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api',
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
        logoutUser()
    }
  };
  
  
  
  // 3. Logout User and Redirect to Login
  const logoutUser = () => {
      //  console.warn("Logout triggered but temporarily disabled for debugging.");
      // console.log("Access Token Before Logout:", localStorage.getItem('access_token'));
      // console.log("Refresh Token Before Logout:", localStorage.getItem('refresh_token'));
      localStorage.clear();      // Clears all localStorage keys
      sessionStorage.clear();    // Optional: also clear sessionStorage
    window.location.href = "/auth/user"// Redirect to login page
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
        toast("Please check email and password. Click on forgot password if forgotten");
        return;
      }
  
      if (response.status === 200 && response.data.valid === true) {
        // Save tokens
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token || "");
  
        let userType = response.data.user_id ? "user" : "organization";
        localStorage.setItem("userType", userType);
        const entityId = response.data.user_id || response.data.org_id;
        localStorage.setItem("entityId", entityId);

        // Fetch full name if user
        if (userType === "user") {
          const userId = response.data.user_id;
  
          try {
            const profileResponse = await axios.get(
              `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api?user_id=${userId}`
            );
            console.log("✅ Profile data:", profileResponse.data); // <-- Add this line
            const role = profileResponse.data?.org_details?.role || "None"
            localStorage.setItem("role", role)
            const accessLevel = profileResponse.data?.org_details?.access_level || "None"
            localStorage.setItem("accessLevel", accessLevel)
            const email = profileResponse.data?.email
            localStorage.setItem("userEmail", email);
            const fullName = profileResponse.data?.fullname || "Explorer";
            const firstName = fullName.trim().split(" ")[0];
  
            localStorage.setItem("fullName", fullName);
            localStorage.setItem("firstName", firstName);
          } catch (profileErr) {
            console.error("Failed to fetch user profile:", profileErr);
            localStorage.setItem("firstName", "Explorer");
          }
        }
  
        setCurrentSlide("user-signin-success");
        toast("signin successful");
  
        setTimeout(() => {
          checkAccessToken();
        }, 10000);
      }
  
      if (response.status === 404) {
        toast.warning("User not registered")
        setCurrentSlide("signing");
        return;
      }
    } catch (error) {
      console.log("user_signin_error", error);
      if (error.response?.data?.message) {
        toast("User not registered");
      } else {
        toast( "Something went wrong");
      }
  
      if (error.message?.toLowerCase().includes("network error")) {
        toast("network error, try again!");
      }
  
      setCurrentSlide("signing");
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
      toast.warn("Provide email address");
      return;
    }
  
    try {
      setLoading(true);
  
      // 1️⃣ Check if email exists in the database
      const checkEmailResponse = await axios.get(
        `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api?email=${forgotEmail}`
      );
  
      if (!checkEmailResponse.data.exists) {
        toast.warn("Email not registered");
        setLoading(false);
        return;
      }
  
      // 2️⃣ If email exists, send OTP
      const sendOtpResponse = await axios.post(
        `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`,
        {
          email: forgotEmail,
        }
      );
  
      if (sendOtpResponse.status === 200) {
        localStorage.setItem("reset_password_email", forgotEmail);
        setCurrentSlide("reset-verifyotp");
        toast("OTP sent to email. Kindly check spam mail if not seen in inbox");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast.warn(error.response.data);
      } else {
        toast.warn(error.message);
      }
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
        toast("OTP resent to email. Kindly check spam mail if not seen in inbox");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast(error.response.data, "Wrong code, please try again");
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
