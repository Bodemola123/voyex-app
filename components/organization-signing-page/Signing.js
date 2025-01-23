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
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

function Signing({
  passwordInput,
  emailInput,
  handleSignup,
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
  return (
    <main className="relative max-w-[665px] w-full h-[600px] z-[2] p-6 rounded-[29px] bg-black overflow-y-scroll">
      <div className=" flex flex-col items-center h-full">
        <h1 className="text-3xl font-bold text-fontlight capitalize">voyex</h1>
        <Tabs defaultValue="sign_up" className="w-[400px] mt-10">
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
          <TabsContent value="sign_up" className="mt-10">
            <Card className="rounded-none border-none">
              <CardContent className="space-y-4 p-0">
                <div className="relative space-y-1">
                  <Label htmlFor="email" className="text-fontlight font-normal">
                    Org Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Organization email"
                    onChange={emailInput}
                    className={`rounded-[28px] bg-card/30 placeholder:text-fontlight/20 text-fontlight h-[56px] border-none focus-visible:ring-0 focus:ring-offset-0 focus:border-none focus-within:border-none`}
                  />
                  {/* {border ? (
                    <FaCheck className="absolute right-4 top-1/2 text-green-500" />
                  ) : (
                    <RxCross2 className="absolute right-4 top-[45px] text-red-500" />
                  )} */}
                </div>
                <div className="relative space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-fontlight font-normal"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Password"
                    onChange={passwordInput}
                    className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight placeholder:text-fontlight/20 h-[56px] pr-16"
                  />
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
                  className="text-[#131314] font-medium h-[56px] bg-purple hover:bg-purple/70 w-full rounded-[33px] disabled:cursor-not-allowed transition-all"
                  // disabled={!allowed}
                  onClick={() => handleSignup()}
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
              <span className="">Other sign up options</span>
              <div className="flex items-center gap-4 w-full mt-4">
                {/* <button className="flex items-center justify-center text-2xl w-[50px] h-[50px] bg-white border border-[#D8DADC] rounded-full">
                  <FaFacebookF className="text-[#3C5A99]" />
                </button> */}
                <button
                  className=" flex items-center justify-center gap-1 text-2xl w-full h-[50px] bg-white hover:bg-white/80 border border-[#D8DADC] rounded-full overflow-hidden transition-all"
                  disabled={loadingGoogle}
                  onClick={() => googleOrgSignup()}
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
                  <Label htmlFor="email" className="text-fontlight font-normal">
                    Organization email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Organization email"
                    onChange={orgEmailInput1}
                    className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight/20 text-fontlight h-[56px]"
                  />
                </div>
                <div className="relative space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-fontlight font-normal"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Password"
                    onChange={passwordInput1}
                    className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight/20 text-fontlight h-[56px] pr-16"
                  />
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
                  className="text-[#131314] font-medium h-[56px] bg-purple hover:bg-purple/70 w-full rounded-[33px]"
                  onClick={() => handleOrgSignin()}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-black" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
            <div className="flex flex-col items-center mt-[4rem] w-full">
              <span className="">Other sign in options</span>
              <div className="flex items-center gap-4 w-full mt-4">
                {/* <button className="flex items-center justify-center text-2xl w-[50px] h-[50px] bg-white border border-[#D8DADC] rounded-full">
                  <FaFacebookF className="text-[#3C5A99]" />
                </button> */}
                <button
                  className=" flex items-center justify-center gap-1 text-2xl w-full h-[50px] bg-white border border-[#D8DADC] rounded-full overflow-hidden"
                  disabled={loadingGoogle}
                  onClick={() => googleOrgSignin()}
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
    </main>
  );
}

export default Signing;
