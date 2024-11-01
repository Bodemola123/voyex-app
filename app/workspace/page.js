import AddProductBtn from "@/components/workspace-page/AddProductBtn";
import Product from "@/components/workspace-page/Product";

function WorkSpace() {
  return (
    <main className="w-full mt-5">
      <p className="text-base font-normal text-fontlight">
        Where the cosmic meets the artificial, offering a stellar selection of
        AI companions tailored
        <br /> to your interstellar adventures
      </p>
      <div className="grid grid-cols-3 w-full gap-4 mt-10">
        <Product />
        <Product />
        <AddProductBtn />
      </div>
    </main>
  );
}

export default WorkSpace;
