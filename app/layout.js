import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/common/StarBackground.js";
import Image from "next/image";
import Animate from "@/components/common/animate";
import StoreProvider from "./StoreProvider";

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
        className={`${inter.className} relative flex items-center justify-center text-fontlight h-screen w-screen overflow-hidden bg-black`}
      >
        <StarsCanvas />
        <Image
          className="absolute top-0 bottom-0 right-0 left-0 z-0 w-screen h-screen bg-contain"
          src="/background.png"
          alt="galaxy"
          width={1419}
          height={766}
        />
        <Animate />
        <div className="relative w-full h-full z-[2]">
          <StoreProvider>{children}</StoreProvider>
        </div>
      </body>
    </html>
  );
}
