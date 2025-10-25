"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { ClientsService } from "@/services/clients-services";

export async function getClientsAction(): Promise<Client[]> {
  try {
    const supabase = await supabaseServer();
    const clientsService = new ClientsService(supabase);

    return (await clientsService.getClients()).items;
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar os clients.");
  }
}
