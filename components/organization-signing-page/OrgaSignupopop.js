import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BasicInfoContainer from "./components/BasicInfoContainer";
import ContactDetailsContainer from "./components/ContactDetailsContainer";
import OperationalDetails from "./components/OperationalDetails";
import LeadershipAndTeam from "./components/LeadershipAndTeam";
import FinancialInformation from "./components/FinancialInformation";
import ComplianceandCert from "./components/ComplianceandCert";
import OrgUploadLoading from "./OrgUploadLoading";
import OrgUploadSuccess from "./OrgUploadSuccess";

const OrgaSignupopop = () => {
  // Centralized state to store all form data
  const [formData, setFormData] = useState({
    orgName: "",
    orgWebsite: "",
    orgIndustry: "",
    orgLocation: "",
    orgEmail: "",
    orgPcpName: "",
    orgNumber: "",
    orgTwitter: "",
    orgLinkedIn: "",
    orgAudience: "",
    orgService: "",
    orgTechUsed: "",
    orgSpecialization: "",
    orgFounder: "",
    orgExco: "",
    orgTeamsize: "",
    orgCareerspage: "",
    orgClient: "",
    orgFundingInfo: "",
    orgRevenueMode: "",
    orgPrivacyInput: "",
    orgCertifications: "",
    uploadedFile: null,
  });

  // State to manage the current slide and loading state
  const [currentSlide, setCurrentSlide] = useState("basic-info");
  const [loading, setLoading] = useState(false);

  // Function to update form data in the centralized state
  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Function to handle file upload
  const handleFileUpload = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      uploadedFile: file,
    }));
  };

  // Function to handle file removal
  const handleFileRemove = () => {
    setFormData((prevData) => ({
      ...prevData,
      uploadedFile: null,
    }));
  };

  // Function to handle the final upload of details
  const uploadDetails = async () => {
    try {
      // Validate if all fields are filled
      const {
        orgPrivacyInput,
        orgCertifications,
        uploadedFile,
        orgName,
        orgIndustry,
        orgLocation,
        orgWebsite,
        orgTwitter,
        orgAudience,
        orgService,
        orgTechUsed,
        orgLinkedIn,
      } = formData;

      if (!orgPrivacyInput || !orgCertifications || !uploadedFile) {
        toast.warn("Complete all fields!!!");
        return;
      }

      // Set loading state
      setLoading(true);
      setCurrentSlide("org-upload-loading");

      // Prepare the data payload
      const payload = {
        org_id: Number(localStorage.getItem("orgId")),
        organization_name: orgName,
        industry: orgIndustry,
        location: orgLocation,
        website_url: orgWebsite,
        poc: formData.orgPcpName, // Assuming Primary Contact Person's Name is used as POC
        logo_url: "", // Add logic to handle logo URL if needed
        social_media: {
          twitter: orgTwitter,
          linkedin: orgLinkedIn, // Add logic to handle LinkedIn URL if needed
        },
        operational_details: {
          target_audience: orgAudience,
          service_offered: orgService,
          tech_used: orgTechUsed,
        },
        leadership_team: {
          founder: formData.orgFounder,
          executives: formData.orgExco,
          team_size: formData.orgTeamsize,
          careers_page: formData.orgCareerspage,
        },
        financial_information: {
          clients: formData.orgClient,
          funding_info: formData.orgFundingInfo,
          revenue_mode: formData.orgRevenueMode,
        },
        compliance_cert: {
          privacy_policy: formData.orgPrivacyInput,
          certifications: formData.orgCertifications,
          uploaded_file: formData.uploadedFile, // Add logic to handle file upload if needed
        },
      };

      // Send the data to the API
      const response = await axios.put(
        "https://cc7zo6pwqb.execute-api.ap-southeast-2.amazonaws.com/default/voyex_orgV2",
        payload
      );

      // Handle success response
      if (response.status === 200) {
        toast.success(response.data);
        setCurrentSlide("org-upload-success");
      } else {
        setCurrentSlide("basic-info");
      }
    } catch (error) {
      // Handle error response
      if (error.response?.data) {
        toast.error(error.response.data);
      } else {
        toast.error(error.message);
      }
      setCurrentSlide("basic-info");
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  // Wrapper function for uploadDetails
  const handleUploadDetails = async () => {
    uploadDetails();
  };

  // Render the appropriate slide based on currentSlide
  const renderSlide = () => {
    switch (currentSlide) {
      case "basic-info":
        return (
          <BasicInfoContainer
            handleBasicInfoSlide={() => setCurrentSlide("contact-details")}
            handleFormDataChange={handleFormDataChange}
            orgname={formData.orgName}
            orgWebsite={formData.orgWebsite}
            orgIndustry={formData.orgIndustry}
            orgLocation={formData.orgLocation}
          />
        );

      case "contact-details":
        return (
          <ContactDetailsContainer
            setCurrentSlide={setCurrentSlide}
            updateContactDetails={(data) =>
              setFormData((prevData) => ({ ...prevData, ...data }))
            }
          />
        );

      case "operational-details":
        return (
          <OperationalDetails
            setCurrentSlide={setCurrentSlide}
            setOrgAudience={(value) => handleFormDataChange("orgAudience", value)}
            setOrgService={(value) => handleFormDataChange("orgService", value)}
            setOrgTechUsed={(value) => handleFormDataChange("orgTechUsed", value)}
            setSpecialization={(value) =>
              handleFormDataChange("orgSpecialization", value)
            }
            orgAudience={formData.orgAudience}
            orgService={formData.orgService}
            orgTechUsed={formData.orgTechUsed}
            orgSpecialization={formData.orgSpecialization}
          />
        );

      case "leadership-team":
        return (
          <LeadershipAndTeam
            handleLeadershipAndTeamSlide={() =>
              setCurrentSlide("financial-information")
            }
            setCurrentSlide={setCurrentSlide}
            updateParentState={handleFormDataChange} // Pass update function
          />
        );

      case "financial-information":
        return (
          <FinancialInformation
            handleFinancialInformationSlide={() =>
              setCurrentSlide("compliance-cert")
            }
            setCurrentSlide={setCurrentSlide}
            updateParentState={handleFormDataChange} // Pass update function
          />
        );

      case "compliance-cert":
        return (
          <ComplianceandCert
            setCurrentSlide={setCurrentSlide}
            loading={loading}
            setLoading={setLoading}
            toast={toast}
            updateParentState={handleFormDataChange} // Pass update function
            handleUploadDetails={handleUploadDetails}
          />
        );

      case "org-upload-loading":
        return <OrgUploadLoading />; // Add a loading screen component here

      case "org-upload-success":
        return <OrgUploadSuccess />; // Add a success screen component here

        default:
            console.error("Invalid currentSlide value:", currentSlide); // Debug log
            return (
              <div className="text-center">
                <p className="text-red-500">An unexpected error occurred.</p>
                <button
                  className="mt-4 bg-purple text-white px-4 py-2 rounded"
                  onClick={() => setCurrentSlide("basic-info")}
                >
                  Go Back to Start
                </button>
              </div>
            );
    ;
    }
  };

  return <div className="fixed z-10 w-full h-full inset-0 flex items-center justify-center backdrop-blur-sm">
    {renderSlide()}
    </div>;
};

export default OrgaSignupopop;