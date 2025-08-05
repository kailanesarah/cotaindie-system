import { ClientInput } from "./schema";

export function mapSheetDataToClients(data: any[][]): ClientInput[] {
  return data.map((row) => ({
    id: row[0] ?? "",
    name: row[1] ?? "",
    category: row[2] ?? "",
    cpf: row[3] ?? "",
    cnpj: row[4] ?? "",
    phone: row[5] ?? "",
    email: row[6] ?? "",
    city: row[7] ?? "",
    zipCode: row[8] ?? "",
    neighborhood: row[9] ?? "",
    address: row[10] ?? "",
    complement: row[11] ?? "",
    notes: row[12] ?? "",
  }));
}
