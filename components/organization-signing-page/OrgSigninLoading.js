import Link from "next/link";

function OrgSigninLoading() {
  return (
    <main className="relative max-w-[666px] w-full h-[600px] z-[2] p-6 rounded-[29px] bg-[#1C1D1F] overflow-y-scroll">
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
        <Link href="/terms_of_use" className="">
          Terms of use
        </Link>
        <Link href="/privacy_policy" className="">
          Privacy Policy
        </Link>
      </div>
    </main>
  );
}

export default OrgSigninLoading;
