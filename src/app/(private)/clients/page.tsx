import { getClientsAction } from "@/app/(private)/clients/actions/clients-actions";
import { ClientsTable } from "@/app/(private)/clients/components/UI/clients-table";
import { requireSession } from "@/modules/auth/api/utils";
import { ClientForm } from "./components/UI/form-client";

export default async function ClientsPage() {
  const clients = await getClientsAction();
  const session = await requireSession();

  return (
    <main className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Lista de Clientes
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Visualize, edite ou gerencie os clientes cadastrados.
          </p>
        </header>

        {/* Conteúdo */}
        <section className="bg-white shadow-md rounded-2xl p-4 sm:p-6 space-y-8">
          {/* Tabela com rolagem horizontal */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <ClientsTable clients={clients} />
          </div>

          {/* Formulário de cadastro */}
          <div>
            <ClientForm />
          </div>
        </section>
      </div>
    </main>
  );
}
