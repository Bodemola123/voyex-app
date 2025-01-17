// import OrgSignupPopup from "@/components/organization-signing-page/OrgSignupPopup";

function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-5">
      {children}
      {/* <OrgSignupPopup /> */}
    </div>
  );
}

export default AuthLayout;
