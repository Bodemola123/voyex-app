"use client";

import Form from "./Form";
import ImageSide from "./ImageSide";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { updateGoogleUserDetails } from "@/lib/features/authentication/auth";
import axios from "axios";

function Container() {
  const router = useRouter();
  const { googleUserDetails } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (googleUserDetails) {
      toast("Navigating to Search");
      setTimeout(() => {
        router.push("/search");
      }, 5500);
    }
  }, [router, googleUserDetails]);

  const usernameInput = (e) => {
    setUserName(e.target.value);
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

  const login = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!userName) {
        toast.error("username required!");
        return;
      }
      setLoading(true);
      const response = await axios.get(
        `https://rsblupwp0e.execute-api.ap-southeast-2.amazonaws.com/default/voyexUsers?user_name=${userName}`
      );
      console.log("response", response);
      if (response.status === 200 && response.data.exists === true) {
        toast.success("Login successful");
        localStorage.setItem("voyexUserName", userName);
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
  const handleLogin = async () => {
    login();
  };
  return (
    <main className="h-screen overflow-y-scroll no-scrollbar">
      <section className="flex w-full h-full items-center">
        <Form
          handleLogin={handleLogin}
          usernameInput={usernameInput}
          passwordInput={passwordInput}
          googleSignup={googleSignup}
          loading={loading}
        />
        <ImageSide />
      </section>
    </main>
  );
}
export default Container;
