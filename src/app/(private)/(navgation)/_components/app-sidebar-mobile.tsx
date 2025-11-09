"use client";

import { useLogout } from "@/app/(private)/_hooks/use-logout";
import LogoSymbol from "@/assets/imgs/logo-symbol.svg";
import LogoTitle from "@/assets/imgs/logo-title.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/constants/urls";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getInitialLetters } from "../_utils/get-initial-letters";

interface TAppSidebarLink {
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface TAppSidebarProfile {
  name: string;
  imageUrl?: string | null;
  role?: string;
}

interface IAppSidebarMobile {
  links: TAppSidebarLink[];
  profile: TAppSidebarProfile;
}

export const SidebarMobile = ({ links, profile }: IAppSidebarMobile) => {
  const pathname = usePathname();
  const { execute } = useLogout();

  const initials = getInitialLetters(profile.name || "");

  return (
    <Sheet>
      <SheetTrigger className="border-l-dark flex h-[4.5rem] w-[4.5rem] cursor-pointer flex-col items-center justify-center gap-2 border-l">
        <div className="bg-title-dark h-[1px] w-8" />
        <div className="bg-title-dark h-[1px] w-8" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-black-default w-full gap-0 p-0 duration-100 lg:hidden"
      >
        <SheetTitle className="hidden">Menu mobile</SheetTitle>
        <SheetHeader className="border-b-dark flex h-[4.5rem] flex-row justify-between border-b p-0">
          <Link
            href={ROUTES.PRIVATE.DASHBOARD}
            className="border-r-dark flex h-[4.5rem] items-center justify-center gap-1.5 border-r px-5"
          >
            <Image
              src={LogoSymbol}
              priority
              alt="Logo Cota Indie"
              width={24}
              className="w-[1.5rem]"
            />
            <Image
              src={LogoTitle}
              priority
              alt="Logo Cota Indie"
              width={88}
              className="w-[5.5rem]"
            />
          </Link>
          <SheetClose className="border-l-dark relative flex h-[4.5rem] w-[4.5rem] cursor-pointer items-center justify-center border-l">
            <div className="bg-title-dark absolute h-[1px] w-8 rotate-45" />
            <div className="bg-title-dark absolute h-[1px] w-8 -rotate-45" />
          </SheetClose>
        </SheetHeader>
        <div className="text-title-dark flex flex-col pb-2">
          {links.map(({ title, description, href, icon }, index) => {
            const isActive = pathname === href;
            return (
              <SheetClose asChild key={title + index}>
                <Link
                  href={href}
                  className={`border-b-dark flex items-center gap-3 border-b p-4 hover:bg-gray-800 ${
                    isActive ? "bg-black-light/75" : ""
                  }`}
                >
                  <Icon name={icon} size={20} />
                  <div className="flex flex-col">
                    <span>{title}</span>
                    <span className="text-body-darker text-xs opacity-75">
                      {description}
                    </span>
                  </div>
                </Link>
              </SheetClose>
            );
          })}
        </div>
        <SheetFooter className="gap-0 p-0">
          <button className="border-t-dark group mt-auto flex items-center gap-3 border-t p-4 focus:outline-none">
            <Avatar>
              <AvatarImage src={profile.imageUrl || ""} alt={profile.name} />
              <AvatarFallback className="bg-red-darker/25 text-red-lightest">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="-mt-0.5 flex flex-col gap-0 text-left">
              <span className="text-title-dark font-semibold">
                {profile.name}
              </span>
              <span className="text-body-dark/75 text-xs">{profile.role}</span>
            </div>
          </button>
          <div className="border-t-dark mt-auto border-t p-4">
            <button
              onClick={() => execute()}
              className="flex w-full items-center gap-2 rounded bg-red-600 py-2 text-white"
            >
              <Icon name="logout" size={20} />
              Logout
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
