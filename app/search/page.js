import BenFooter from "@/components/common/BenFooter";
import SearchPageContainer from "@/components/search-page/SearchPageContainer";

export default function SearchPage() {
  return (
    <main className="relative flex flex-col items-center justify-between h-full w-full mx-auto">
      <SearchPageContainer />
      <BenFooter/>
    </main>
  );
}
