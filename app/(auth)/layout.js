import AuthHeader from "@/components/signup-page/AuthHeader";

function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen px-5 md:px-16 pt-2 md:pt-8 pb-5 md:pb-16">
      <AuthHeader />
      {children}
    </div>
  );
}

export default AuthLayout;
