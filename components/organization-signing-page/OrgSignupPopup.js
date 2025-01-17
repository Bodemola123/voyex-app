// DISPLAY THIS IF ORGANIZATION HASN'T PROVIDED ADDITIONAL DETAILS AFTER SIGNING UP
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { IndustryDropdown } from "./IndustryDropdown";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import TargetAudienceDropdown from "./TargetAudienceDropdown";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BasicInfoContainer from "./BasicInfoContainer";
import ContactDetailsContainer from "./ContactDetailsContainer";
import OperationalDetails from "./OperationalDetails";
import OrgUploadLoading from "./OrgUploadLoading";
import OrgUploadSuccess from "./OrgUploadSuccess";

function OrgSignupPopup({}) {
  // const [email, setEmail] = useState("");
  // const [orgPassword, setOrgPassword] = useState("");
  const [orgname, setOrgname] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgIndustry, setOrgIndustry] = useState("");
  const [orgLocation, setOrgLocation] = useState("");
  const [orgTwitter, setOrgTwitter] = useState("");
  const [orgLinkedin, setOrgLinkedin] = useState("");
  const [orgPoc, setOrgPoc] = useState("");
  const [orgLogo, setOrgLogo] = useState("");
  const [orgAudience, setOrgAudience] = useState("");
  const [orgService, setOrgService] = useState("");
  const [orgTechUsed, setOrgTechUsed] = useState("");

  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("basic-info");
  const [allowed, setAllowed] = useState(false);

  //////////////// ORGANIZATION UPLOAD DETAILS /////////////////////////////////
  const handleBasicInfoSlide = () => {
    if (!orgname || !orgWebsite || !orgIndustry || !orgLocation) {
      toast.error("complete all fields!!!");
      return;
    } else setCurrentSlide("contact-details");
  };
  const handleContactDetailsSlide = () => {
    if (!orgPoc || !orgTwitter || !orgLinkedin) {
      toast.error("complete all fields!!!");
      return;
    } else setCurrentSlide("operational-details");
  };
  const uploadDetails = async () => {
    try {
      if (!orgAudience || !orgTechUsed || !orgService) {
        toast.error("complete all fields!!!");
        return;
      }
      setLoading(true);
      setCurrentSlide("org-upload-loading");
      const response = await axios.put(
        `https://cc7zo6pwqb.execute-api.ap-southeast-2.amazonaws.com/default/voyex_orgV2`,
        {
          org_id: Number(localStorage.getItem("orgId")),
          organization_name: orgname,
          industry: orgIndustry,
          location: orgLocation,
          website_url: orgWebsite,
          poc: orgPoc,
          logo_url: orgLogo,
          social_media: {
            twitter: orgTwitter,
            linkedin: orgLinkedin,
          },
          operational_details: {
            target_auience: orgAudience,
            service_offered: orgService,
            tech_used: orgTechUsed,
          },
        }
      );
      // console.log("response", response);
      if (response.status === 200) {
        toast.success(response.data);
        setCurrentSlide("org-upload-success");
      }
      if (response.status !== 200) {
        setCurrentSlide("basic-info");
      }
    } catch (error) {
      // console.log(error);
      if (error.response?.data) {
        toast.error(error.response.data);
      } else toast.error(error.message);
      if (error.message) {
        setCurrentSlide("basic-info");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleUploadDetails = async () => {
    allowed && uploadDetails();
  };

  ///////////////// SIGN UP VALUES
  const emailInput = (e) => {
    setEmail(e.target.value);
  };
  const passwordInput = (e) => {
    setOrgPassword(e.target.value);
  };
  const orgNameInput = (e) => {
    setOrgname(e.target.value);
  };
  const industryInput = (e) => {
    setOrgIndustry(e.target.value);
    console.log(orgIndustry);
  };
  const locationInput = (e) => {
    setOrgLocation(e.target.value);
  };
  const websiteInput = (e) => {
    setOrgWebsite(e.target.value);
  };
  const pocInput = (e) => {
    setOrgPoc(e.target.value);
  };
  const logoInput = (e) => {
    setOrgLogo(e.target.value);
  };
  const twitterInput = (e) => {
    setOrgTwitter(e.target.value);
  };
  const linkedinInput = (e) => {
    setOrgLinkedin(e.target.value);
  };
  const audienceInput = (e) => {
    setOrgAudience(e.target.value);
  };
  const serviceInput = (e) => {
    setOrgService(e.target.value);
  };
  const techUsedInput = (e) => {
    setOrgTechUsed(e.target.value);
  };

  ////////////// HANDLE CURRENT SLIDE ////////////////////////
  const handleCurrentSlide = () => {
    if (currentSlide === "basic-info") {
      return (
        <BasicInfoContainer
          orgNameInput={orgNameInput}
          websiteInput={websiteInput}
          setOrgIndustry={setOrgIndustry}
          locationInput={locationInput}
          handleBasicInfoSlide={handleBasicInfoSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
        />
      );
    } else if (currentSlide === "contact-details") {
      return (
        <ContactDetailsContainer
          pocInput={pocInput}
          twitterInput={twitterInput}
          linkedinInput={linkedinInput}
          handleContactDetailsSlide={handleContactDetailsSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
        />
      );
    } else if (currentSlide === "operational-details") {
      return (
        <OperationalDetails
          setOrgAudience={setOrgAudience}
          serviceInput={serviceInput}
          techUsedInput={techUsedInput}
          loading={loading}
          handleUploadDetails={handleUploadDetails}
          setCurrentSlide={setCurrentSlide}
        />
      );
    } else if (currentSlide === "org-upload-loading") {
      return <OrgUploadLoading />;
    } else if (currentSlide === "org-upload-success") {
      return <OrgUploadSuccess />;
    } else
      return (
        <BasicInfoContainer
          orgNameInput={orgNameInput}
          websiteInput={websiteInput}
          setOrgIndustry={setOrgIndustry}
          locationInput={locationInput}
          handleBasicInfoSlide={handleBasicInfoSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
        />
      );
  };
  return (
    <div className="fixed z-50 w-full h-full inset-0 flex items-center justify-center backdrop-blur-sm">
      {handleCurrentSlide()}
    </div>
  );
}

export default OrgSignupPopup;
