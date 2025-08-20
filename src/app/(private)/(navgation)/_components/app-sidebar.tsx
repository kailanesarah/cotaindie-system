"use client";

import { useSignOut } from "@/app/(private)/_hooks/use-sign-out";
import LogoSymbol from "@/assets/imgs/logo-symbol.svg";
import LogoTitle from "@/assets/imgs/logo-title.svg";
import { Icon } from "@/components/ui/icon";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  SidebarButton,
  SidebarLink,
  SidebarLinkContent,
  SidebarLinkDescription,
  SidebarLinkIcon,
  SidebarLinkTitle,
} from "@/components/ui/sidebar-button";
import { ROUTES } from "@/constants/urls";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TAppSidebarItem = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

export function AppSidebar({
  menuItems,
  ...props
}: React.ComponentProps<typeof Sidebar> & { menuItems: TAppSidebarItem[] }) {
  const pathname = usePathname();

  const { execute } = useSignOut();
  const handleClick = () => execute();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b-dark border-b">
        <SidebarMenu className="h-[4.5rem] px-4 group-data-[collapsible=icon]:px-0">
          <SidebarMenuItem className="my-auto group-data-[collapsible=icon]:mx-auto">
            <Link
              href={ROUTES.PRIVATE.DASHBOARD}
              className="flex items-center gap-[0.375rem] px-2 py-2 group-data-[collapsible=icon]:p-4"
            >
              <Image
                src={LogoSymbol}
                alt="Logo Cota Indie"
                width={19}
                className="min-w-[1.1875rem]"
              />
              <Image
                src={LogoTitle}
                alt="Logo Cota Indie"
                className="transition-all duration-200 group-data-[collapsible=icon]:hidden"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="flex flex-col gap-2 px-4 py-6 group-data-[collapsible=icon]:px-1">
            {menuItems.map(({ title, description, href, icon }) => {
              const isActive = pathname === href;

              return (
                <SidebarMenuItem
                  key={title}
                  className="group-data-[collapsible=icon]:mx-auto"
                >
                  <SidebarMenuButton asChild>
                    <SidebarLink href={href} isCurrent={isActive}>
                      <SidebarLinkIcon name={icon} />
                      <SidebarLinkContent className="whitespace-nowrap group-data-[collapsible=icon]:hidden">
                        <SidebarLinkTitle>{title}</SidebarLinkTitle>
                        {isActive && (
                          <SidebarLinkDescription>
                            {description}
                          </SidebarLinkDescription>
                        )}
                      </SidebarLinkContent>
                    </SidebarLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-b-dark min-h-[4.5rem] border-t">
        <SidebarMenu className="my-auto flex items-center gap-3 p-4 group-data-[collapsible=icon]:flex-col">
          <SidebarMenuItem className="grow group-data-[collapsible=icon]:order-2">
            <SidebarButton onClick={handleClick}>
              <SidebarLinkIcon name="logout" />
              <SidebarLinkContent className="group-data-[collapsible=icon]:hidden">
                <SidebarLinkTitle>Logout</SidebarLinkTitle>
              </SidebarLinkContent>
            </SidebarButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarTrigger>
              <Icon name="dock_to_right" size={20} />
            </SidebarTrigger>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
