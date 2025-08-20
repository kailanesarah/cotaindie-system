"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Icon } from "@/components/ui/icon";
import { ROUTES } from "@/constants/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarBreadcrumb() {
  const pathname = usePathname();

  const currentPage = pathname?.split("/").filter(Boolean).pop() || "Home";

  const formattedPage =
    currentPage.charAt(0).toUpperCase() +
    currentPage.slice(1).replace(/-/g, " ");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Icon name="home" size={20} className="-mt-1" />
          <BreadcrumbLink asChild>
            <Link href={ROUTES.PRIVATE.DASHBOARD}>Início</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{formattedPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
