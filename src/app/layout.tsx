import "@/styles/globals.css";
import "@/styles/material-icons/index.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClarityClient } from "./_components/clarity";
import { HotjarClient } from "./_components/hotjar";
import { Toast } from "./_components/toast";

const fontAspektaVariable = localFont({
  src: "../../public/fonts/aspekta-variable.woff2",
  variable: "--font-aspekta-variable",
});

export const metadata: Metadata = {
  title: "Cotaindie - Orçamentos e Pedidos Personalizados",
  description:
    "Cotaindie facilita a criação de orçamentos e o gerenciamento de pedidos personalizados de forma simples e intuitiva.",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    title: "Cotaindie - Orçamentos e Pedidos Personalizados",
    description:
      "Gerencie seus pedidos e crie orçamentos personalizados de forma simples e prática.",
    url: "https://cotaindie.com",
    siteName: "Cotaindie",
    images: [
      {
        url: "/images/ogi.png",
        width: 1200,
        height: 630,
        alt: "Cotaindie - Sistema de Orçamentos e Pedidos Personalizados",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cotaindie - Orçamentos e Pedidos Personalizados",
    description:
      "Crie orçamentos e gerencie pedidos personalizados de forma simples e intuitiva.",
    images: ["/images/ogi.png"],
  },
};

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
        <ClarityClient />
      </body>
    </html>
  );
}
