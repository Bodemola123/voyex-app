import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/common/StarBackground.js";
import Animate from "@/components/common/animate";
import StoreProvider from "./StoreProvider";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "@/lib/protectedRoutes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Voyex | Search for anything",
  description:
    "AI website for easy search with well detailed results in text, image or graphs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`relative flex items-center justify-center text-fontlight h-screen w-screen overflow-hidden bg-black bg-[url('/stars.svg.svg')] bg-no-repeat bg-center bg-origin-content bg-cover`}
      >
        <StarsCanvas />
        <Animate />
        <StoreProvider>
          <GoogleOAuthProvider clientId="674221708942-scpkfslkcl6b1h6pgqam7j77es9s50nk.apps.googleusercontent.com">
            <div className="relative w-full h-full z-[10]">{children}</div>
          </GoogleOAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
