"use server";

import { clients } from "../clients/_constants/clients";

export async function getClientsAction(): Promise<Client[]> {
  try {
    return clients;
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar os clients.");
  }
}
