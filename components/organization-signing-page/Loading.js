import Image from "next/image";
import Link from "next/link";

function Loading() {
  return (
    <main className="relative max-w-[666px] w-full h-[90vh] p-6 rounded-[29px] bg-black overflow-y-scroll">
      <div className=" flex flex-col items-center gap-7 h-full">
        <Image
          src="/loading.png"
          alt="loading"
          width={136}
          height={136}
          className="animate-spin"
        />
        <h1 className="text-fontlight text-3xl font-bold text-center">
          Creating Account
        </h1>
        <p className="text-base text-fontlight text-center font-light">
          Please wait while your account is being
          <br /> created
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

export default Loading;
