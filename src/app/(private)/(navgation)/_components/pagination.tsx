"use client";

import { Button } from "@/components/temp/button";
import { Icon } from "@/components/temp/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/temp/select";
import { useSearchContext } from "../_context/search-provider";

export const SearchPagination = () => {
  const { state, dispatch } = useSearchContext();

  const { page, perPage, totalPages } = state.pagination;

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    dispatch({ type: "SET_PAGE", payload: newPage });
  };

  const changePerPage = (newPerPage: number) => {
    dispatch({ type: "SET_PER_PAGE", payload: newPerPage });
  };

  return (
    <div className="border-b-light sticky bottom-0 flex items-center justify-end gap-6 border-t bg-white px-4 py-3 lg:px-6 lg:py-4">
      <div className="flex items-center gap-4 whitespace-nowrap">
        <span className="hidden lg:block">Itens mostrados</span>
        <Select
          value={String(perPage)}
          onValueChange={(value) => changePerPage(Number(value))}
        >
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
        <div className="flex min-w-[4rem] justify-end gap-1 text-right lg:min-w-auto">
          <span className="hidden lg:block">Página</span>
          {page} de {totalPages}
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            square
            onClick={() => changePage(page - 1)}
          >
            <Icon name="arrow_back_ios_new" className="!text-lg lg:!text-xl" />
          </Button>
          <Button
            variant="secondary"
            square
            onClick={() => changePage(page + 1)}
          >
            <Icon name="arrow_forward_ios" className="!text-lg lg:!text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
};
