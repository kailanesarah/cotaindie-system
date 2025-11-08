"use client";

import { DropdownMenuItem } from "@/components/temp/dropdown-menu";
import { Icon } from "@/components/temp/icon";
import { useLogout } from "../../_hooks/use-logout";

export const DropdownLogout = () => {
  const { execute } = useLogout();
  const handleClick = () => execute();

  return (
    <DropdownMenuItem onClick={handleClick} className="text-red-default">
      <Icon name="logout" /> Sair da conta
    </DropdownMenuItem>
  );
};
