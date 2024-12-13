"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { FaRegEyeSlash } from "react-icons/fa6";

function Form({
  handleSignup,
  emailInput,
  passwordInput,
  countryInput,
  usernameInput,
  googleSignup,
  loading,
}) {
  return (
    <main className="w-full lg:w-1/2 h-full">
      <section className=" relative flex justify-center items-center mx-auto w-full h-full">
        <div className="w-full h-full max-w-[700px] flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-center">Voyex.</h1>
          <div className="flex items-center justify-end space-x-2 mt-3 ">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode" className="text-base font-normal">
              Join as an organization
            </Label>
          </div>

          <div className="mt-7">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-sm font-medium">
                  Enter your username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={usernameInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Enter your email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={emailInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    id="password"
                    type="password"
                    placeholder="*********"
                    className="h-14 rounded-full px-4 pr-16 bg-[#171920] outline-none mt-2 w-full"
                    onChange={passwordInput}
                  />
                  <button className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-btnlime">
                    <FaRegEyeSlash />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="country" className="text-sm font-medium">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  placeholder="India"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={countryInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="SignupEmail" className="text-sm font-medium">
                  Subscription Type
                </label>
                <input
                  id="subscription"
                  type="text"
                  placeholder="Free"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2 disabled:cursor-not-allowed"
                  disabled
                  // onChange={subscriptionInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="type" className="text-sm font-medium">
                  User Type
                </label>
                <input
                  id="type"
                  type="text"
                  placeholder="Regular"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2 disabled:cursor-not-allowed"
                  disabled
                  // onChange={userType}
                />
              </div>
            </div>

            <button
              className="flex items-center justify-center text-lg font-medium w-full h-14 rounded-full bg-btnlime mt-4 capitalize disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => handleSignup()}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>

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
            onClick={() => googleSignup()}
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
