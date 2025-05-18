import Link from "next/link";

function SigninLoading() {
  return (
    <main className="relative max-w-[666px] w-full h-[600px] z-[2] p-6 rounded-[29px] bg-[#1C1D1F] overflow-y-scroll border border-[#D0D5DD1A]">
      <div className=" flex flex-col items-center justify-center gap-7 h-full">
        <div
          className={`w-28 h-28 border-[7px] border-t-purple border-r-purple border-purple/30 rounded-full animate-spin`}
        ></div>
        <h1 className="text-fontlight text-3xl font-bold text-center">
          Loading Credentials
        </h1>
        <p className="text-base text-fontlight text-center font-light">
          Please wait while we search account
          <br /> authenticity
        </p>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 text-base font-normal text-purple">
        <a href="https://voyex-landing.vercel.app/terms" target="_blank" rel="noopener noreferrer">
          Terms of use
        </a>
        <a href="https://voyex-landing.vercel.app/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </div>
    </main>
  );
}

export default SigninLoading;
