"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { useSignOut } from "../../_hooks/use-sign-out";

export const DropdownLogout = () => {
  const { execute } = useSignOut();
  const handleClick = () => execute();

  return (
    <DropdownMenuItem onClick={handleClick} className="text-red-default">
      <Icon name="logout" /> Sair da conta
    </DropdownMenuItem>
  );
};
