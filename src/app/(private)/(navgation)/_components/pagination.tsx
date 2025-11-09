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

  const displayPage = totalPages === 0 ? 0 : page;
  const displayTotal = totalPages || 0;

  return (
    <div className="border-b-light sticky bottom-0 flex items-center justify-end gap-6 border-t-0 bg-white px-4 py-3 shadow-[0_0px_12px_0px_rgba(0,0,0,0.07)] lg:px-6 lg:py-4 lg:shadow-none">
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
          {displayPage} de {displayTotal}
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            square
            onClick={() => changePage(page - 1)}
            disabled={page <= 1}
          >
            <Icon name="arrow_back_ios_new" className="!text-lg lg:!text-xl" />
          </Button>
          <Button
            variant="secondary"
            square
            onClick={() => changePage(page + 1)}
            disabled={page >= totalPages}
          >
            <Icon name="arrow_forward_ios" className="!text-lg lg:!text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
};
