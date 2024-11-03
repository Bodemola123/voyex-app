import Footer from "@/components/common/Footer";
import AuthHeader from "@/components/signup-page/AuthHeader";
import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen px-5 md:px-16 pt-2 md:pt-8 pb-5 md:pb-16 overflow-y-scroll no-scrollbar">
      <AuthHeader />
      {children}
      {/* <Footer /> */}
    </div>
  );
}

export default AuthLayout;
