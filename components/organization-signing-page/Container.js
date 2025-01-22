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
import Cookies from "js-cookie";
import OperationalDetails from "./OperationalDetails";
import OrgUploadLoading from "./OrgUploadLoading";
import OrgUploadSuccess from "./OrgUploadSuccess";
import OrgUploadDetails from "./OrgUploadDetails";
import React from "react";
import ForgotPassword from "./ForgotPasswordHome";
import VerifyEmailAuthentication from "./ResetVerifyOTP";
import ResetPassword from "./ResetPasswordHome";
import PasswordChanged from "./PasswordChangedHome";

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
  const [orgTwitter, setOrgTwitter] = useState("");
  const [orgLinkedin, setOrgLinkedin] = useState("");
  const [orgPoc, setOrgPoc] = useState("");
  const [orgLogo, setOrgLogo] = useState("");
  const [orgAudience, setOrgAudience] = useState("");
  const [orgService, setOrgService] = useState("");
  const [orgTechUsed, setOrgTechUsed] = useState("");
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
    formatTime();
  }, [timeLeft]);

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
  const industryInput = (e) => {
    setOrgIndustry(e.target.value);
    console.log(orgIndustry);
  };
  const locationInput = (e) => {
    setOrgLocation(e.target.value);
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
  const serviceInput = (e) => {
    setOrgService(e.target.value);
  };
  const techUsedInput = (e) => {
    setOrgTechUsed(e.target.value);
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
            `https://cc7zo6pwqb.execute-api.ap-southeast-2.amazonaws.com/default/voyex_orgV2`,
            {
              email: res.data?.email,
              method: "sign_up",
              password: res.data?.sub,
            }
          );
          console.log("response", response);
          if (response.status === 201) {
            setCurrentSlide("org-signup-success");
            toast.success(response.data.message);
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
            toast.error(response.data.message);
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
          toast.warn(err.response.data.message);
        } else toast.warn(err.message);
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
            `https://cc7zo6pwqb.execute-api.ap-southeast-2.amazonaws.com/default/voyex_orgV2`,
            {
              email: res.data?.email,
              password: res.data?.sub,
            }
          );
          // console.log("response", response);
          if (response.status === 200) {
            setCurrentSlide("org-signin-success");
            toast.success("Signin successful");
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
          toast.warn(err.response.data.message);
        } else toast.warn(err.message);
      } finally {
        setLoadingGoogle(false);
      }
    },
  });

  //////////////// ORGANIZATION SIGNUP /////////////////////////////////
  //----- authenticate email
  const signing = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!email || !orgPassword) {
        toast.warn("all fields are required");
        return;
      }

      if (!passwordRegex.test(orgPassword)) {
        toast(
          "Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!"
        );
        return;
      }
      setLoading(true);
      /////////////// check if email is legit //////////////////
      const check_legit_email = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${emailKey}&email=${email}`
      );
      console.log(check_legit_email.data);
      if (check_legit_email.data.is_valid_format.value === false) {
        toast.warn("Email format unacceptable");
        return;
      }
      if (
        check_legit_email.data.is_smtp_valid.value === false &&
        check_legit_email.data.deliverability === "UNDELIVERABLE"
      ) {
        toast.warn("Email broken, try another");
        return;
      }
      if (
        check_legit_email.data.is_smtp_valid.value === true &&
        check_legit_email.data.is_valid_format.value === true
      ) {
        ///////////// check if email is taken /////////////////////
        const check_available_email = await axios.get(
          `https://cc7zo6pwqb.execute-api.ap-southeast-2.amazonaws.com/default/voyex_orgV2?email=${email}&action=check_email`
        );
        /////////// if email exists, return/stop
        if (
          check_available_email.status === 200 &&
          check_available_email.data.exists === "yes"
        ) {
          toast("Email already in use");
          return;
        }
        /////////////// if email doesn't exist in database, send otp verification
        if (
          check_available_email.status === 200 &&
          check_available_email.data.exists === "no"
        ) {
          // toast.success("Name available");
          localStorage.setItem("email", email);
          localStorage.setItem("password", orgPassword);
          const send_otp = await axios.post(
            `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`,
            {
              email: localStorage.getItem("email"),
            }
          );
          console.log("OTP response", send_otp);
          if (send_otp.status === 200) {
            setCurrentSlide("email-verify");
            // toast(send_otp.data.message)
            toast("OTP sent to email");
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data) {
        toast.error(error.response.data);
      } else toast.error(error.message);
      if (error.message) {
        setCurrentSlide("signing");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async () => {
    signing();
  };
  //----- verify email, then signup
  const verifying = async () => {
    try {
      setLoading(true);
      /////////////// check if otp is legit from email //////////////////
      const verify_otp = await axios.get(
        `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp?email=${localStorage.getItem(
          "email"
        )}&otp=${value}`
      );
      console.log("OTP Verifying⛔⛔⛔", verify_otp);
      if (verify_otp.status === 200) {
        setOtpError(false);
        //////// OTP valid? accept org /////////////////
        const acceptEmailPassword = await axios.post(
          `https://cc7zo6pwqb.execute-api.ap-southeast-2.amazonaws.com/default/voyex_orgV2`,
          {
            email: localStorage.getItem("email"),
            method: "sign_up",
            password: localStorage.getItem("password"),
          }
        );
        console.log("sign up res👉", acceptEmailPassword);
        if (acceptEmailPassword.status === 201) {
          setLoading(false);
          toast.success(acceptEmailPassword.data.message);
          setCurrentSlide("org-signup-success");
          localStorage.setItem("orgId", acceptEmailPassword.data.org_id);
        }
        // if (
        //   acceptEmailPassword.status === 200 &&
        //   acceptEmailPassword.data.message === "Organization already exists"
        // ) {
        //   toast.warn(acceptEmailPassword.data.message);
        //   setCurrentSlide("signing");
        // }
        if (acceptEmailPassword.status === 409) {
          setCurrentSlide("signing");
        }
      }
    } catch (error) {
      console.log(error);
      setOtpError(true);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else toast.error(error.message);
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
      toast.error("complete all fields!!!");
      return;
    } else setCurrentSlide("contact-details");
  };
  const handleContactDetailsSlide = () => {
    if (!orgPoc || !orgTwitter || !orgLinkedin) {
      toast.error("complete all fields!!!");
      return;
    } else setCurrentSlide("operational-details");
  };
  const uploadDetails = async () => {
    try {
      if (!orgAudience || !orgTechUsed || !orgService) {
        toast.error("complete all fields!!!");
        return;
      }
      setLoading(true);
      setCurrentSlide("org-upload-loading");
      const response = await axios.put(
        `https://cc7zo6pwqb.execute-api.ap-southeast-2.amazonaws.com/default/voyex_orgV2`,
        {
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
            target_auience: orgAudience,
            service_offered: orgService,
            tech_used: orgTechUsed,
          },
        }
      );
      // console.log("response", response);
      if (response.status === 200) {
        toast.success(response.data);
        setCurrentSlide("org-upload-success");
      }
      if (response.status !== 200) {
        setCurrentSlide("signing");
      }
    } catch (error) {
      // console.log(error);
      if (error.response?.data) {
        toast.error(error.response.data);
      } else toast.error(error.message);
      if (error.message) {
        setCurrentSlide("signing");
      }
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
  const organizationSignin = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!orgEmail || !orgPassword1) {
        toast.error("All input fields required!");
        return;
      }
      setLoading(true);
      setCurrentSlide("org-signin-loading");
      const response = await axios.post(
        `https://cc7zo6pwqb.execute-api.ap-southeast-2.amazonaws.com/default/voyex_orgV2`,
        {
          email: orgEmail,
          password: orgPassword1,
        }
      );
      // console.log("org signin response", response);
      if (response.status === 200) {
        setCurrentSlide("org-signin-success");
        toast.success("Signin successful");
        Cookies.set("voyexEmail", orgEmail, { expires: 7 });
      }
      if (response.status === 404) {
        setCurrentSlide("signing");
        return;
      }
    } catch (error) {
      // console.log(error);
      if (error.response.data) {
        toast.error(error.response.data.message);
        setCurrentSlide("signing");
      } else toast.error(error.message);
      if (error.message.includes("Network Error")) {
        toast.error("Network Error, Try again!");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleOrgSignin = async () => {
    organizationSignin();
  };

  ////////////// HANDLE CURRENT SLIDE ////////////////////////
  const handleCurrentSlide = () => {
    if (currentSlide === "signing") {
      return (
        <Signing
          passwordInput={passwordInput}
          emailInput={emailInput}
          handleSignup={handleSignup}
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
          setOrgIndustry={setOrgIndustry}
          locationInput={locationInput}
          handleBasicInfoSlide={handleBasicInfoSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
        />
      );
    } else if (currentSlide === "contact-details") {
      return (
        <ContactDetailsContainer
          pocInput={pocInput}
          twitterInput={twitterInput}
          linkedinInput={linkedinInput}
          handleContactDetailsSlide={handleContactDetailsSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
        />
      );
    } else if (currentSlide === "operational-details") {
      return (
        <OperationalDetails
          setOrgAudience={setOrgAudience}
          serviceInput={serviceInput}
          techUsedInput={techUsedInput}
          loading={loading}
          handleUploadDetails={handleUploadDetails}
          setCurrentSlide={setCurrentSlide}
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
          // formatTime={formatTime}
          mins={mins}
          secs={secs}
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
    } else if (currentSlide === "forgot-password-home"){
      return (
        <ForgotPassword
        setCurrentSlide={setCurrentSlide}
        setEmailAddress={setEmailAddress}
        />
      );
    } else if (currentSlide === "reset-verifyotp"){
      return (
      <VerifyEmailAuthentication
      setCurrentSlide={setCurrentSlide}
      emailAddress={emailAddress}
      />);
    } else if (currentSlide === "reset-password"){
      return (<ResetPassword
        setCurrentSlide={setCurrentSlide}/>
      );
    } else if (currentSlide === "password-changed"){
      return (<PasswordChanged
        setCurrentSlide={setCurrentSlide}/>
      );
    } else
      return (
        <Signing
          passwordInput={passwordInput}
          emailInput={emailInput}
          handleSignup={handleSignup}
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
  // return (
  //   <EmailVerify
  //     value={value}
  //     setValue={setValue}
  //     loading={loading}
  //     otpError={otpError}
  //     // formatTime={formatTime}
  //     mins={mins}
  //     secs={secs}
  //   />
  // );
}
export default Container;
