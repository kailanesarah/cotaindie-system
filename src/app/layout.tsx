"use client";

import SidebarComponent from "@/components/sidebar-component";
import { ROUTES } from "@/constants/urls";
import "@/styles/globals.css";
import "@/styles/material-icons/index.css";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

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
        <aside>
          {" "}
          <Toaster
            gutter={16}
            position="bottom-right"
            toastOptions={{
              style: {
                transition: "0ms",
                height: "auto",
                maxWidth: "none",
                padding: 0,
                margin: 0,
                boxShadow: "none",
              },
            }}
            containerStyle={{
              margin: 0,
              padding: 0,
              bottom: "3rem",
              right: "3rem",
            }}
          />
        </aside>
        <div className={mostrarSidebar ? "sm:ml-64" : ""}>
          <div className={mostrarSidebar ? "mt-16" : ""}>{children}</div>
        </div>
      </body>
    </html>
  );
}
