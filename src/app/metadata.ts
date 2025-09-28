import type { Metadata } from "next";

export const metadataApplication: Metadata = {
  title: "Cotaindie - Orçamentos e Pedidos Personalizados",
  description:
    "Cotaindie facilita a criação de orçamentos e o gerenciamento de pedidos de personalizados de forma simples e intuitiva.",
  openGraph: {
    title: "Cotaindie - Orçamentos e Pedidos Personalizados",
    description:
      "Gerencie seus pedidos e crie orçamentos de personalizados de forma simples e prática.",
    url: "https://cotaindie.com",
    siteName: "Cotaindie",
    images: [
      {
        url: "/images/og-image.png",
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
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
};
