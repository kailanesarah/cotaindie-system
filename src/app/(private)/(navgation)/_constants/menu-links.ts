import { ROUTES } from "@/constants/urls";

export const sidebarLinks = [
  {
    title: "Dashboard",
    description: "Dados gerais e números",
    href: ROUTES.PRIVATE.DASHBOARD,
    icon: "dashboard_customize",
  },
  {
    title: "Orçamentos",
    description: "Pedidos finalizados e cotados",
    href: "#",
    icon: "document_scanner",
  },
  {
    title: "Materiais",
    description: "Materia prima usada",
    href: ROUTES.PRIVATE.PRODUCTS,
    icon: "inventory_2",
  },
  {
    title: "Clientes",
    description: "Carteira de clientes",
    href: "#",
    icon: "article_person",
  },
];
