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
import SignupSuccess from "./SignupSuccess";
import { useDebounce } from "@/hooks/useDebounce";

import ContactDetailsContainer from "./ContactDetailsContainer";
import AccountError from "./AccountError";
import OrgLoading from "./OrgSignupLoading";
import OrgSigninLoading from "./OrgSigninLoading";
import SigninSuccess from "./SigninSuccess";
// import Cookies from "js-cookie";
import OperationalDetails from "./OperationalDetails";
import OrgUploadLoading from "./OrgUploadLoading";
import OrgUploadSuccess from "./OrgUploadSuccess";
import OrgUploadDetails from "./OrgUploadDetails";
import React from "react";
import ForgotPassword from "./ForgotPasswordHome";
import VerifyEmailAuthentication from "./ResetVerifyOTP";
import ResetPassword from "./ResetPasswordHome";
import PasswordChanged from "./PasswordChangedHome";
import {
  validateEmailInput,
  validatePasswordInput,
} from "@/helpers/orgSignupValidateInput";
import ComplianceandCert from "./ComplianceandCert";
import FinancialInformation from "./FinancialInformation";
import LeadershipAndTeam from "./LeadershipAndTeam";
import BasicInfoContainer from "./BasicInfoContainer";

const emailKey = process.env.EMAIL_KEY;

const Container = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { googleUserDetails } = useSelector((state) => state.auth);
  // console.log("localStorage", localStorage.getItem("orgId"));
  ///////////////////// SIGN UP INPUTS
  const [email, setEmail] = useState("");
  const [orgPassword, setOrgPassword] = useState("");
  const [value, setValue] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgIndustry, setOrgIndustry] = useState("");
  const [orgLocation, setOrgLocation] = useState("");
  const [orgPcpName, setOrgPcpName] = useState("");
  const [orgNumber, setOrgNumber] = useState("");
  const [orgTwitter, setOrgTwitter] = useState("");
  const [orgLinkedin, setOrgLinkedin] = useState("");
  const [orgPoc, setOrgPoc] = useState("");
  const [orgLogo, setOrgLogo] = useState("");
  const [orgAudience, setOrgAudience] = useState("");
  const [orgService, setOrgService] = useState("");
  const [orgSpecialization, setOrgSpecialization] = useState("")
  const [orgTechUsed, setOrgTechUsed] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [signupEmailError, setSignupEmailError] = useState("");
  const [orgFounder, setOrgFounder]= useState("");
  const [orgTeamsize, setOrgTeamsize]= useState("");
  const [orgExco, setOrgExcos]=useState("");
  const [orgCareerspage, setOrgCareerspage]=useState("");
  const [orgFundingInfo, setOrgFundingInfo]=useState("");
  const [orgRevenueMode, setOrgRevenueMode]= useState("");
  const [orgClient, setOrgClient]= useState("");
  const [orgPrivacyInput, setOrgPrivacyInput]= useState("");
  const [orgCertifications, setOrgCertifications]= useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const handleLocationSelection = async (location) => {
    setSelectedLocation(location.label); // Update state with selected location
  }
  const [selectedFunding, setSelectedFunding] = useState("");

  const handleFundingSelect = (fundingValue) => {
    setSelectedFunding(fundingValue);
  };
  const [selectedRevenueModel, setSelectedRevenueModel] = useState("");

