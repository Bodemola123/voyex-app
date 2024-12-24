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
import AccountSuccess from "./AccountSuccess";

function Container() {
  const router = useRouter();
  const { googleUserDetails } = useSelector((state) => state.auth);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const [userName1, setUserName1] = useState("");
  const [userPassword1, setUserPassword1] = useState("");

  const [currentSlide, setCurrentSlide] = useState("signing");

  useEffect(() => {
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

  const googleSignup = useGoogleLogin({
    onSuccess: async (response) => {
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
          dispatch(
            updateGoogleUserDetails({
              email: res.data?.email,
              username: res.data?.name,
              picture: res.data?.picture,
            })
          );
          router.push("/search");
          toast.success("Login Sucessfull");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  ////////////////// USER SIGN UP /////////////////////////////////
  const userSignup = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!userEmail || !userPassword) {
        toast.error("all fields are required");
        return;
      }

      if (!passwordRegex.test(userPassword)) {
        toast.error(
          "Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!"
        );
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `https://rsblupwp0e.execute-api.ap-southeast-2.amazonaws.com/default/voyexUsers`,
        {
          email: userEmail,
          user_name: userName,
          // country: userCountry,
          user_type: "regular",
          subscription_type: "free",
          // google_id: "google13",
          metadata: {},
          password_hash: userPassword,
        }
      );
      // console.log("response", response);
      if (response.status === 200) {
        setCurrentSlide("success");
        toast.success(response.data.message);
        return router.push("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data?.error) {
        return toast.error(error.response.data.error);
      } else return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUserSignup = async () => {
    userSignup();
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
      const response = await axios.get(
        `https://rsblupwp0e.execute-api.ap-southeast-2.amazonaws.com/default/voyexUsers?user_name=${userName1}`
      );
      console.log("response", response);
      if (response.status === 200 && response.data.exists === true) {
        toast.success("Login successful");
        Cookies.set("voyexUserName", userName1, { expires: 7 });
        return router.push("/search");
      }
      if (response.status === 200 && response.data.exists === false) {
        toast.error("Wrong credentials, user doesn't exist!");
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
          handleUserSignup={handleUserSignup}
          emailInput={emailInput}
          usernameInput={usernameInput}
          countryInput={countryInput}
          passwordInput={passwordInput}
          /////////////////
          handleUserSignin={handleUserSignin}
          usernameInput1={usernameInput1}
          passwordInput1={passwordInput1}
          googleSignup={googleSignup}
          loading={loading}
        />
      );
    } else if (currentSlide === "verify") {
      return <EmailVerify />;
    } else if (currentSlide === "success") {
      return <AccountSuccess />;
    } else
      return (
        <Signing
          handleUserSignup={handleUserSignup}
          emailInput={emailInput}
          usernameInput={usernameInput}
          countryInput={countryInput}
          passwordInput={passwordInput}
          /////////////////
          handleUserSignin={handleUserSignin}
          usernameInput1={usernameInput1}
          passwordInput1={passwordInput1}
          googleSignup={googleSignup}
          loading={loading}
        />
      );
  };
  return handleCurrentSlide();
}
export default Container;
