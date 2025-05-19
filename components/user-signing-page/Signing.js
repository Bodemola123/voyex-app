"use client";

import SignOptions from "@/components/user-signing-page/SignOptions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import ForgotPassword from "./ForgotPasswordHome";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DynamicCard from "../common/DynamicCard";
import { CiMail } from "react-icons/ci";
import { HiOutlineLockClosed } from "react-icons/hi";


function Signing({
  emailInput,
  passwordInput,
  handleUserSignup,
  /////////////////////
  handleUserSignin,
  setEmailAddress,
  setUserPassword1,
  googleUserSignin,
  googleUserSignup,
  loading,
  loadingGoogle,
  currentSlide,
  showPassword,
  setShowPassword,
  setCurrentSlide,
}) {
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const router = useRouter();
  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-hidden overflow-x-hidden items-center">
      <DynamicCard/>
      <section className="relative p-6 h-full w-full rounded-[29px] bg-[#0D0D0D] overflow-y-scroll border border-[#D0D5DD1A]">
        <div className=" flex flex-col items-center h-full">
          <h1 className="text-3xl font-bold text-fontlight capitalize">
            voyex
          </h1>
          <Tabs defaultValue="sign_in" className="w-[400px] mt-10">
            <TabsList className="grid w-full grid-cols-2 bg-card/30 text-fontlight rounded-[21px]">
              <TabsTrigger
                value="sign_up"
                className="capitalize rounded-[21px] data-[state=active]:bg-black data-[state=active]:text-fontlight"
              >
                sign up
              </TabsTrigger>
              <TabsTrigger
                value="sign_in"
                className="capitalize rounded-[21px] data-[state=active]:bg-black data-[state=active]:text-fontlight"
              >
                sign in
              </TabsTrigger>
            </TabsList>
            <p className="text-sm font-normal mt-10 text-center">Want to list your AI? <button  onClick={() => router.push("/auth/organization")} className="text-[#c088fb] text-base"> Continue as Organization</button></p>
            <TabsContent value="sign_up" className="mt-10">
              <Card className="rounded-none border-none">
                <CardContent className="space-y-4 p-0">
                  <div className="space-y-1 mb-1">
                    <Label
                      htmlFor="email"
                      className="text-fontlight font-normal"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <CiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-fontlight/40 text-xl" />
                      <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      onChange={emailInput}
                      className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight/20 text-fontlight h-[56px] focus:outline-none focus:border-none outline-none focus:shadow-none`}
                    />
                    </div>

                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="password"
                      className="text-fontlight font-normal"
                    >
                      Password
                    </Label>
                    <div className="relative">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-fontlight/40 text-xl" />
                    <Input
                      id="password"
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="****"
                      onChange={passwordInput}
                      className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight/20 text-fontlight h-[56px] pr-16  focus:outline-none focus:border-none outline-none focus:shadow-none"
                    />
                    </div>

                    <button
                      className="absolute right-1 top-7 text-xl text-purple p-3"
                      title={`${showPassword ? "Hide" : "Show"}`}
                      onClick={() => setShowPassword((e) => !e)}
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                </CardContent>
                <CardFooter className="w-full justify-center mt-10 p-0">
                  <Button
                    className="text-[#131314] font-medium h-[56px] bg-purple hover:bg-purple/70 w-full rounded-[33px] disabled:cursor-not-allowed"
                    disabled={loading}
                    onClick={() => handleUserSignup()}
                  >
                    {loading ? (
                      <AiOutlineLoading3Quarters className="animate-spin text-black" />
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                </CardFooter>
              </Card>
              <div className="flex flex-col items-center mt-[4rem] w-full">
                <span className="">Other sign up option</span>
                <div className="flex items-center gap-4 w-full mt-4">
                  {/* <button className="flex items-center justify-center text-2xl w-[50px] h-[50px] bg-white border border-[#D8DADC] rounded-full">
                  <FaFacebookF className="text-[#3C5A99]" />
                </button> */}
                  <button
                    className=" flex items-center justify-center gap-1 text-2xl w-full h-[50px] bg-white hover:bg-white/80 border border-[#D8DADC] rounded-full overflow-hidden transition-all"
                    disabled={loadingGoogle}
                    onClick={() => googleUserSignup()}
                  >
                    {loadingGoogle && (
                      <span className="absolute p-6 bg-black/30">
                        <AiOutlineLoading3Quarters className="animate-spin text-black" />
                      </span>
                    )}
                    <FcGoogle />
                    <span className="text-black text-base font-medium">
                      Google
                    </span>
                  </button>
                  {/* <button className="flex items-center justify-center text-2xl w-[50px] h-[50px] bg-white border border-[#D8DADC] rounded-full">
                  <FaApple className="text-black" />
                </button> */}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="sign_in" className="mt-10">
              <Card className="rounded-none border-none">
                <CardContent className="space-y-4 p-0">
                  <div className="space-y-1">
                    <Label
                      htmlFor="email"
                      className="text-fontlight font-normal"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <CiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-fontlight/40 text-xl" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="rounded-[28px] bg-card/30 border-none focus:shadow-none placeholder:text-fontlight/20 text-fontlight h-[56px] focus:ring-0 focus:outline-none outline-none"
                    />
                    </div>

                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="password"
                      className="text-fontlight font-normal"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-fontlight/40 text-xl" />
                    <Input
                      id="password"
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="Password"
                      onChange={(e) => setUserPassword1(e.target.value)}
                      className="rounded-[28px]  bg-card/30 border-none placeholder:text-fontlight/20 text-fontlight h-[56px] pr-16 focus:outline-none focus:border-none outline-none focus:shadow-none"
                    />
                    </div>

                    <button
                      className="absolute right-1 top-7 text-xl text-purple p-3"
                      title={`${showPassword ? "Hide" : "Show"}`}
                      onClick={() => setShowPassword((e) => !e)}
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                  <div className="flex justify-end items-center">
                    <button
                      onClick={() => setCurrentSlide("forgot-password-home")}
                    >
                      <p className="bg-gradient-to-r from-[#C088FB] to-[#9747FF] bg-clip-text text-transparent text-sm font-bold">
                        Forgot password?
                      </p>
                    </button>
                  </div>
                </CardContent>
                <CardFooter className="w-full justify-center mt-10 p-0">
                  <Button
                    className="text-[#131314] font-medium h-[56px] bg-purple hover:bg-purple/70 transition-all w-full rounded-[33px]"
                    disabled={loading}
                    onClick={() => handleUserSignin()}
                  >
                    {loading ? (
                      <AiOutlineLoading3Quarters className="animate-spin text-black" />
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </CardFooter>
              </Card>
              <div className="flex flex-col items-center mt-[4rem] w-full">
                <span className="">Other sign in option</span>
                <div className="flex items-center gap-4 w-full mt-4">
                  {/* <button className="flex items-center justify-center text-2xl w-[50px] h-[50px] bg-white border border-[#D8DADC] rounded-full">
                  <FaFacebookF className="text-[#3C5A99]" />
                </button> */}
                  <button
                    className=" flex items-center justify-center gap-1 text-2xl w-full h-[50px] bg-white hover:bg-white/80 border border-[#D8DADC] rounded-full overflow-hidden transition-all"
                    disabled={loadingGoogle}
                    onClick={() => googleUserSignin()}
                  >
                    {loadingGoogle && (
                      <span className="absolute p-6 bg-black/30">
                        <AiOutlineLoading3Quarters className="animate-spin text-black" />
                      </span>
                    )}
                    <FcGoogle />
                    <span className="text-black text-base font-medium">
                      Google
                    </span>
                  </button>
                  {/* <button className="flex items-center justify-center text-2xl w-[50px] h-[50px] bg-white border border-[#D8DADC] rounded-full">
                  <FaApple className="text-black" />
                </button> */}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <p className="text-center text-fontlight text-base font-normal mt-14 pb-10">
            By creating an account or signing you agree to our
            <br />
            <Link href="/" className="text-purple font-medium">
              Terms and Conditions
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Signing;
