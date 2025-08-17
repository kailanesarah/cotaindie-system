"use client";

import SidebarComponent from "@/components/sidebar-component";
import { ROUTES } from "@/constants/urls";
import "@/styles/globals.css";
import "@/styles/material-icons/index.css";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";

const fontAspektaVariable = localFont({
  src: "../../public/fonts/aspekta-variable.woff2",
  variable: "--font-aspekta-variable",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const mostrarSidebar = pathname !== ROUTES.PUBLIC.SIGNIN;

  return (
    <html lang="pt-BR">
      <body className={`${fontAspektaVariable.variable} antialiased`}>
        {mostrarSidebar && <SidebarComponent />}
        <div className={mostrarSidebar ? "sm:ml-64" : ""}>
          <div className={mostrarSidebar ? "mt-16" : ""}>{children}</div>
        </div>
      </body>
    </html>
  );
}
