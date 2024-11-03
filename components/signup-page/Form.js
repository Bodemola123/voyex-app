import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { FaRegEyeSlash } from "react-icons/fa6";

// function SignUpForm() {
//   return (
//     <div className="flex flex-col w-1/2">
//       <h1 className="text-5xl font-bold text-center">Voyex.</h1>
//       <div className="flex items-center justify-end space-x-2 mt-3 ">
//         <Switch id="airplane-mode" />
//         <Label htmlFor="airplane-mode" className="text-base font-normal">
//           Join as an organization
//         </Label>
//       </div>

//       <label className="text-sm font-medium mt-5">Enter your email</label>
//       <input
//         // type="email"
//         placeholder="abc example.com"
//         className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
//       />

//       <label className="text-sm font-medium mt-4">Password</label>
//       <div className="relative w-full">
//         <input
//           // type="password"
//           placeholder="*********"
//           className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2 w-full"
//         />
//         <button className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
//           <FaRegEyeSlash />
//         </button>
//       </div>

//       <button className="flex items-center justify-center text-lg font-medium w-full h-14 rounded-full bg-btnlime mt-4">
//         sign up
//       </button>

//       <p className="flex items-center justify-center text-sm font-medium gap-1.5 mt-4">
//         Already have an Account?{" "}
//         <span>
//           <Link href="/login" className="font-bold uppercase text-btnlime">
//             login
//           </Link>
//         </span>
//       </p>

//       <button className="flex items-center justify-center gap-2 text-[#1C1D26] text-xl font-medium w-full h-[3.75rem] rounded-full bg-white mt-7">
//         <Image src="/google.png" alt="google logo" width={30} height={30} />
//         Continue with google
//       </button>
//     </div>
//   );
// }

// export default SignUpForm;

function Form() {
  return (
    <main className="w-full lg:w-1/2 h-full">
      <section className=" relative flex justify-center items-center mx-auto w-full h-full">
        <div className="w-full h-full max-w-[600px] flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-center">Voyex.</h1>
          <div className="flex items-center justify-end space-x-2 mt-3 ">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode" className="text-base font-normal">
              Join as an organization
            </Label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium mt-5">Enter your email</label>
            <input
              type="email"
              placeholder="abc example.com"
              className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium mt-4">Password</label>
            <div className="relative w-full">
              <input
                type="password"
                placeholder="*********"
                className="h-14 rounded-full px-4 bg-[#171920] outline-none mt-2 w-full"
              />
              <button className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
                <FaRegEyeSlash />
              </button>
            </div>
          </div>

          <button className="flex items-center justify-center text-lg font-medium w-full h-14 rounded-full bg-btnlime mt-4 capitalize">
            sign up
          </button>

          <p className="flex items-center justify-center text-sm font-medium gap-1.5 mt-4">
            Already have an Account?{" "}
            <span>
              <Link href="/login" className="font-bold uppercase text-btnlime">
                login
              </Link>
            </span>
          </p>

          <button className="flex items-center justify-center gap-2 text-[#1C1D26] text-xl font-medium w-full h-[3.75rem] rounded-full bg-white mt-7">
            <Image src="/google.png" alt="google logo" width={30} height={30} />
            Continue with google
          </button>
        </div>
      </section>
    </main>
  );
}
export default Form;
