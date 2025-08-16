import { getClientsAction } from "@/app/clients/actions/clients-actions";
import { requireSession } from "@/modules/auth/auth-utils";
import { ClientsPageClient } from "./components/clients-page-client";

export default async function ClientsPage() {
  const clients = await getClientsAction();
  const session = await requireSession();

  return (
    <main className="min-h-screen bg-[#F4F7FE] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#2B3674] sm:text-4xl">
            Lista de Clientes
          </h1>
          <p className="mt-2 text-sm text-[#A3AED0] sm:text-base">
            Visualize, edite ou gerencie os clientes cadastrados.
          </p>
        </header>
        <ClientsPageClient clients={clients} />
      </div>
    </main>
  );
}
