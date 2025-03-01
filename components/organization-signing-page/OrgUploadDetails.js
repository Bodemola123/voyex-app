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
import axios from "axios";
import BasicInfoContainer from "./BasicInfoContainer";
import ContactDetailsContainer from "./ContactDetailsContainer";
import OperationalDetails from "./OperationalDetails";
import LeadershipAndTeam from "./LeadershipAndTeam";
import FinancialInformation from "./FinancialInformation";
import ComplianceandCert from "./ComplianceandCert";
import OrgUploadLoading from "./OrgUploadLoading";
import OrgUploadSuccess from "./OrgUploadSuccess";
import "react-toastify/dist/ReactToastify.css";


function OrgUploadDetails() {
  // const [email, setEmail] = useState("");
  // const [orgPassword, setOrgPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgIndustry, setOrgIndustry] = useState("");
  const [orgLocation, setOrgLocation] = useState("");
  const [orgPcpName, setOrgPcpName] = useState("");
  const [orgNumber, setOrgNumber] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgLogo, setOrgLogo] = useState("");
  const [orgAudience, setOrgAudience] = useState("");
  const [orgService, setOrgService] = useState("");
  const [orgTechUsed, setOrgTechUsed] = useState("");
  const [orgSpecialization, setOrgSpecialization] = useState("")
  const [orgTwitter, setOrgTwitter] = useState("");
  const [orgLinkedin, setOrgLinkedin] = useState("");
  const [orgFounder, setOrgFounder]= useState("");
  const [orgTeamsize, setOrgTeamsize]= useState("");
  const [orgExco, setOrgExcos]=useState("");
  const [orgCareerspage, setOrgCareerspage]=useState("");
  const [orgFundingInfo, setOrgFundingInfo]=useState("");
  const [orgRevenueMode, setOrgRevenueMode]= useState("");
  const [orgClient, setOrgClient]= useState("");
  const [orgPrivacyInput, setOrgPrivacyInput]= useState("");
  const [orgCertifications, setOrgCertifications]= useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("basic-info");
  const [allowed, setAllowed] = useState(false);
  const handleLocationSelection = async (location) => {
    setSelectedLocation(location); // Update state with selected location
  }
  const [selectedFunding, setSelectedFunding] = useState("");

const handleFundingSelect = (fundingValue) => {
  setSelectedFunding(fundingValue);
};
const [selectedRevenueModel, setSelectedRevenueModel] = useState("");

