"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ROUTES } from "@/constants/urls";
import type { ReactNode } from "react";

export const AddOrderButton = ({ children }: { children: ReactNode }) => {
  const handleClick = () => {
    window.open(ROUTES.PRIVATE.ORDER, "_blank");
  };

  return (
    <Button onClick={handleClick}>
      <Icon name="add_2" />
      {children}
    </Button>
  );
};
