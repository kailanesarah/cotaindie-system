import type { ClientInput } from "./clients-schema";

export function mapSheetDataToClients(data: any[][]): ClientInput[] {
  return data.map((row) => ({
    client_id: row[0] ?? "",
    client_name: row[1] ?? "",
    client_category: row[2] ?? "",
    client_cpf: row[3] ?? "",
    client_cnpj: row[4] ?? "",
    client_phone: row[5] ?? "",
    client_email: row[6] ?? "",
    client_city: row[7] ?? "",
    client_zipCode: row[8] ?? "",
    client_neighborhood: row[9] ?? "",
    client_address: row[10] ?? "",
    client_complement: row[11] ?? "",
    client_notes: row[12] ?? "",
  }));
}
