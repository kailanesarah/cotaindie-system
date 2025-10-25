import { customAlphabet } from "nanoid";

const numericNanoid = customAlphabet("0123456789", 9);

export async function generateId(): Promise<string> {
  return numericNanoid();
}
