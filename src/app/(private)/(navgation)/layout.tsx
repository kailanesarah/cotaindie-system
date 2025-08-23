import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";
import { AppSidebar } from "./_components/app-sidebar";
import { Navbar } from "./_components/navbar";
import { sidebarLinks } from "./_constants/menu-links";

export default function NavigationLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar menuItems={sidebarLinks} />
      <div className="flex grow flex-col">
        <Navbar />
        {children}
      </div>
    </SidebarProvider>
  );
}
