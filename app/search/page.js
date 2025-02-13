import BenFooter from "@/components/common/BenFooter";
import SearchPageContainer from "@/components/search-page/SearchPageContainer";
import '../../app/globals.css'

export default function SearchPage() {
  return (
    <main className="relative flex flex-col gap-4 items-center justify-center h-full w-full mx-auto">
      <SearchPageContainer />
    </main>
  );
}
