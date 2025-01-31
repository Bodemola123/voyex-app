import TemplateAside from "@/components/templates-page/TemplateAside";
import TemplatesNav from "@/components/templates-page/TemplatesNav";

export default function TemplateLayout({ children }) {
  return (
    <div className="relative flex flex-col w-full h-full mt-5 px-10">
      <TemplatesNav />
      <div className="relative flex items-center justify-between w-full h-full overflow-y-scroll mt-5 mb-10 gap-4 no-scrollbar">
        <div className="relative w-full h-full">{children}</div>
        <TemplateAside />
      </div>
    </div>
  );
}
