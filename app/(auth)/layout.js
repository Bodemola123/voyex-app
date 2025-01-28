function AuthLayout({ children }) {
  return (
    <div className="relative h-full w-full flex items-center justify-center p-5">
      {/* previous shadow for auth cards */}
      {/* <div className="absolute shadow z-[2] h-[100px] rounded-full w-[100px] bg-white left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2"></div> */}
      {children}
    </div>
  );
}

export default AuthLayout;