const handleRevenueSelect = (revenueValue) => {
  setSelectedRevenueModel(revenueValue);
};


  //////////////// ORGANIZATION UPLOAD DETAILS /////////////////////////////////
  const handleBasicInfoSlide = () => {
    if (!orgName || !orgWebsite || !orgIndustry || !selectedLocation) {
      toast.warn("complete all fields!!!");
      return;
    } else setCurrentSlide("contact-details");
  };
  const handleContactDetailsSlide = () => {
    if (!orgEmail || !orgPcpName || !orgNumber || !orgTwitter) {
      toast.warn("complete all fields!!!");
      return;
    } else setCurrentSlide("operational-details");
  };
  const handleOperationDetailsSlide = () => {
    if (!orgAudience || !orgTechUsed || !orgService || !orgSpecialization) {
      toast.warn("Complete all fields!!!");
      return;
    } else setCurrentSlide("leadership-team");

  };
  const handleLeadershipAndTeamSlide = () => {
    if (!orgFounder || !orgCareerspage || !orgExco || !orgTeamsize){
      toast.warn("Complete all fields!!!");
      return;
    
    } else setCurrentSlide("financial-info");
    
  };
  const handleFinancialInformationSlide = () => {
    if (!orgClient || !selectedFunding || !selectedRevenueModel){
      toast.warn("Complete all fields!!");
      return;

    } else setCurrentSlide("compliance-certification")
  };
  const uploadDetails = async () => {
    try {
      if (!orgPrivacyInput || !orgCertifications || !uploadedFile ) {
        toast.warn("complete all fields!!!");
        return;
      }
      setLoading(true);
      setCurrentSlide("org-upload-loading");
      // still need to set specialization in the api
      const accessToken = localStorage.getItem("access_token"); // Or `accessToken` based on your previous naming convention
  
      if (!accessToken) {
        toast.warn("Access token is missing. Please log in again.");
        setCurrentSlide("signing")
        return;
      }
      const response = await axios.put(
        `https://cc7zo6pwqb.execute-api.ap-southeast-2.amazonaws.com/default/voyex_orgV2`,
        {
          org_id: Number(localStorage.getItem("orgId")),
          organization_name: orgName,
          industry: orgIndustry,
          location: selectedLocation,
          website_url: orgWebsite,
          social_media: {
            twitter: orgTwitter,
            linkedin: orgLinkedin,
          },
          operational_details: {
            target_auience: orgAudience,
            service_offered: orgService,
            tech_used: orgTechUsed,
          },
          access_token: accessToken,
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
    uploadDetails();
  };

  ///////////////// SIGN UP VALUES
  const emailInput = (e) => {
    setEmail(e.target.value);
  };
  const passwordInput = (e) => {
    setOrgPassword(e.target.value);
  };
  const industryInput = (newValue) => {
    setOrgIndustry(newValue); // Use the selected value directly
    console.log(newValue); // Debugging
  };
  const locationInput = (selectedLocation) => {
    setOrgLocation(selectedLocation.description); // Update state with the selected location
    console.log("Selected Location:", selectedLocation);
  };
  
  const websiteInput = (e) => {
    setOrgWebsite(e.target.value);
  };
  const EmailInput = (e) => {
    setOrgEmail(e.target.value);
  };
  const logoInput = (e) => {
    setOrgLogo(e.target.value);
  };
  const pcpName = (e) => {
    setOrgPcpName(e.target.value);
  };
  const NumberInput = (e) => {
    setOrgNumber(e.target.value);
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
  const setSpecialization = (e) => {
    setOrgSpecialization(e.target.value)
  }
  const twitterInput =(e) => {
    setOrgTwitter(e.target.value)
  }
  const linkedinInput=(e) =>{
    setOrgLinkedin(e.target.value)
  }
  const founderInput=(e)=>{
    setOrgFounder(e.target.value)
  }
  const excoInput=(e)=>{
    setOrgExcos(e.target.value)
  }
  const setTeamsize=(e)=>{
    setOrgTeamsize(e.target.value)
  }
  const setCareerspage=(e)=>{
    setOrgCareerspage(e.target.value)
  }
  const revenueInput=(newValue) => {
    setRevenue(newValue);
    console.log("Selected Revenue:", newValue); // Debugging
  };
  // The function passed to the dropdown to handle the input change
  const fundingInput = (newValue) => {
    setFunding(newValue);
    console.log("Funding selected:", newValue); // Debugging the selected funding
  };
  const clientInput = (selectedValue) =>{
    setOrgClient(selectedValue)
    console.log("Selected Client:", selectedValue);
  }
  const privacyInput =(newValue) => {
    setOrgPrivacyInput(newValue)
  }
  const certificationsInput=(newValue) => {
    setOrgCertifications(newValue)
    
  }
  
    // Handle file upload
    const handleIndividualFileUpload = (file) => {
      setUploadedFile(file); // Store file in state
    };
  
    // Handle file removal
    const handleIndividualFileRemove = () => {
      setUploadedFile(null); // Clear the file
    };

      // Function to check if the organization name exists
  const checkOrgNameExists = async (name) => {
    if (!name.trim()) return; // Avoid empty queries

    try {
      const response = await fetch(
        `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api?org_name=${encodeURIComponent(name)}`
      );
      const data = await response.json();

      if (data.exists) {
        toast.warning("Organization name already exists. Try another name.");
      }
    } catch (error) {
      console.error("Error checking org name:", error);
    }
  };
  ////////////// HANDLE CURRENT SLIDE ////////////////////////
  const handleCurrentSlide = () => {
    if (currentSlide === "basic-info") {
      return (
        <BasicInfoContainer
        orgName={orgName}
        setOrgName={setOrgName}
        checkOrgNameExists={checkOrgNameExists} // Passing function as prop
          websiteInput={websiteInput}
          setOrgIndustry={setOrgIndustry}
          locationInput={handleLocationSelection}
          handleBasicInfoSlide={handleBasicInfoSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
        />
      );
    } else if (currentSlide === "contact-details") {
      return (
        <ContactDetailsContainer
          EmailInput={EmailInput}
          pcpName={pcpName}
          NumberInput={NumberInput}
          twitterInput={twitterInput}
          handleContactDetailsSlide={handleContactDetailsSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
          linkedinInput={linkedinInput}
        />
      );
    } else if (currentSlide === "operational-details") {
      return (
        <OperationalDetails
          setOrgAudience={setOrgAudience}
          serviceInput={serviceInput}
          techUsedInput={techUsedInput}
          loading={loading}
          handleOperationDetailsSlide={handleOperationDetailsSlide}
          setCurrentSlide={setCurrentSlide}
          setSpecialization={setSpecialization}
        />
      );
    } else if (currentSlide === "leadership-team") {
      return (
        <LeadershipAndTeam
        setCareerspage={setCareerspage}
        setTeamsize={setTeamsize}
        founderInput={founderInput}
        excoInput={excoInput}
        setCurrentSlide={setCurrentSlide}
        handleLeadershipAndTeamSlide={handleLeadershipAndTeamSlide}
        />
      );
    } else if (currentSlide === "financial-info") {
      return (
        <FinancialInformation
        handleFinancialInformationSlide={handleFinancialInformationSlide}
        revenueInput={handleRevenueSelect} // ✅ Capture revenue model selection
        fundingInput={handleFundingSelect}
        clientInput={clientInput}
        setCurrentSlide={setCurrentSlide}

        />
      );
    } else if (currentSlide === "compliance-certification") {
      return (
        <ComplianceandCert
        privacyInput={privacyInput}
        certificationsInput={certificationsInput}
        loading={loading}
        currentSlide={currentSlide}
        uploadedFile={uploadedFile}
        handleUploadDetails={handleUploadDetails}
        setCurrentSlide={setCurrentSlide}
        handleIndividualFileUpload={handleIndividualFileUpload}
        handleIndividualFileRemove={handleIndividualFileRemove}

        />
      );
    } else if (currentSlide === "org-upload-loading") {
      return <OrgUploadLoading />;
    } else if (currentSlide === "org-upload-success") {
      return <OrgUploadSuccess />;
    } else
      return (
<BasicInfoContainer
        orgName={orgName}
        setOrgName={setOrgName}
        checkOrgNameExists={checkOrgNameExists} // Passing function as prop
          websiteInput={websiteInput}
          setOrgIndustry={setOrgIndustry}
          locationInput={handleLocationSelection}
          handleBasicInfoSlide={handleBasicInfoSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
/>

      );
  };
  
  return (
    <div
      className="w-full h-full"
      // onClick={(e) => setDisplay(false) + e.stopPropagation()}
    >
      {handleCurrentSlide()}
    </div>
  );
}

export default OrgUploadDetails;
