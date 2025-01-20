import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

function SignOptions({ googleSignup }) {
  return (
    <div className="mt-[4rem]">
      <span className="">Other sign in options</span>
      <div className="flex items-center gap-4 mt-4">
        <button className="flex items-center justify-center text-2xl w-[50px] h-[50px] bg-white border border-[#D8DADC] rounded-full">
          <FaFacebookF className="text-[#3C5A99]" />
        </button>
        <button
          className="flex items-center justify-center text-2xl w-[50px] h-[50px] bg-white border border-[#D8DADC] rounded-full"
          onClick={() => googleSignup()}
        >
          <FcGoogle />
        </button>
        <button className="flex items-center justify-center text-2xl w-[50px] h-[50px] bg-white border border-[#D8DADC] rounded-full">
          <FaApple className="text-black" />
        </button>
      </div>
    </div>
  );
}

export default SignOptions;
