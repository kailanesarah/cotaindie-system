"use client";

import { HomeIcon } from "./ui/icons";
import MenuDesktop from "./ui/menu-desktop";
import MenuMobile from "./ui/menu-mobile";

const NavbarComponent = () => {
  return (
    <nav className="fixed top-0 left-64 z-50 flex w-[calc(100%-16rem)] items-center justify-between bg-white p-2 shadow-md">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <a href="#" className="flex items-center gap-1 hover:underline">
          <HomeIcon className="h-5 w-5" /> <span>Início</span>
        </a>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">Página atual</span>
      </div>

      {/* Menus */}
      <div className="flex items-center gap-6">
        <MenuDesktop />
        <MenuMobile />
      </div>
    </nav>
  );
};

export default NavbarComponent;
