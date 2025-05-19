"use client";

import SignOptions from "@/components/organization-signing-page/SignOptions";
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
import { CiMail } from "react-icons/ci";
import { HiOutlineLockClosed } from "react-icons/hi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DynamicCard from "../common/DynamicCard";
import { MdOutlineEmail } from "react-icons/md";
import { LuLock } from "react-icons/lu";

function Signing({
  passwordInput,
  emailInput,
  handleSignup,
  signupPasswordError,
  signupEmailError,
  // referralInput,
  handleOrgSignin,
  orgEmailInput1,
  passwordInput1,
  googleOrgSignup,
  googleOrgSignin,
  loading,
  loadingGoogle,
  showPassword,
  setShowPassword,
  // allowed,
  // border,
  setCurrentSlide,
}) {
  const router = useRouter();
  return (
<main className="grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-auto overflow-x-hidden scrollbar-hide items-center">
  <DynamicCard />
  <section className="relative p-6 h-full w-full rounded-[29px] bg-[#0D0D0D] border border-[#D0D5DD1A] overflow-y-scroll scrollbar-hide">
    <div className="flex flex-col items-center h-full">
      <h1 className="text-3xl font-bold text-fontlight capitalize">voyex</h1>
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
        <p className="text-center">
          <button
            onClick={() => router.push("/auth/user")}
            className="text-[#c088fb] text-base mt-10"
          >
            Continue as single user
          </button>
        </p>

        {/* SIGN UP */}
        <TabsContent value="sign_up" className="mt-10">
          <Card className="rounded-none border-none">
            <CardContent className="space-y-4 p-0">
              <div className="relative space-y-1">
                <Label htmlFor="email" className="text-fontlight font-normal">
                  Organization Email
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fontlight/30">
                    <MdOutlineEmail />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    onChange={emailInput}
                    className="pl-10 rounded-[28px] bg-card/30 placeholder:text-fontlight/20 text-fontlight h-[56px] border-none focus:outline-none focus:border-none"
                  />
                </div>
                {signupEmailError && (
                  <span className="text-red-500 text-sm">{signupEmailError}</span>
                )}
              </div>

              <div className="relative space-y-1">
                <Label htmlFor="password" className="text-fontlight font-normal">
                  Password
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fontlight/30">
                    <LuLock />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={passwordInput}
                    className="pl-10 pr-16 rounded-[28px] bg-card/30 placeholder:text-fontlight/20 text-fontlight h-[56px] border-none focus:outline-none"
                  />
                  <button
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-xl text-purple p-3"
                    title={showPassword ? "Hide" : "Show"}
                    onClick={() => setShowPassword((e) => !e)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {signupPasswordError && (
                  <span className="text-red-500 text-sm">{signupPasswordError}</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="w-full justify-center mt-10 p-0">
              <Button
                className="text-[#131314] font-medium h-[56px] bg-purple hover:bg-purple/70 w-full rounded-[33px] disabled:cursor-not-allowed transition-all"
                onClick={() => handleSignup()}
              >
                {loading ? <AiOutlineLoading3Quarters className="animate-spin text-black" /> : "Sign up"}
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col items-center mt-[4rem] w-full">
            <span className="">Other sign up option</span>
            <div className="flex items-center gap-4 w-full mt-4">
              <button
                className="flex items-center justify-center gap-1 text-2xl w-full h-[50px] bg-white hover:bg-white/80 border border-[#D8DADC] rounded-full overflow-hidden transition-all"
                disabled={loadingGoogle}
                onClick={() => googleOrgSignup()}
              >
                {loadingGoogle && (
                  <span className="absolute p-6 bg-black/30">
                    <AiOutlineLoading3Quarters className="animate-spin text-black" />
                  </span>
                )}
                <FcGoogle />
                <span className="text-black text-base font-medium">Google</span>
              </button>
            </div>
          </div>
        </TabsContent>

        {/* SIGN IN */}
        <TabsContent value="sign_in" className="mt-10">
          <Card className="rounded-none border-none">
            <CardContent className="space-y-4 p-0">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-fontlight font-normal">
                  Organization email
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fontlight/30">
                    <MdOutlineEmail />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Organization email"
                    onChange={orgEmailInput1}
                    className="pl-10 rounded-[28px] bg-card/30 border-none focus:outline-none placeholder:text-fontlight/20 text-fontlight h-[56px]"
                  />
                </div>
              </div>

              <div className="relative space-y-1">
                <Label htmlFor="password" className="text-fontlight font-normal">
                  Password
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fontlight/30">
                    <LuLock />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={passwordInput1}
                    className="pl-10 pr-16 rounded-[28px] bg-card/30 border-none focus:outline-none placeholder:text-fontlight/20 text-fontlight h-[56px]"
                  />
                  <button
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-xl text-purple p-3"
                    title={showPassword ? "Hide" : "Show"}
                    onClick={() => setShowPassword((e) => !e)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end items-center">
                <button onClick={() => setCurrentSlide("forgot-password-home")}> 
                  <p className="bg-gradient-to-r from-[#C088FB] to-[#9747FF] bg-clip-text text-transparent text-sm font-bold">
                    Forgot password?
                  </p>
                </button>
              </div>
            </CardContent>
            <CardFooter className="w-full justify-center mt-10 p-0">
              <Button
                className="text-[#131314] font-medium h-[56px] bg-purple hover:bg-purple/70 w-full rounded-[33px]"
                onClick={() => handleOrgSignin()}
              >
                {loading ? <AiOutlineLoading3Quarters className="animate-spin text-black" /> : "Sign in"}
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col items-center mt-[4rem] w-full">
            <span className="">Other sign in option</span>
            <div className="flex items-center gap-4 w-full mt-4">
              <button
                className="flex items-center justify-center gap-1 text-2xl w-full h-[50px] bg-white border border-[#D8DADC] rounded-full overflow-hidden"
                disabled={loadingGoogle}
                onClick={() => googleOrgSignin()}
              >
                {loadingGoogle && (
                  <span className="absolute p-6 bg-black/30">
                    <AiOutlineLoading3Quarters className="animate-spin text-black" />
                  </span>
                )}
                <FcGoogle />
                <span className="text-black text-base font-medium">Google</span>
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <p className="text-center text-fontlight text-base font-normal mt-14 pb-10">
        By creating an account or signing you agree to our
        <br />
        <span className="text-purple font-medium">
          <a href="https://voyex-landing.vercel.app/terms" target="_blank" rel="noopener noreferrer">
            Terms of use
          </a>
        </span>
      </p>
    </div>
  </section>
</main>

  );
}

export default Signing;
