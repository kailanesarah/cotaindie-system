import { SidebarProvider } from "@/components/ui/sidebar";
import { requireUserServer } from "@/services/auth/supabase-auth-service";
import type { ReactNode } from "react";
import { AppSidebar } from "./_components/app-sidebar";
import { Navbar } from "./_components/navbar";
import { NavbarMobile } from "./_components/navbar-mobile";
import { sidebarLinks } from "./_constants/menu-links";

export default async function NavigationLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await requireUserServer();
  const user = session?.user_metadata ?? { name: "", imageUrl: "", url: "" };

  const profile = {
    name: user.name ?? "",
    role: "Administrador",
    imageUrl: "",
  };

  return (
    <SidebarProvider>
      <div className="hidden lg:block">
        <AppSidebar menuItems={sidebarLinks} />
      </div>
      <div className="relative flex grow flex-col">
        <Navbar profile={profile} />
        <NavbarMobile profile={profile} />
        {children}
      </div>
    </SidebarProvider>
  );
}
