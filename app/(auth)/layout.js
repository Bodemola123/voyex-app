import Footer from "@/components/common/Footer";
import AuthHeader from "@/components/signup-page/AuthHeader";
import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen px-16 pt-8 pb-16 overflow-y-scroll no-scrollbar">
      <AuthHeader />
      {children}
      {/* <Footer /> */}
    </div>
  );
}

export default AuthLayout;
