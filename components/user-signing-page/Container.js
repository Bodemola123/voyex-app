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
            toast.success(response.data.message);
          }
          if (response.status === 400) {
            setCurrentSlide("signing");
            toast.error(response.data?.error);
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
          // toast.success("Login Sucessfull");
        }
      } catch (err) {
        console.log(err);
        if (err.response.data?.error) {
          toast.error(err.response.data.error);
        } else toast.error(err.message);
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
            toast.success("Login successful");
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
          // toast.success("Login Sucessfull");
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
        toast.warn("all fields are required");
        return;
      }

      if (!passwordRegex.test(userPassword)) {
        toast(
          "Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!"
        );
        return;
      }
      setLoading(true);
      /////////////// check if email is legit //////////////////
      const check_legit_email = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${emailKey}&email=${userEmail}`
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
        ///////////// check if email is taken /////////////////////
        const check_available_email = await axios.get(
          `https://ek251cvxyd.execute-api.eu-north-1.amazonaws.com/default/users_voyex?email=${userEmail}`
        );
        /////////// if email exists, return/stop
        if (
          check_available_email.status === 200 &&
          check_available_email.data.exists === true
        ) {
          toast.warn("email already in use");
          return;
        }
        /////////////// if email doesn't exist in database, send otp verification
        if (
          check_available_email.status === 200 &&
          check_available_email.data.exists === false
        ) {
          // toast.success("Name available");
          localStorage.setItem("user_email", userEmail);
          localStorage.setItem("user_password", userPassword);
          const send_otp = await axios.post(
            `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp`,
            {
              email: localStorage.getItem("user_email"),
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
          `https://ek251cvxyd.execute-api.eu-north-1.amazonaws.com/default/users_voyex`,
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
          toast.success(acceptEmailPassword.data.message);
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

  ////////////////// USER SIGN IN /////////////////////////////////
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
        `https://ek251cvxyd.execute-api.eu-north-1.amazonaws.com/default/users_voyex`,
        {
          email: emailAddress,
          password: userPassword1,
          action: "sign_in",
        }
      );
      console.log("user signin response", response);
      if (response.status === 200 && response.data.valid === false) {
        setCurrentSlide("signing");
        toast.error("user not found");
      }
      if (response.status === 200 && response.data.valid === true) {
        setCurrentSlide("user-signin-success");
        toast.success("signin successful");
        // Cookies.set("voyexEmail", orgEmail, { expires: 7 });
      }
      if (response.status === 404) {
        setCurrentSlide("signing");
        return;
      }
    } catch (error) {
      console.log("user_signin_error", error);
      if (error.response.data) {
        toast.error(error.response.data.message);
        setCurrentSlide("signing");
      } else toast.error(error.message);
      if (error.message.includes("network error")) {
        toast.error("network error, try again!");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleUserSignin = async () => {
    userSignin();
  };

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
        />
      );
    } else if (currentSlide === "user-signin-loading") {
      return <SigninLoading />;
    } else if (currentSlide === "user-signup-loading") {
      return <SignupLoading />;
    } else if (currentSlide === "user-signup-success") {
      return <SignupAccountSuccess />;
    } else if (currentSlide === "user-signin-success") {
      return <SigninAccountSuccess />;
    } else if (currentSlide === "user-upload-details") {
      return <UserUploadDetails />;
    } else if (currentSlide === "forgot-password-home") {
      return (
        <ForgotPassword
          setCurrentSlide={setCurrentSlide}
          setEmailAddress={setEmailAddress}
        />
      );
    } else if (currentSlide === "reset-verifyotp") {
      return (
        <VerifyEmailAuthentication
          setCurrentSlide={setCurrentSlide}
          emailAddress={emailAddress}
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
  // return <UserUploadDetails />;
}
export default Container;
