import { customAlphabet } from "nanoid";

const numericNanoid = customAlphabet("0123456789", 6);

export async function generateId(): Promise<string> {
  return numericNanoid();
}
