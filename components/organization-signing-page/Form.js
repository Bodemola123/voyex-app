"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

function Form({
  handleSignup,
  emailInput,
  passwordInput,
  orgInput,
  websiteInput,
  industryInput,
  locationInput,
  instaSocialInput,
  yearFoundedInput,
  toolsAmountInput,
  referralInput,
  googleSignup,
  loading,
  showPassword,
  setShowPassword,
}) {
  const router = useRouter();
  return (
    <main className="w-full lg:w-1/2 h-full mt-8">
      <section className=" relative flex justify-center items-center mx-auto w-full">
        <div className="w-full h-[95vh] max-w-[700px] flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-center">Voyex.</h1>
          {/* <button
            className="flex items-center justify-end space-x-2 mt-3 cursor-pointer"
            onClick={() => router.push("/organization-signup")}
          >
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode" className="text-base font-normal">
              Join as an organization
            </Label>
          </button> */}

          <div className="mt-7 mb-20 h-full overflow-y-scroll">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="orgName"
                  className="text-sm font-medium capitalize"
                >
                  organization name
                </label>
                <input
                  id="orgName"
                  type="text"
                  placeholder="johndoe"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={orgInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium capitalize"
                >
                  organization email
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
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="*********"
                    className="h-14 rounded-full px-4 pr-16 bg-[#171920] outline-none mt-2 w-full"
                    onChange={passwordInput}
                  />
                  <button
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-xl text-btnlime p-3"
                    title={`${showPassword ? "Hide" : "Show"}`}
                    onClick={() => setShowPassword((e) => !e)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="website"
                  className="text-sm font-medium capitalize"
                >
                  website
                </label>
                <input
                  id="website"
                  type="text"
                  placeholder="www.sample.com"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={websiteInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="industry"
                  className="text-sm font-medium capitalize"
                >
                  industry
                </label>
                <input
                  id="industry"
                  type="text"
                  placeholder="commerce"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={industryInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="location"
                  className="text-sm font-medium capitalize"
                >
                  location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="India"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={locationInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="instaSocial"
                  className="text-sm font-medium capitalize"
                >
                  instagram link
                </label>
                <input
                  id="instaSocial"
                  type="text"
                  placeholder="https://www.media.com/socials"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={instaSocialInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="yearFounded"
                  className="text-sm font-medium capitalize"
                >
                  year founded
                </label>
                <input
                  id="yearFounded"
                  type="number"
                  maxLength={4}
                  placeholder="2024"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={yearFoundedInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="toolsAmount"
                  className="text-sm font-medium capitalize"
                >
                  tools count
                </label>
                <input
                  id="toolsAmount"
                  type="number"
                  placeholder="3"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={toolsAmountInput}
                />
              </div>

              {/* <div className="flex flex-col gap-1">
                <label
                  htmlFor="referral"
                  className="text-sm font-medium capitalize"
                >
                  referred by:
                </label>
                <input
                  id="referral"
                  type="text"
                  placeholder="johnny"
                  className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
                  onChange={referralInput}
                />
              </div> */}
            </div>

            <button
              className="flex items-center justify-center text-lg font-medium w-full h-14 rounded-full bg-btnlime mt-4 capitalize disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => handleSignup()}
            >
              {loading ? "Loading..." : "Register"}
            </button>

            <p className="flex items-center justify-center text-sm font-medium gap-1.5 mt-4">
              Already have an Account?{" "}
              <span>
                <Link
                  href="/login"
                  className="font-bold uppercase text-btnlime"
                >
                  login
                </Link>
              </span>
            </p>

            <button
              className="flex items-center justify-center gap-2 text-[#1C1D26] text-xl font-medium w-full h-[3.75rem] rounded-full bg-white mt-7"
              onClick={() => googleSignup()}
            >
              <Image
                src="/google.png"
                alt="google logo"
                width={30}
                height={30}
              />
              Continue with google
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Form;
