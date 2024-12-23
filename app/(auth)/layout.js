import AuthHeader from "@/components/signup-page/AuthHeader";

function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-5">
      {/* <AuthHeader /> */}
      {children}
    </div>
  );
}

export default AuthLayout;
