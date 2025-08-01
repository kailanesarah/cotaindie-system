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
}

export function ClientsTable({ clients }: ClientsTableProps) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Nome</th>
          <th className="border border-gray-300 p-2">Categoria</th>
          <th className="border border-gray-300 p-2">CPF</th>
          <th className="border border-gray-300 p-2">CNPJ</th>
          <th className="border border-gray-300 p-2">Telefone</th>
          <th className="border border-gray-300 p-2">Email</th>
          <th className="border border-gray-300 p-2">Cidade</th>
          <th className="border border-gray-300 p-2">CEP</th>
          <th className="border border-gray-300 p-2">Bairro</th>
          <th className="border border-gray-300 p-2">Endereço</th>
          <th className="border border-gray-300 p-2">Complemento</th>
          <th className="border border-gray-300 p-2">Observações</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client, idx) => (
          <tr key={idx} className="odd:bg-gray-100">
            <td className="border border-gray-300 p-2">{client.name}</td>
            <td className="border border-gray-300 p-2">{client.category}</td>
            <td className="border border-gray-300 p-2">{client.cpf ?? "-"}</td>
            <td className="border border-gray-300 p-2">{client.cnpj ?? "-"}</td>
            <td className="border border-gray-300 p-2">{client.phone}</td>
            <td className="border border-gray-300 p-2">{client.email}</td>
            <td className="border border-gray-300 p-2">{client.city}</td>
            <td className="border border-gray-300 p-2">{client.zipCode}</td>
            <td className="border border-gray-300 p-2">{client.neighborhood}</td>
            <td className="border border-gray-300 p-2">{client.address}</td>
            <td className="border border-gray-300 p-2">{client.complement ?? "-"}</td>
            <td className="border border-gray-300 p-2">{client.notes ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
