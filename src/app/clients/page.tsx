import { getClientsAction } from "@/app/clients/actions/clients-actions";
import { requireSession } from "@/modules/auth/auth-utils";
import { ClientsPageClient } from "./components/ClientsPageClient";

export default async function ClientsPage() {
  const clients = await getClientsAction();
  const session = await requireSession();

  return (
    <main className="min-h-screen bg-[#F4F7FE] px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2B3674]">Lista de Clientes</h1>
          <p className="text-[#A3AED0] mt-2 text-sm sm:text-base">
            Visualize, edite ou gerencie os clientes cadastrados.
          </p>
        </header>
        <ClientsPageClient clients={clients} />
      </div>
    </main>
  );
}
