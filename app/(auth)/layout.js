function AuthLayout({ children }) {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-5">
      {children}
    </div>
  );
}

export default AuthLayout;
