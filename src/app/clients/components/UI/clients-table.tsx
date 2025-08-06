interface Client {
  name: string;
  category: "Pessoa física" | "Pessoa jurídica";
  cpf?: string;
  cnpj?: string;
  phone: string;
  email: string;
  city: string;
  zipCode: string;
  neighborhood: string;
  address: string;
  complement?: string;
  notes?: string;

}

interface ClientsTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export function ClientsTable({ clients, onEdit, onDelete }: ClientsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="w-full min-w-[900px] table-auto">
        <thead className="bg-blue-600 text-white sticky top-0">
          <tr>
            {[
              "Nome",
              "Categoria",
              "CPF",
              "CNPJ",
              "Telefone",
              "Email",
              "Cidade",
              "CEP",
              "Bairro",
              "Endereço",
              "Complemento",
              "Observações",
              "Ações",
            ].map((header) => (
              <th
                key={header}
                className="px-6 py-4 text-left font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clients.map((client, idx) => (
            <tr
              key={idx}
              className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-100 transition-colors duration-200`}
            >
              <td className="px-6 py-4 text-gray-800">{client.name}</td>
              <td className="px-6 py-4 text-gray-700">{client.category}</td>
              <td className="px-6 py-4 text-gray-600">{client.cpf ?? "-"}</td>
              <td className="px-6 py-4 text-gray-600">{client.cnpj ?? "-"}</td>
              <td className="px-6 py-4 text-gray-700">{client.phone}</td>
              <td className="px-6 py-4 text-blue-600 underline cursor-pointer">{client.email}</td>
              <td className="px-6 py-4 text-gray-700">{client.city}</td>
              <td className="px-6 py-4 text-gray-700">{client.zipCode}</td>
              <td className="px-6 py-4 text-gray-700">{client.neighborhood}</td>
              <td className="px-6 py-4 text-gray-700">{client.address}</td>
              <td className="px-6 py-4 text-gray-600 italic">{client.complement ?? "-"}</td>
              <td className="px-6 py-4 text-gray-600 italic">{client.notes ?? "-"}</td>
              <td className="px-6 py-4 flex justify-center gap-3">
                <button
                  onClick={() => onEdit(client)}
                  className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`Editar ${client.name}`}
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(client)}
                  className="px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label={`Deletar ${client.name}`}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
