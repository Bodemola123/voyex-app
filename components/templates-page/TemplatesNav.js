import Link from "next/link";
import React from "react";
import { BsAirplaneEngines } from "react-icons/bs";

const navLinks = [
  { name: "Marketing", href: "/templates/marketing" },
  { name: "E-commerce", href: "/templates/e-commerce" },
  { name: "Ads", href: "/templates/ads" },
  { name: "Content Writing", href: "/templates/content-writing" },
  { name: "Education", href: "/templates/education" },
  { name: "AI", href: "/templates/ai" },
];

function TemplatesNav() {
  return (
    <div className="sticky top-0 left-0 flex items-center justify-between w-full z-20">
      <div className="flex items-center justify-start gap-6">
        {navLinks.map((link) => {
          return (
            <Link
              href={link.href}
              className="text-base text-fontlight font-medium py-3 px-4 border border-card rounded-xl hover:bg-card/30"
              key={link.name}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <Link
        href="/templates/explore-template"
        className="flex items-center gap-2 text-base text-fontlight font-medium bg-black py-3 px-4 rounded-xl"
      >
        <BsAirplaneEngines />
        <span>Explore Template</span>
      </Link>
    </div>
  );
}

export default TemplatesNav;
