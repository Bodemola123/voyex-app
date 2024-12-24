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

function Signing({
  handleUserSignup,
  emailInput,
  passwordInput,
  countryInput,
  usernameInput,
  handleUserSignin,
  usernameInput1,
  passwordInput1,
  googleSignup,
  loading,
}) {
  return (
    <main className="relative max-w-[666px] w-full h-[90vh] p-6 rounded-[29px] bg-black overflow-y-scroll">
      <div className=" flex flex-col items-center justify-center h-full mt-10">
        <h1 className="text-3xl font-bold text-fontlight pt-40 capitalize">
          voyex
        </h1>
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
              {/* <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                {`Make changes to your account here. Click save when you're done.`}
              </CardDescription>
            </CardHeader> */}
              <CardContent className="space-y-4 p-0">
                <div className="space-y-1">
                  <Label
                    htmlFor="username"
                    className="text-fontlight font-normal"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    defaultValue="Your username"
                    onChange={usernameInput}
                    className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-fontlight font-normal">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="Your email"
                    onChange={emailInput}
                    className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-fontlight font-normal"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    defaultValue="password"
                    onChange={passwordInput}
                    className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="w-full justify-center mt-10 p-0">
                <Button
                  className="text-[#131314] font-medium h-[56px] bg-purple hover:bg-purple w-full rounded-[33px]"
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
          </TabsContent>
          <TabsContent value="sign_in" className="mt-10">
            <Card className="rounded-none border-none">
              {/* <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                {`Make changes to your account here. Click save when you're done.`}
              </CardDescription>
            </CardHeader> */}
              <CardContent className="space-y-4 p-0">
                <div className="space-y-1">
                  <Label
                    htmlFor="username"
                    className="text-fontlight font-normal"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    defaultValue="Your username"
                    onChange={usernameInput1}
                    className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-fontlight font-normal"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    defaultValue="password"
                    onChange={passwordInput1}
                    className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="w-full justify-center mt-10 p-0">
                <Button
                  className="text-[#131314] font-medium h-[56px] bg-purple hover:bg-purple w-full rounded-[33px]"
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
          </TabsContent>
        </Tabs>
        <SignOptions googleSignup={googleSignup} />
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