const handleRevenueSelect = (revenueValue) => {
  setSelectedRevenueModel(revenueValue);
};
  //////////////////////// SIGN IN INPUTS
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPassword1, setOrgPassword1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  const [otpError, setOtpError] = useState(false);
  const [border, setBorder] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("signing");
  const debouncedValue = useDebounce(email, 500);

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
  

  ///////////////// SIGN UP VALUES
  const emailInput = (e) => {
    setEmail(e.target.value);
  };
  const passwordInput = (e) => {
    setOrgPassword(e.target.value);
  };
  const orgNameInput = (e) => {
    setOrgname(e.target.value);
  };
  const industryInput = (newValue) => {
    setOrgIndustry(newValue); // Use the selected value directly
    console.log(newValue); // Debugging
  };
  const locationInput = (selectedLocation) => {
    setOrgLocation(selectedLocation.label); // Update state with the selected location
    console.log("Selected Location:", selectedLocation);
  };
  const EmailInput = (e) => {
    setOrgEmail(e.target.value);
  };
  const websiteInput = (e) => {
    setOrgWebsite(e.target.value);
  };
  const pocInput = (e) => {
    setOrgPoc(e.target.value);
  };
  const logoInput = (e) => {
    setOrgLogo(e.target.value);
  };
  const twitterInput = (e) => {
    setOrgTwitter(e.target.value);
  };
  const linkedinInput = (e) => {
    setOrgLinkedin(e.target.value);
  };
  const audienceInput = (e) => {
    setOrgAudience(e.target.value);
  };
  const pcpName = (e) => {
    setOrgPcpName(e.target.value);
  };
  const NumberInput = (e) => {
    setOrgNumber(e.target.value);
  };
  const serviceInput = (e) => {
    setOrgService(e.target.value);
  };
  const techUsedInput = (e) => {
    setOrgTechUsed(e.target.value);
  };
  const setSpecialization = (e) => {
    setOrgSpecialization(e.target.value)
  }
  const founderInput=(e)=>{
    setOrgFounder(e.target.value)
  }
  const excoInput=(e)=>{
    setOrgExcos(e.target.value)
  }
  const setTeamsize=(e)=>{
    setOrgTeamsize(e.target.value)
  }
  const setCareerspage=(e)=>{
    setOrgCareerspage(e.target.value)
  }
  const revenueInput=(newValue) => {
    setRevenue(newValue);
    console.log("Selected Revenue:", newValue); // Debugging
  };
  // The function passed to the dropdown to handle the input change
  const fundingInput = (newValue) => {
    setFunding(newValue);
    console.log("Funding selected:", newValue); // Debugging the selected funding
  };
  const clientInput = (selectedValue) =>{
    setOrgClient(selectedValue)
    console.log("Selected Client:", selectedValue);
  }
  const privacyInput =(newValue) => {
    setOrgPrivacyInput(newValue)
  }
  const certificationsInput=(newValue) => {
    setOrgCertifications(newValue)
    
  }
      // Handle file upload
      const handleIndividualFileUpload = (file) => {
        setUploadedFile(file); // Store file in state
      };
    
      // Handle file removal
      const handleIndividualFileRemove = () => {
        setUploadedFile(null); // Clear the file
      };
  ////////////////// SIGN IN VALUES
  const orgEmailInput1 = (e) => {
    setOrgEmail(e.target.value);
  };
  const passwordInput1 = (e) => {
    setOrgPassword1(e.target.value);
  };

  ////////////////// GOOGLE ORG SIGNUP /////////////////////////////////
  const googleOrgSignup = useGoogleLogin({
    onSuccess: async (response) => {
      if (!response?.access_token) {
        toast.error("Google authentication failed. Please try again.");
        return;
      }
  
      setLoadingGoogle(true);
      toast.info("Processing your signup...");
  
      try {
        // Fetch Google user info
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });
  
        if (res.status !== 200) throw new Error("Failed to retrieve Google user info.");
  
        // ✅ Send user info to your backend
        const apiResponse = await axios.post(
          "https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api",
          { email: res.data?.email, method: "google_auth" }
        );
  
        switch (apiResponse.status) {
          case 201: // ✅ Signup successful
            setCurrentSlide("org-signup-success");
            toast.success(apiResponse.data.message || "Signup successful!");
  
            // Store Org ID
            if (apiResponse.data.org_id) {
              localStorage.setItem("orgId", apiResponse.data.org_id);
            }
  
            // ✅ Store tokens
            apiResponse.data.access_token && localStorage.setItem("access_token", apiResponse.data.access_token);
            apiResponse.data.refresh_token && localStorage.setItem("refresh_token", apiResponse.data.refresh_token);
  
            // Store User Details
            dispatch(
              updateGoogleUserDetails({
                email: res.data?.email,
                username: res.data?.name,
                picture: res.data?.picture,
                id: res.data?.sub,
              })
            );
            break;
  
          case 400: // ❌ Bad request (User might already exist)
            toast.warn("Signup failed, please try again.");
            setCurrentSlide("signing");
            break;
  
          case 200: // 🟡 Edge case - already signed up?
            toast.info( "Already signed up?");
            setCurrentSlide("signing");
            break;
  
          default: // ❌ Any other unexpected response
            toast.error("An unexpected error occurred.");
            setCurrentSlide("signing");
            break;
        }
      } catch (err) {
        console.error(err);
        setCurrentSlide("signing");
  
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message || "Something went wrong. Please try again.");
        }
      } finally {
        setLoadingGoogle(false);
      }
    },
  });
  
  

  ////////////////// GOOGLE ORG SIGNIN /////////////////////////////////
  const googleOrgSignin = useGoogleLogin({
    onSuccess: async (response) => {
      if (!response?.access_token) {
        toast.error("Google authentication failed. Please try again.");
        return;
      }
  
      setLoadingGoogle(true);
      toast("Signing in...");
  
      try {
        // Fetch Google user info
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });

        if (res.status !== 200) throw new Error("Failed to retrieve Google user info.");
  
        // Sign in to your API
        const apiResponse = await axios.post(
          "https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api",
          { email: res.data?.email, method: "google_auth" }
        );
  
        switch (apiResponse.status) {
          case 200:
            // ✅ Store tokens if provided
            apiResponse.data.access_token && localStorage.setItem("access_token", apiResponse.data.access_token);
            apiResponse.data.refresh_token && localStorage.setItem("refresh_token", apiResponse.data.refresh_token);
            let orgType = apiResponse.data.org_id ? "organization" : "user"; // If id exists, it's a organization; otherwise, it's an user
            // Store user type in localStorage
            localStorage.setItem("orgType", orgType);
            const entityId = apiResponse.data.org_id;
localStorage.setItem("entityId", entityId);
                      // Fetch full name if user
                      if (orgType === "organization") {
                        const orgId = apiResponse.data.org_id;
                
                        try {
                          const profileResponse = await axios.get(
                            `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api?org_id=${orgId}`
                          );
                          console.log("✅ Profile data:", profileResponse.data); // <-- Add this line
                          const organization_email = profileResponse.data?.organization_email || "Example@gmail.com"
                          localStorage.setItem("orgEmail", organization_email);
                          const orgName = profileResponse.data?.organization_name || "No name inputed";
                          const poc = profileResponse.data?.poc || "No Name"
                          localStorage.setItem("poc", poc)
                
                          localStorage.setItem("orgName", orgName);
                        } catch (profileErr) {
                          console.error("Failed to fetch org profile:", profileErr);
                        }
                      }
  
            setCurrentSlide("org-signin-success");
            toast.success("Signin successful!");
  
            // Store User Details
            dispatch(
              updateGoogleUserDetails({
                email: res.data?.email,
                username: res.data?.name,
                picture: res.data?.picture,
                id: res.data?.sub,
              })
            );
  
            // ✅ Validate access token after signin
            setTimeout(() => {
              checkAccessToken();
            }, 100);
            break;
  
          case 404:
            toast.warn("Organization not registered. Please Sign up.");
            setCurrentSlide("signing"); // Redirect to signup slide
            break;
  
          default:
            toast.error("An unexpected error occurred. Please try again.");
            break;
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      } finally {
        setLoadingGoogle(false);
      }
    },
  });
  
  
  
  

  //////////////// ORGANIZATION SIGNUP /////////////////////////////////
  //----- authenticate email
