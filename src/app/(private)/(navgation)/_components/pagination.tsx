"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const SearchPagination = () => {
  const [pagination, setPagination] = useState("5");

  return (
    <div className="border-b-light sticky bottom-0 flex items-center justify-end gap-6 border-t bg-white px-6 py-4">
      <div className="flex items-center gap-4 whitespace-nowrap">
        Itens mostrados
        <Select value={pagination} onValueChange={setPagination}>
          <Button variant="secondary" asChild>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
          </Button>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4 whitespace-nowrap">
        Página 1 de 5
        <div className="flex gap-3">
          <Button variant="secondary" square>
            <Icon name="arrow_back_ios_new" />
          </Button>
          <Button variant="secondary" square>
            <Icon name="arrow_forward_ios" />
          </Button>
        </div>
      </div>
    </div>
  );
};
