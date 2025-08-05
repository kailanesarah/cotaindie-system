"use client";

import { useState } from "react";
import { ClientsTable } from "@/app/(private)/clients/components/UI/clients-table";
import { ClientModal } from "./UI/modal-client";
import { ClientInput } from "@/modules/clients/schema";
import {
  appendClientsAction,
  updateClientsAction,
  getClientByIdAction,
  deleteClientsAction,
} from "../actions/clients-actions";

interface ClientsPageClientProps {
  clients: ClientInput[];
}

export function ClientsPageClient({ clients }: ClientsPageClientProps) {
  const [showModal, setShowModal] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<ClientInput | null>(null);

  function handleCloseModal() {
    setShowModal(false);
    setClientToEdit(null);
  }

  async function handleEdit(client: ClientInput) {
    try {
      const clientData = await getClientByIdAction(client.id!); // pega dados completos
      setClientToEdit(clientData); // preenche formulário
      setShowModal(true); // abre modal
    } catch (error) {
      console.error("Erro ao buscar cliente para edição:", error);
    }
  }

  async function handleSubmit(data: ClientInput, isEditing: boolean) {
    if (isEditing) {
      if (!data.id) {
        console.error("ID do cliente não encontrado!");
        return;
      }
      try {
        await updateClientsAction(data);
        console.log("Cliente atualizado com sucesso!");
        setShowModal(false);
        setClientToEdit(null);
      } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
      }
    } else {
      try {
        await appendClientsAction(data);
        console.log("Cliente criado com sucesso!");
        setShowModal(false);
        setClientToEdit(null);
      } catch (err) {
        console.error("Erro ao criar cliente:", err);
      }
    }
  }

  async function handleDelete(client: ClientInput) {
    if (!client.id) {
      console.error("ID do cliente não encontrado!");
      return;
    }

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este cliente?"
    );
    if (!confirmDelete) return;

    try {
      await deleteClientsAction(client);
      console.log("Cliente excluído com sucesso!");
      setShowModal(false);
      setClientToEdit(null);
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }

  return (
    <>
      <section className="bg-white shadow-md rounded-2xl p-4 sm:p-6 space-y-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Clientes</h2>
          <button
            onClick={() => {
              setClientToEdit(null);
              setShowModal(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Novo Cliente
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <ClientsTable
            clients={clients}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </section>

      {showModal && (
        <ClientModal
          show={showModal}
          onClose={handleCloseModal}
          clientData={clientToEdit || undefined}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
