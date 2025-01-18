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

function Container() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { googleUserDetails } = useSelector((state) => state.auth);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [userName1, setUserName1] = useState("");
  const [userPassword1, setUserPassword1] = useState("");

  const [border, setBorder] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("signing");
  const debouncedValue = useDebounce(userName, 500);

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
  const usernameInput1 = (e) => {
    setUserName1(e.target.value);
  };
  const passwordInput1 = (e) => {
    setUserPassword1(e.target.value);
  };

  ///////////// CHECK USER NAME //////////////////////
  useEffect(() => {
    if (userName === "") {
      return;
    }
    if (userName.includes("@gmail") || userName.includes("@yahoo")) {
      setBorder(false);
      return;
    } else {
      const checkUserName = async () => {
        try {
          const response = await axios.get(
            `https://rsblupwp0e.execute-api.ap-southeast-2.amazonaws.com/default/voyexUsers?user_name=${debouncedValue}`
          );
          console.log("checked name:", response);
          if (response.status === 200 && response.data.exists === true) {
            // toast.error("Name taken");
            setMessage("username is taken");
            setBorder(false);
            return;
          }
          if (response.status === 200 && response.data.exists === false) {
            // toast.success("Name available");
            if (userName === "" || userName.length < 3) {
              setBorder(false);
            } else {
              setBorder(true);
              setMessage("username is available");
            }
          }
        } catch (error) {
          if (error.response?.data) {
            toast.error(error.response.data);
          } else toast.error(error.message);
        }
      };
      checkUserName();
    }
    // input finall order
  }, [debouncedValue, userName]);

  ////////////////// GOOGLE USER SIGNUP /////////////////////////////////
  const googleUserSignup = useGoogleLogin({
    onSuccess: async (response) => {
      setLoading(true);
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
            `https://rsblupwp0e.execute-api.ap-southeast-2.amazonaws.com/default/voyexUsers`,
            {
              email: res.data?.email,
              user_name: res.data?.name,
              country: "nil",
              user_type: "regular",
              subscription_type: "free",
              google_id: res.data?.sub,
              metadata: {},
              password_hash: res.data?.sub,
            }
          );
          console.log("response", response);
          if (response.status === 201) {
            setCurrentSlide("signup-success");
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
        setLoading(false);
      }
    },
  });

  ////////////////// GOOGLE USER SIGNIN /////////////////////////////////
  const googleUserSignin = useGoogleLogin({
    onSuccess: async (response) => {
      setLoading(true);
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
          const response = await axios.get(
            `https://rsblupwp0e.execute-api.ap-southeast-2.amazonaws.com/default/voyexUsers?user_name=${res.data.name}`
          );
          console.log("response", response);
          if (response.status === 200 && response.data.exists === true) {
            setCurrentSlide("signin-success");
            toast.success("Login successful");
            Cookies.set("voyexUserName", res.data.name, { expires: 7 });
          }
          if (response.status === 200 && response.data.exists === false) {
            toast.error("Wrong credentials, user doesn't exist!");
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
        if (err.response?.data?.error) {
          toast.error(err.response.data.error);
        } else toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  ////////////////// USER SIGN UP /////////////////////////////////
  const userSignup = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!userName || !userPassword || !userEmail || !userCountry) {
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
      setCurrentSlide("signup-loading");
      const response = await axios.post(
        `https://rsblupwp0e.execute-api.ap-southeast-2.amazonaws.com/default/voyexUsers`,
        {
          email: userEmail,
          user_name: userName,
          country: userCountry,
          user_type: "regular",
          subscription_type: "free",
          // google_id: "google13",
          metadata: {},
          password_hash: userPassword,
        }
      );
      console.log("response", response);
      if (response.status === 201) {
        setCurrentSlide("signup-success");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data?.error) {
        setCurrentSlide("basic-info");
        return toast.error(error.response.data.error);
      } else return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (border === true && userName.length > 2) {
      setAllowed(true);
    } else if (border === true && !userName) {
      setAllowed(false);
    } else {
      setAllowed(false);
    }
  }, [border, userName]);

  const handleUserSignup = async () => {
    allowed && userSignup();
  };

  ////////////////// USER SIGN IN /////////////////////////////////
  const userSignin = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!userName1) {
        toast.error("username required!");
        return;
      }
      setLoading(true);
      setCurrentSlide("signin-loading");
      const response = await axios.get(
        `https://rsblupwp0e.execute-api.ap-southeast-2.amazonaws.com/default/voyexUsers?user_name=${userName1}`
      );
      console.log("response", response);
      if (response.status === 200 && response.data.exists === true) {
        setCurrentSlide("signin-success");
        toast.success("Login successful");
        Cookies.set("voyexUserName", userName1, { expires: 7 });
      }
      if (response.status === 200 && response.data.exists === false) {
        toast.error("Wrong credentials, user doesn't exist!");
        setCurrentSlide("basic-info");
        return;
      }
    } catch (error) {
      // console.log(error);
      if (error.message.includes("Network Error")) {
        toast.error("Network Error, Try again!");
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
          usernameInput={usernameInput}
          passwordInput={passwordInput}
          showPassword={showPassword}
          border={border}
          allowed={allowed}
          setShowPassword={setShowPassword}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          message={message}
          /////////////////
          handleUserSignin={handleUserSignin}
          usernameInput1={usernameInput1}
          passwordInput1={passwordInput1}
          googleUserSignup={googleUserSignup}
          googleUserSignin={googleUserSignin}
          loading={loading}
        />
      );
    } else if (currentSlide === "basic-info") {
      return (
        <BasicInfoContainer
          handleUserSignup={handleUserSignup}
          emailInput={emailInput}
          countryInput={countryInput}
          setCurrentSlide={setCurrentSlide}
        />
      );
    } else if (currentSlide === "verify") {
      return <EmailVerify />;
    } else if (currentSlide === "signin-loading") {
      return <SigninLoading />;
    } else if (currentSlide === "signup-loading") {
      return <SignupLoading />;
    } else if (currentSlide === "signup-success") {
      return <SignupAccountSuccess />;
    } else if (currentSlide === "signin-success") {
      return <SigninAccountSuccess />;
    } else
      return (
        <Signing
          usernameInput={usernameInput}
          passwordInput={passwordInput}
          showPassword={showPassword}
          border={border}
          allowed={allowed}
          setShowPassword={setShowPassword}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          message={message}
          /////////////////
          handleUserSignin={handleUserSignin}
          usernameInput1={usernameInput1}
          passwordInput1={passwordInput1}
          googleUserSignup={googleUserSignup}
          googleUserSignin={googleUserSignin}
          loading={loading}
        />
      );
  };
  return handleCurrentSlide();
}
export default Container;
