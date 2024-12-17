"use client";

import Form from "./Form";
import ImageSide from "./ImageSide";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { updateGoogleUserDetails } from "@/lib/features/authentication/auth";
import axios from "axios";

function Container() {
  const router = useRouter();
  const { googleUserDetails } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [orgPassword, setOrgPassword] = useState("");
  const [orgname, setOrgname] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgIndustry, setOrgIndustry] = useState("");
  const [orgLocation, setOrgLocation] = useState("");
  const [orgInstagram, setOrgInstagram] = useState("");
  const [yearFounded, setYearFounded] = useState("");
  const [tools, setTools] = useState("");
  const [referral, setReferral] = useState("");
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
    setEmail(e.target.value);
  };
  const orgInput = (e) => {
    setOrgname(e.target.value);
  };
  const locationInput = (e) => {
    setOrgLocation(e.target.value);
  };
  const websiteInput = (e) => {
    setOrgWebsite(e.target.value);
  };
  const industryInput = (e) => {
    setOrgIndustry(e.target.value);
  };
  const instaSocialInput = (e) => {
    setOrgInstagram(e.target.value);
  };
  const yearFoundedInput = (e) => {
    setYearFounded(e.target.value);
  };
  const toolsAmountInput = (e) => {
    setTools(e.target.value);
  };
  const referralInput = (e) => {
    setReferral(e.target.value);
  };
  const passwordInput = (e) => {
    setOrgPassword(e.target.value);
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
      if (
        !email ||
        !orgPassword ||
        !orgname ||
        !orgWebsite ||
        !orgIndustry ||
        !orgLocation ||
        !orgInstagram ||
        !yearFounded ||
        !tools ||
        !referral
      ) {
        toast.error("all fields are required");
        return;
      }

      if (!passwordRegex.test(orgPassword)) {
        toast.error(
          "Password must be 8-16 characters, contain at least one special character, one number, and one uppercase letter!"
        );
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `https://ptmex2ovs0.execute-api.eu-north-1.amazonaws.com/default/voyex_org`,
        {
          org_name: orgname,
          org_email: email,
          website: orgWebsite,
          logo_url: "https://testorg.com/logo.png",
          industry: orgIndustry,
          location: orgLocation,
          social_mediaLinks: {
            twitter: "https://testorg.com/logo.png",
            instagram: orgInstagram,
          },
          metadata: {
            founded: yearFounded,
          },
          tools_count: tools,
          billing_info: "debit card",
          password: orgPassword,
          referred_by: referral,
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        toast.success(response.message);
        return router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      // if (
      //   error.response.data.includes(
      //     "Error creating organization: duplicate key value violates unique constraint"
      //   )
      // ) {
      //   toast.error("Organization already exists");
      // }
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async () => {
    signing();
  };
  return (
    <main className="flex w-screen h-screen">
      <Form
        handleSignup={handleSignup}
        emailInput={emailInput}
        orgInput={orgInput}
        websiteInput={websiteInput}
        industryInput={industryInput}
        locationInput={locationInput}
        instaSocialInput={instaSocialInput}
        yearFoundedInput={yearFoundedInput}
        toolsAmountInput={toolsAmountInput}
        referralInput={referralInput}
        passwordInput={passwordInput}
        googleSignup={googleSignup}
        loading={loading}
      />
      <ImageSide />
    </main>
  );
}
export default Container;
