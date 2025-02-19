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
import BasicInfoContainer from "./BasicInfoContainer";
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

const emailKey = process.env.EMAIL_KEY;

function Container() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { googleUserDetails } = useSelector((state) => state.auth);
  // console.log("localStorage", localStorage.getItem("orgId"));
  ///////////////////// SIGN UP INPUTS
  const [email, setEmail] = useState("");
  const [orgPassword, setOrgPassword] = useState("");
  const [value, setValue] = useState("");
  const [orgname, setOrgname] = useState("");
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
      toast("redirecting to /search");
      setTimeout(() => {
        router.push("/search");
      }, 5500);
    }
  }, [router, googleUserDetails]);

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
    setOrgLocation(selectedLocation); // Update state with the selected location
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
        // console.log(res.data);
        if (res.status === 200) {
          const response = await axios.post(
            `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api`,
            {
              email: res.data?.email,
              method: "sign_up",
              password: res.data?.sub,
            }
          );
          console.log("response", response);
          if (response.status === 201) {
            setCurrentSlide("org-signup-success");
            toast(response.data.message);
            localStorage.setItem("orgId", response.data.org_id);
            dispatch(
              updateGoogleUserDetails({
                email: res.data?.email,
                username: res.data?.name,
                picture: res.data?.picture,
                id: res.data?.sub,
              })
            );
          }
          if (response.status === 200) {
            setCurrentSlide("signing");
            toast(response.data.message);
          }
          if (response.status === 400) {
            setCurrentSlide("signing");
          }
        }
      } catch (err) {
        console.log(err);
        if (err.message) {
          setCurrentSlide("signing");
        }
        if (err.response?.data?.message) {
          toast(err.response.data.message);
        } else toast(err.message);
      } finally {
        setLoadingGoogle(false);
      }
    },
  });

  ////////////////// GOOGLE ORG SIGNIN /////////////////////////////////
  const googleOrgSignin = useGoogleLogin({
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
        // console.log(res.data);
        if (res.status === 200) {
          const response = await axios.post(
            `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api`,
            {
              email: res.data?.email,
              password: res.data?.sub,
            }
          );
          // console.log("response", response);
          if (response.status === 200) {
            setCurrentSlide("org-signin-success");
            toast("Signin successful");
            dispatch(
              updateGoogleUserDetails({
                email: res.data?.email,
                username: res.data?.name,
                picture: res.data?.picture,
                id: res.data?.sub,
              })
            );
            Cookies.set("voyexEmail", orgEmail, { expires: 7 });
          }
          if (response.status === 404) {
            setCurrentSlide("signing");
            return;
          }
        }
      } catch (err) {
        console.log(err);
        if (err.response?.data?.message) {
          toast(err.response.data.message);
        } else toast(err.message);
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
      // Check if the email is valid
      const check_legit_email = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${emailKey}&email=${email}`
      );
      if (check_legit_email.data.is_valid_format.value === false) {
        toast("Email format unacceptable");
        return;
      }
      if (
        check_legit_email.data.is_smtp_valid.value === false &&
        check_legit_email.data.deliverability === "UNDELIVERABLE"
      ) {
        toast("Email broken, try another");
        return;
      }
  
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
  
          // Store org details and tokens in localStorage
          localStorage.setItem("orgId", acceptEmailPassword.data.org_id);
          localStorage.setItem("access_token", acceptEmailPassword.data.access_token); // Save access token
          localStorage.setItem("refresh_token", acceptEmailPassword.data.refresh_token); // Save refresh token
          // Optional: Refresh access token if needed
          await checkAccessToken();
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

  //////////////// ORGANIZATION UPLOAD DETAILS /////////////////////////////////
  const handleBasicInfoSlide = () => {
    if (!orgname || !orgWebsite || !orgIndustry || !orgLocation) {
      toast.warn("complete all fields!!!");
      return;
    } else setCurrentSlide("contact-details");
  };
  const handleContactDetailsSlide = () => {
    if (!orgEmail || !orgPcpName || !orgNumber || !orgTwitter) {
      toast.warn("complete all fields!!!");
      return;
    } else setCurrentSlide("operational-details");
  };
  const handleOperationDetailsSlide = () => {
    if (!orgAudience || !orgTechUsed || !orgService || !orgSpecialization) {
      toast.warn("Complete all fields!!!");
      return;
    } else setCurrentSlide("leadership-team");

  };
  const handleLeadershipAndTeamSlide = () => {
    if (!orgFounder || !orgCareerspage || !orgExco || !orgTeamsize){
      toast.warn("Complete all fields!!!");
      return;
    
    } else setCurrentSlide("financial-info");
    
  };
  const handleFinancialInformationSlide = () => {
    if (!orgClient || !orgFundingInfo || !orgRevenueMode){
      toast.warn("Complete all fields!!");
      return;

    } else setCurrentSlide("compliance-certification")
  };
  const uploadDetails = async () => {
    try {
      // Ensure all fields are filled
      if (!orgPrivacyInput || !orgCertifications || !uploadedFile) {
        toast.warn("Complete all fields!");
        return;
      }
  
      setLoading(true);
      setCurrentSlide("org-upload-loading");
  
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("access_token"); // Or `accessToken` based on your previous naming convention
  
      if (!accessToken) {
        toast.warn("Access token is missing. Please log in again.");
        setCurrentSlide("signing")
        return;
      }
  
      // Prepare the data for the PUT request
      const requestData = {
        org_id: Number(localStorage.getItem("orgId")),
        organization_name: orgname,
        industry: orgIndustry,
        location: orgLocation,
        website_url: orgWebsite,
        poc: orgPoc,
        logo_url: orgLogo,
        social_media: {
          twitter: orgTwitter,
          linkedin: orgLinkedin,
        },
        operational_details: {
          target_audience: orgAudience,
          service_offered: orgService,
          tech_used: orgTechUsed,
          specialization: orgSpecialization,
        },
        leadership_teams: {
          careers_page: orgCareerspage,
          team_size: orgTeamsize,
          founder: orgFounder,
          executives: orgExco,
        },
        financial_info: {
          mode_of_revenue: orgRevenueMode,
          funding_info: orgFundingInfo,
          clients: orgClient,
        }
      };
  
      // Make the PUT request to upload the organization details
      const response = await axios.put(
        `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include access token in Authorization header
          },
        }
      );
  
      // Handle response
      if (response.status === 200) {
        toast.success(response.data.message || "Organization details uploaded successfully!");
        setCurrentSlide("org-upload-success");
        router.push("/search");
      } else {
        setCurrentSlide("basic-info");
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      if (error.response?.data) {
        toast.error(error.response.data.message || error.response.data);
      } else {
        toast.error(error.message);
      }
      setCurrentSlide("basic-info");
    } finally {
      setLoading(false);

    }
  };
  
  useEffect(() => {
    if (border === true) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }, [border]);
  const handleUploadDetails = async () => {
    allowed && uploadDetails();
  };

  ////////////////// ORGANIZATION SIGN IN /////////////////////////////

