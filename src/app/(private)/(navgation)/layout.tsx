import { SidebarProvider } from "@/components/ui/sidebar";
import { supabaseServer } from "@/lib/supabase/server";
import { AuthService } from "@/services/auth-services";
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
  const supabase = await supabaseServer();
  const authService = new AuthService(supabase);

  const data = await authService.getUser();

  const profile = {
    name: data?.name || "Usuário",
    role: data?.role === "ADMIN" ? "Administrador" : (data?.role ?? "Sistema"),
    avatar: data?.avatar,
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
