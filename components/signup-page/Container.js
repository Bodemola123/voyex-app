import Form from "./Form";
import ImageSide from "./ImageSide";

function Container() {
  return (
    <main className="h-screen overflow-y-scroll no-scrollbar">
      <section className="flex w-full h-full items-center">
        <Form />
        <ImageSide />
      </section>
    </main>
  );
}
export default Container;
