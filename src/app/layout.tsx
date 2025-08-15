"use client";
import SidebarComponent from "@/components/sidebar-component";
import "@/styles/globals.css";
import { ROUTES } from "@/constants/urls";
import { usePathname } from "next/navigation";


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
  const mostrarSidebar = pathname !== ROUTES.PUBLIC.SIGNIN;

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {mostrarSidebar && <SidebarComponent />}
      <div className={mostrarSidebar ? "sm:ml-64" : ""}>
        <div className={mostrarSidebar ? "mt-16" : ""}>{children}</div>
      </div>
      </body>
    </html>
  );
}


