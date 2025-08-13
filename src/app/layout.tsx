"use client";

import { usePathname } from "next/navigation";
import SidebarComponent from "@/components/sidebar-component";
import { ReactNode } from "react";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const mostrarSidebar = pathname !== "/signin";

  return (
    <html lang="pt-BR">
      <body>
        {mostrarSidebar && (
          <>
            <SidebarComponent />
            <div className="sm:ml-64">
              {/* Espaço do navbar fixo */}
              <div className="pt-16">{children}</div>
            </div>
          </>
        )}

        {!mostrarSidebar && <main>{children}</main>}
      </body>
    </html>
  );
}
