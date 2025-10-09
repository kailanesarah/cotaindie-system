import { nanoid } from "nanoid";

export async function generateId(prefix: string): Promise<string> {
  return `${prefix}-${nanoid(8)}`;
}
