import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";
import { sidebarLinks } from "./_constants/menu-links";

export default function NavigationLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar menuItems={sidebarLinks} />
      <div className="flex grow flex-col">{children}</div>
    </SidebarProvider>
  );
}
