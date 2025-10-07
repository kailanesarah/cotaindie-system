import "@/styles/globals.css";
import "@/styles/material-icons/index.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { HotjarClient } from "./_components/hotjar";
import { Toast } from "./_components/toast";
import { metadataApplication } from "./metadata";

const fontAspektaVariable = localFont({
  src: "../../public/fonts/aspekta-variable.woff2",
  variable: "--font-aspekta-variable",
});

export const metadata: Metadata = metadataApplication;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="no-scrollbar">
      <body className={`${fontAspektaVariable.variable} !m-0 antialiased`}>
        <aside>
          <Toast />
        </aside>
        <div className="flex min-h-dvh flex-col lg:flex-row">{children}</div>
        <HotjarClient />
      </body>
    </html>
  );
}