const signing = async () => {
    const emailInputValidation = validateEmailInput(email);
    const passwordInputValidation = validatePasswordInput(orgPassword);
    try {
        if (emailInputValidation) {
            setSignupEmailError(emailInputValidation);
            return;
        }
        if (passwordInputValidation) {
            setSignupPasswordError(passwordInputValidation);
            return;
        }
        setLoading(true);

        // Check if the email is valid (Commented out for now)
        // const check_legit_email = await axios.get(
        //     `https://emailvalidation.abstractapi.com/v1/?api_key=${emailKey}&email=${email}`
        // );
        // if (check_legit_email.data.is_valid_format.value === false) {
        //     toast("Email format unacceptable");
        //     return;
        // }
        // if (
        //     check_legit_email.data.is_smtp_valid.value === false &&
        //     check_legit_email.data.deliverability === "UNDELIVERABLE"
        // ) {
        //     toast("Email broken, try another");
        //     return;
        // }

        // Check if email exists
        const check_available_email = await axios.get(
            `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api?email=${email}&action=check_email`
        );
        if (
            check_available_email.status === 200 &&
            check_available_email.data.exists === "yes"
        ) {
            toast("Email already in use");
            return;
        }

        // If email doesn't exist, send OTP verification
        if (
            check_available_email.status === 200 &&
            check_available_email.data.exists === "no"
        ) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", orgPassword);
            const send_otp = await axios.post(
                `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`,
                { email: localStorage.getItem("email") }
            );
            if (send_otp.status === 200) {
                setCurrentSlide("email-verify");
                toast("OTP sent to email");
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

  
  const handleSignup = async () => {
    signing();
  };
  
  const verifying = async () => {
    try {
      setLoading(true);
      // Verify OTP
      const verify_otp = await axios.get(
        `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp?email=${localStorage.getItem(
          "email"
        )}&otp=${value}`
      );
      if (verify_otp.status === 200) {
        setOtpError(false);
  
        // OTP valid, proceed with org sign-up
        const acceptEmailPassword = await axios.post(
          `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api`,
          {
            email: localStorage.getItem("email"),
            method: "sign_up",
            password: localStorage.getItem("password"),
          }
        );
  
        // Handle response based on status
        if (acceptEmailPassword.status === 201) {
          setLoading(false);
          toast(acceptEmailPassword.data.message);
          setCurrentSlide("org-signup-success");
          console.log(acceptEmailPassword.data)
  
          // Store org details and tokens in localStorage
          localStorage.setItem("orgId", acceptEmailPassword.data.org_id);
          localStorage.setItem("entityId", acceptEmailPassword.date.org_id)
          localStorage.setItem("access_token", acceptEmailPassword.data.access_token); // Save access token
          localStorage.setItem("refresh_token", acceptEmailPassword.data.refresh_token); // Save refresh token

        }
        if (acceptEmailPassword.status === 409) {
          setCurrentSlide("signing");
          toast("Email already exists");
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


  ////////////////// ORGANIZATION SIGN IN /////////////////////////////
  const checkAccessToken = async () => {
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
  const refreshAccessToken = async () => {
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
    window.location.href = "/auth/organization"// Redirect to login page
  };
  const organizationSignin = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!orgEmail || !orgPassword1) {
        toast.error("All input fields are required!");
        return;
      }
  
      setLoading(true);
      setCurrentSlide("org-signin-loading");
  
      const response = await axios.post(
        `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api`,
        {
          email: orgEmail,
          password: orgPassword1,
        }
      );
  
      console.log("Full response from API:", response);
      console.log("Response data:", response.data);
  
      if (response.status === 200) {
        if (response.data.access_token) {
          localStorage.setItem("access_token", response.data.access_token);
        } else {
          toast.warning("No access token received.");
        }
  
        if (response.data.refresh_token) {
          localStorage.setItem("refresh_token", response.data.refresh_token);
        } else {
          toast.warning("No refresh token received.");
        }
  
        let orgType = response.data.org_id ? "organization" : "user";
        localStorage.setItem("orgType", orgType);
  
        const entityId = response.data.org_id;
        localStorage.setItem("entityId", entityId);
  
        if (orgType === "organization") {
          const orgId = response.data.org_id;
  
          try {
            const profileResponse = await axios.get(
              `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api?org_id=${orgId}`
            );
  
            const organization_email = profileResponse.data?.organization_email || "Example@gmail.com";
            localStorage.setItem("orgEmail", organization_email);
  
            const orgName = profileResponse.data?.organization_name || "No name provided";
            localStorage.setItem("orgName", orgName);
  
            const poc = profileResponse.data?.poc || "No Name";
            localStorage.setItem("poc", poc);
          } catch (profileErr) {
            console.error("Failed to fetch org profile:", profileErr);
            toast.error("Failed to fetch organization profile.");
          }
        }
  
        setCurrentSlide("org-signin-success");
        toast.success("Sign-in successful!");
  
        setTimeout(() => {
          checkAccessToken();
        }, 10000);
      } else if (response.status === 404) {
        setCurrentSlide("signing");
        toast.error("Organization not found. Try Forgot Password if password is forgotten");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setCurrentSlide("signing");
  
      if (error.response?.data?.message) {
        toast.error("Organization not registered.");
      } else if (error.message.includes("Network Error")) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleOrgSignin = async () => {
    organizationSignin();
  };
  useEffect(() => {
    console.log("Current Slide:", currentSlide);
  }, [currentSlide]);
  

  ////////////// ORG FORGOT PASSWORD /////////////////
  const forgotPassword = async () => {
    if (!forgotEmail) {
      toast.warn("Provide email address");
      return;
    }
  
    try {
      setLoading(true);
  
      // 1️⃣ Check if email exists in the database
      const checkEmailResponse = await axios.get(
        `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api?email=${forgotEmail}&action=check_email`
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
        toast("OTP sent to email");
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
  
  const handleOrgForgotPassword = async () => {
    forgotPassword();
  };

  ////////////// ORG RESEND OTP /////////////////
  const resendOtp = async () => {
    try {
      setLoading(true);
      const resend_otp = await axios.post(
        `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`,
        {
          email: localStorage.getItem("email"),
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
  const handleOrgResendOtp = async () => {
    resendOtp();
  };

  ////////////// FORGOT PASSWORD ORG RESEND OTP /////////////////
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

  ////////////// HANDLE CURRENT SLIDE ////////////////////////
  const handleCurrentSlide = () => {
    if (currentSlide === "signing") {
      return (
        <Signing
          passwordInput={passwordInput}
          emailInput={emailInput}
          handleSignup={handleSignup}
          signupEmailError={signupEmailError}
          signupPasswordError={signupPasswordError}
          // referralInput={referralInput}
          ////////////////////////////////////////////////
          handleOrgSignin={handleOrgSignin}
          orgEmailInput1={orgEmailInput1}
          passwordInput1={passwordInput1}
          googleOrgSignup={googleOrgSignup}
          googleOrgSignin={googleOrgSignin}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          allowed={allowed}
          border={border}
          loading={loading}
          loadingGoogle={loadingGoogle}
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
          handleOrgResendOtp={handleOrgResendOtp}
        />
      );
    } else if (currentSlide === "org-signup-loading") {
      return <OrgLoading />;
    } else if (currentSlide === "org-signin-loading") {
      return <OrgSigninLoading />;
    } else if (currentSlide === "org-signup-success") {
      return <SignupSuccess setCurrentSlide={setCurrentSlide} />;
    } else if (currentSlide === "org-signin-success") {
      return <SigninSuccess setCurrentSlide={setCurrentSlide}  />;
    } else if (currentSlide === "org-upload-details") {
      return <OrgUploadDetails/>;
    } else if (currentSlide === "forgot-password-home") {
      return (
        <ForgotPassword
          loading={loading}
          setCurrentSlide={setCurrentSlide}
          setForgotEmail={setForgotEmail}
          handleOrgForgotPassword={handleOrgForgotPassword}
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
          passwordInput={passwordInput}
          emailInput={emailInput}
          handleSignup={handleSignup}
          signupEmailError={signupEmailError}
          signupPasswordError={signupPasswordError}
          // referralInput={referralInput}
          ////////////////////////////////////////////////
          handleOrgSignin={handleOrgSignin}
          orgEmailInput1={orgEmailInput1}
          passwordInput1={passwordInput1}
          googleOrgSignup={googleOrgSignup}
          googleOrgSignin={googleOrgSignin}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          allowed={allowed}
          border={border}
          loading={loading}
          loadingGoogle={loadingGoogle}
          setCurrentSlide={setCurrentSlide}
        />
      );
  };
  return handleCurrentSlide();
  // return <SigninSuccess />;
  // return (
  //   <EmailVerify
  //     value={value}
  //     setValue={setValue}
  //     loading={loading}
  //     otpError={otpError}
  //     mins={mins}
  //     secs={secs}
  //     handleOrgResendOtp={handleOrgResendOtp}
  //   />
  // );
}
export default Container;
