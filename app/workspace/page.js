import AddProductBtn from "@/components/workspace-page/AddProductBtn";
import Product from "@/components/workspace-page/Product";
import { FiSearch } from "react-icons/fi";

function WorkSpace() {
  return (
    <main className="w-full mt-5">
          <div className="relative  w-[198px]">
            <FiSearch className="absolute top-2 left-2 w-6 h-6 text-white" />
            <input
              type="text"
              placeholder="Search models"
              className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card w-48 text-white placeholder-white"
            />
          </div>
      <div className="grid grid-cols-3 w-full gap-4 mt-10">
        <Product />
        <Product />
        <AddProductBtn />
      </div>
    </main>
  );
}

export default WorkSpace;
