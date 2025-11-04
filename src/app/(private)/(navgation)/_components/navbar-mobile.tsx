"use client";

import LogoSymbol from "@/assets/imgs/logo-symbol.svg";
import { ROUTES } from "@/constants/urls";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "../_constants/menu-links";
import { SidebarMobile } from "./app-sidebar-mobile";
import { NavbarBreadcrumb } from "./navbar-breadcrump";

interface INavbarMobile {
  profile: { name: string; role: string; avatar?: string };
}

export const NavbarMobile = ({ profile }: INavbarMobile) => {
  return (
    <nav className="border-b-light bg-black-default sticky top-0 z-50 flex h-[4.5rem] items-center shadow-[0_0.5rem_3rem_-1rem_rgba(0,0,0,0.16)] lg:hidden">
      <div className="flex grow items-center justify-between">
        <Link
          href={ROUTES.PRIVATE.DASHBOARD}
          className="border-r-dark flex h-[4.5rem] w-[4.5rem] items-center justify-center border-r"
        >
          <Image src={LogoSymbol} alt="Logo Cota Indie" width={24} />
        </Link>
        <div className="flex grow items-center justify-between gap-4 px-6 pr-0">
          <NavbarBreadcrumb />
          <SidebarMobile links={sidebarLinks} profile={profile} />
        </div>
      </div>
    </nav>
  );
};
