import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/common/StarBackground.js";
import Animate from "@/components/common/animate";
import StoreProvider from "./StoreProvider";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "@/lib/protectedRoutes";
import Script from "next/script";
import AnalyticsManagerWrapper from "@/components/common/AnalyticsManagerWrapper";


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
              {/* ✅ Google Analytics Scripts */}
              <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PGFEE85662"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PGFEE85662', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

      <body
        className={`relative flex items-center justify-center text-fontlight h-screen w-screen overflow-hidden bg-black bg-[url('/stars.svg.svg')] bg-no-repeat bg-center bg-origin-content bg-cover`}
      >
        <StarsCanvas />
        <Animate />
        <StoreProvider>
          <GoogleOAuthProvider clientId="302027099331-aoihcqn8e4441l4nts3iuisu6fm73198.apps.googleusercontent.com">
            <div className="relative w-full h-full z-[10]">{children}</div>
          </GoogleOAuthProvider>
        </StoreProvider>

                {/* Add the AnalyticsManagerWrapper here */}
                <AnalyticsManagerWrapper />
      </body>
    </html>
  );
}
