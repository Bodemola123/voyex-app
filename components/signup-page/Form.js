"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";

import { useGoogleLogin } from "@react-oauth/google";
import { updateGoogleUserDetails } from "@/lib/features/authentication/auth";
import axios from "axios";

function Form() {
  const router = useRouter();
  const { googleUserDetails } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const accessName = localStorage.getItem("name");
  const accessEmail = localStorage.getItem("useremail");

  useEffect(() => {
    if (accessName || accessEmail || googleUserDetails) {
      toast("Navigating to Search");
      setTimeout(() => {
        router.push("/search");
      }, 5500);
    }
  });

  const emailInput = (e) => {
    setEmail(e.target.value);
  };
  const passwordInput = (e) => {
    setPassword(e.target.value);
  };

  const login = useGoogleLogin({
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
      if (!email || !password) {
        toast.error("all fields are required");
        console.log("toast is visible");
        return;
      }

      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!"
        );
        console.log("toast is visible");
        return;
      }
      setLoading(true);
      toast.loading("Loading");
      const response = await axios.post(
        `https://analytics-regw.onrender.com/user/signup`,
        {
          email,
          password,
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/search");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      toast.error(error.response.data.message);
      console.log("toast is visible");
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    signing();
  };

  return (
    <main className="w-full lg:w-1/2 h-full">
      <section className=" relative flex justify-center items-center mx-auto w-full h-full">
        <div className="w-full h-full max-w-[600px] flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-center">Voyex.</h1>
          <div className="flex items-center justify-end space-x-2 mt-3 ">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode" className="text-base font-normal">
              Join as an organization
            </Label>
          </div>

          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-1">
              <label htmlFor="SignupEmail" className="text-sm font-medium mt-5">
                Enter your email
              </label>
              <input
                id="SignupEmail"
                type="email"
                placeholder="abc example.com"
                className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                onChange={emailInput}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="passwordInput"
                className="text-sm font-medium mt-4"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="passwordInput"
                  type="password"
                  placeholder="*********"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2 w-full"
                  onChange={passwordInput}
                />
                <button className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
                  <FaRegEyeSlash />
                </button>
              </div>
            </div>

            <button
              className="flex items-center justify-center text-lg font-medium w-full h-14 rounded-full bg-btnlime mt-4 capitalize"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <p className="flex items-center justify-center text-sm font-medium gap-1.5 mt-4">
            Already have an Account?{" "}
            <span>
              <Link href="/login" className="font-bold uppercase text-btnlime">
                login
              </Link>
            </span>
          </p>

          <button
            className="flex items-center justify-center gap-2 text-[#1C1D26] text-xl font-medium w-full h-[3.75rem] rounded-full bg-white mt-7"
            onClick={() => login()}
          >
            <Image src="/google.png" alt="google logo" width={30} height={30} />
            Continue with google
          </button>
        </div>
      </section>
    </main>
  );
}
export default Form;
