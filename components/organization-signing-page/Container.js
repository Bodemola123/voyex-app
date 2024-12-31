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
import SignupSuccess from "./SignupSuccess";
import { useDebounce } from "@/hooks/useDebounce";
import BasicInfoContainer from "./BasicInfoContainer";
import ContactDetailsContainer from "./ContactDetailsContainer";
import AccountError from "./AccountError";
import OrgLoading from "./OrgSignupLoading";
import OrgSigninLoading from "./OrgSigninLoading";
import SigninSuccess from "./SigninSuccess";
import Cookies from "js-cookie";

function Container() {
  const router = useRouter();
  const dispatch = useDispatch();
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
  // const [referral, setReferral] = useState("");

  const [orgname1, setOrgname1] = useState("");
  const [orgPassword1, setOrgPassword1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [border, setBorder] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("signing");
  const debouncedValue = useDebounce(orgname, 500);

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
  // const referralInput = (e) => {
  //   setReferral(e.target.value);
  // };
  const orgInput1 = (e) => {
    setOrgname1(e.target.value);
  };
  const passwordInput = (e) => {
    setOrgPassword(e.target.value);
  };
  const passwordInput1 = (e) => {
    setOrgPassword1(e.target.value);
  };

  ///////////// CHECK ORG NAME //////////////////////
  useEffect(() => {
    if (orgname === "") {
      return;
    } else {
      const checkOrgName = async () => {
        try {
          const response = await axios.get(
            `https://ptmex2ovs0.execute-api.eu-north-1.amazonaws.com/default/voyex_org?org_name=${debouncedValue}`
          );
          // console.log("checked name:", response);
          if (response.status === 200 && response.data.exist === "yes") {
            // toast.error("Name taken");
            setBorder(false);
            return;
          }
          if (response.status === 200 && response.data.exist === "no") {
            // toast.success("Name available");
            setBorder(true);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
      checkOrgName();
    }
    // input finall order
  }, [debouncedValue, orgname]);

  ////////////////// GOOGLE ORG SIGNUP /////////////////////////////////
  const googleOrgSignup = useGoogleLogin({
    onSuccess: async (response) => {
      setLoading(true);
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
        // console.log(res.data);
        if (res.status === 200) {
          const response = await axios.post(
            `https://ptmex2ovs0.execute-api.eu-north-1.amazonaws.com/default/voyex_org`,
            {
              org_name: res.data?.name,
              org_email: res.data?.email,
              website: orgWebsite,
              logo_url: res.data?.picture,
              industry: "Tech",
              location: "nil",
              social_mediaLinks: {
                twitter: "https://testorg.com/logo.png",
                instagram: "https://testorg.com/logo.png",
              },
              metadata: {
                founded: 2024,
              },
              tools_count: 5,
              billing_info: "debit card",
              password: res.data?.sub,
              // referred_by: referral,
            }
          );
          console.log("response", response);
          if (response.status === 201) {
            setCurrentSlide("signup-success");
            toast.success(response.data.message);
          }
          if (response.status === 400) {
            setCurrentSlide("signing");
          }
          dispatch(
            updateGoogleUserDetails({
              email: res.data?.email,
              username: res.data?.name,
              picture: res.data?.picture,
              id: res.data?.sub,
            })
          );
        }
      } catch (err) {
        console.log(err);
        if (err.response?.data) {
          toast.error(err.response.data);
        } else toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  ////////////////// GOOGLE USER SIGNIN /////////////////////////////////
  const googleOrgSignin = useGoogleLogin({
    onSuccess: async (response) => {
      setLoading(true);
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
        // console.log(res.data);
        if (res.status === 200) {
          const response = await axios.get(
            `https://ptmex2ovs0.execute-api.eu-north-1.amazonaws.com/default/voyex_org?org_name=${res.data.name}`
          );
          // console.log("response", response);
          if (response.status === 200 && response.data.exist === "yes") {
            setCurrentSlide("org-signin-success");
            toast.success("Signin successful");
            Cookies.set("voyexOrgName", res.data.name, { expires: 7 });
          }
          if (response.status === 200 && response.data.exist === "no") {
            toast.error("Wrong credentials, organization doesn't exist!");
            setCurrentSlide("signing");
            return;
          }
          dispatch(
            updateGoogleUserDetails({
              email: res.data?.email,
              username: res.data?.name,
              picture: res.data?.picture,
              id: res.data?.sub,
            })
          );
          // router.push("/search");
          // toast.success("Login Sucessfull");
        }
      } catch (err) {
        console.log(err);
        if (err.response?.data?.error) {
          toast.error(err.response.data.error);
        } else toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  //////////////// ORGANIZATION SIGNUP /////////////////////////////////
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
        !tools
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
      setCurrentSlide("org-signup-loading");
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
          // referred_by: referral,
        }
      );
      // console.log("response", response);
      if (response.status === 201) {
        toast.success(response.data.message);
        setCurrentSlide("org-signup-success");
      }
      if (response.status === 409) {
        setCurrentSlide("signing");
        // toast.error(response.data?.error);
      }
    } catch (error) {
      // console.log(error);
      // setCurrentSlide("error");
      if (error.response?.data) {
        toast.error(error.response.data);
      } else toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (border === true) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }, [border]);
  const handleSignup = async () => {
    allowed && signing();
  };

  ////////////////// ORGANIZATION SIGN IN /////////////////////////////
  const organizationSignin = async () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,16}$/;
    try {
      if (!orgname1) {
        toast.error("organization name required!");
        return;
      }
      setLoading(true);
      setCurrentSlide("org-signin-loading");
      const response = await axios.get(
        `https://ptmex2ovs0.execute-api.eu-north-1.amazonaws.com/default/voyex_org?org_name=${orgname1}`
      );
      // console.log("response", response);
      if (response.status === 200 && response.data.exist === "yes") {
        setCurrentSlide("org-signin-success");
        toast.success("Signin successful");
        Cookies.set("voyexOrgName", orgname1, { expires: 7 });
      }
      if (response.status === 200 && response.data.exist === "no") {
        toast.error("Wrong credentials, organization doesn't exist!");
        setCurrentSlide("signing");
        return;
      }
    } catch (error) {
      // console.log(error);
      // setCurrentSlide("signing");
      if (error.message.includes("Network Error")) {
        toast.error("Network Error, Try again!");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleOrgSignin = async () => {
    organizationSignin();
  };

  ////////////// HANDLE CURRENT SLIDE ////////////////////////
  const handleCurrentSlide = () => {
    if (currentSlide === "signing") {
      return (
        <Signing
          passwordInput={passwordInput}
          orgInput={orgInput}
          // referralInput={referralInput}
          ////////////////////////////////////////////////
          handleOrgSignin={handleOrgSignin}
          orgInput1={orgInput1}
          passwordInput1={passwordInput1}
          googleOrgSignup={googleOrgSignup}
          googleOrgSignin={googleOrgSignin}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          allowed={allowed}
          border={border}
          loading={loading}
          setCurrentSlide={setCurrentSlide}
        />
      );
    } else if (currentSlide === "basic-info") {
      return (
        <BasicInfoContainer
          handleSignup={handleSignup}
          emailInput={emailInput}
          websiteInput={websiteInput}
          industryInput={industryInput}
          locationInput={locationInput}
          instaSocialInput={instaSocialInput}
          yearFoundedInput={yearFoundedInput}
          toolsAmountInput={toolsAmountInput}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
        />
      );
    } else if (currentSlide === "contact-details") {
      return <ContactDetailsContainer />;
    } else if (currentSlide === "org-signup-loading") {
      return <OrgLoading />;
    } else if (currentSlide === "org-signin-loading") {
      return <OrgSigninLoading />;
    } else if (currentSlide === "email-verify") {
      return <EmailVerify />;
    } else if (currentSlide === "org-signup-success") {
      return <SignupSuccess />;
    } else if (currentSlide === "org-signin-success") {
      return <SigninSuccess />;
    } else if (currentSlide === "error") {
      return <AccountError setCurrentSlide={setCurrentSlide} />;
    } else
      return (
        <Signing
          passwordInput={passwordInput}
          orgInput={orgInput}
          // referralInput={referralInput}
          ////////////////////////////////////////////////
          handleOrgSignin={handleOrgSignin}
          orgInput1={orgInput1}
          passwordInput1={passwordInput1}
          googleOrgSignup={googleOrgSignup}
          googleOrgSignin={googleOrgSignin}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          allowed={allowed}
          border={border}
          loading={loading}
          setCurrentSlide={setCurrentSlide}
        />
      );
  };
  return handleCurrentSlide();
}
export default Container;
