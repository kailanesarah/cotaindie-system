"use client";

import { SelectFilter } from "../../_components/search-bar";
import { useGetClients } from "../../_hooks/use-get-clients";

export const SelectClients = () => {
  const { data: clients } = useGetClients();

  return (
    <SelectFilter
      filterKey="client"
      deafultText="Todos os clientes"
      options={clients}
    />
  );
};
