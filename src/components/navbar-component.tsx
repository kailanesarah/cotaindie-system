"use client";

import { HomeIcon } from "./UI/icons";
import MenuDesktop from "./UI/menu-desktop";
import MenuMobile from "./UI/menu-mobile";

const NavbarComponent = () => {
  return (
    <nav className="fixed top-0 left-64 z-50 flex items-center justify-between p-2 bg-white w-[calc(100%-16rem)] shadow-md">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <a href="#" className="flex items-center gap-1 hover:underline">
          <HomeIcon className="w-5 h-5" /> <span>Início</span>
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
