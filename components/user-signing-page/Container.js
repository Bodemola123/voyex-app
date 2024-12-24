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

  const signing = async () => {
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
          country: userCountry,
          user_type: "regular",
          subscription_type: "free",
          // google_id: "google13",
          metadata: {},
          password_hash: userPassword,
        }
      );
      // console.log("response", response);
      if (response.status === 200) {
        toast.success(response.data.message);
        return router.push("/login");
      }
    } catch (error) {
      // console.log(error);
      if (
        error.response.data.includes(
          "Error creating user: duplicate key value violates unique constraint"
        )
      ) {
        toast.error("User already exists");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async () => {
    signing();
  };
  return (
    <Signing
      handleSignup={handleSignup}
      emailInput={emailInput}
      usernameInput={usernameInput}
      countryInput={countryInput}
      passwordInput={passwordInput}
      googleSignup={googleSignup}
      loading={loading}
    />
    // <EmailVerify />
    // <AccountSuccess />
  );
}
export default Container;