// 2. Check Access Token Validity and Refresh If Expired
const checkAccessToken = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    // No token, user is not authenticated
    setCurrentSlide("signing");
  }

  try {
    const response = await axios.post(
      'https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api',  // Endpoint to validate access token
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
  const organizationSignin = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!orgEmail || !orgPassword1) {
        toast("All input fields required!");
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
      // console.log("org signin response", response);
      if (response.status === 200) {
                      // Successful sign-in, save tokens in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);  // If provided
        setCurrentSlide("org-signin-success");
        toast("Signin successful");

        // Cookies.set("voyexEmail", orgEmail, { expires: 7 });
        await checkAccessToken();
        router.push("/search");
      }
      if (response.status === 404) {
        setCurrentSlide("signing");
        return;
      }
    } catch (error) {
      // console.log(error);
      if (error.response.data) {
        toast(error.response.data.message);
        setCurrentSlide("signing");
      } else toast(error.message);
      if (error.message.includes("Network Error")) {
        toast("Network Error, Try again!");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleOrgSignin = async () => {
    organizationSignin();
  };

  ////////////// ORG FORGOT PASSWORD /////////////////
  const forgotPassword = async () => {
    if (!forgotEmail) {
      toast("provide email address");
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
        toast("invalid email format");
        return;
      }
      if (
        check_legit_email.data.is_smtp_valid.value === false &&
        check_legit_email.data.deliverability === "UNDELIVERABLE"
      ) {
        toast("email broken, try another");
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
    } else if (currentSlide === "basic-info") {
      return (
<BasicInfoContainer
  orgNameInput={orgNameInput}
  websiteInput={websiteInput}
  setOrgIndustry={setOrgIndustry}  // ✅ Corrected
  locationInput={locationInput}  // ✅ Corrected
  handleBasicInfoSlide={handleBasicInfoSlide}
  loading={loading}
/>
      );
    } else if (currentSlide === "contact-details") {
      return (
        <ContactDetailsContainer
          EmailInput={EmailInput}
          pcpName={pcpName}
          NumberInput={NumberInput}
          twitterInput={twitterInput}
          handleContactDetailsSlide={handleContactDetailsSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
          linkedinInput={linkedinInput}
        />
      );
    } else if (currentSlide === "operational-details") {
      return (
        <OperationalDetails
          setOrgAudience={setOrgAudience}
          serviceInput={serviceInput}
          techUsedInput={techUsedInput}
          loading={loading}
          handleOperationDetailsSlide={handleOperationDetailsSlide}
          setCurrentSlide={setCurrentSlide}
          setSpecialization={setSpecialization}
        />
      );
    } else if (currentSlide === "leadership-team") {
      return (
        <LeadershipAndTeam
        setCareerspage={setCareerspage}
        setTeamsize={setTeamsize}
        founderInput={founderInput}
        excoInput={excoInput}
        setCurrentSlide={setCurrentSlide}
        handleLeadershipAndTeamSlide={handleLeadershipAndTeamSlide}
        />
      );
    } else if (currentSlide === "financial-info") {
      return (
        <FinancialInformation
        handleFinancialInformationSlide={handleFinancialInformationSlide}
        revenueInput={revenueInput}
        fundingInput={fundingInput}
        clientInput={clientInput}
        setCurrentSlide={setCurrentSlide}

        />
      );
    } else if (currentSlide === "compliance-certification") {
      return (
        <ComplianceandCert
        privacyInput={privacyInput}
        certificationsInput={certificationsInput}
        loading={loading}
        currentSlide={currentSlide}
        uploadedFile={uploadedFile}
        handleUploadDetails={handleUploadDetails}
        setCurrentSlide={setCurrentSlide}
        handleIndividualFileUpload={handleIndividualFileUpload}
        handleIndividualFileRemove={handleIndividualFileRemove}

        />
      );
    } else if (currentSlide === "org-signup-loading") {
      return <OrgLoading />;
    } else if (currentSlide === "org-signin-loading") {
      return <OrgSigninLoading />;
    } else if (currentSlide === "org-upload-loading") {
      return <OrgUploadLoading />;
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
    } else if (currentSlide === "org-signup-success") {
      return <SignupSuccess setCurrentSlide={setCurrentSlide} />;
    } else if (currentSlide === "org-signin-success") {
      return <SigninSuccess />;
    } else if (currentSlide === "org-upload-details") {
      return <OrgUploadDetails />;
    } else if (currentSlide === "org-upload-success") {
      return <OrgUploadSuccess />;
    } else if (currentSlide === "error") {
      return <AccountError setCurrentSlide={setCurrentSlide} />;
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
