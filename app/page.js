import Footer from "@/components/common/Footer";
import HomeDiv from "@/components/home-page/HomeDiv";
import HomeNavbar from "@/components/home-page/HomeNavbar";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center w-full h-full">
      <HomeNavbar />
      <HomeDiv />
      <Footer />
    </main>
  );
}
