"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePaths(paths: string[]) {
  if (!Array.isArray(paths)) {
    throw new Error("paths must be an array");
  }

  paths.forEach((path) => revalidatePath(path));

  return { success: true, revalidated: paths };
}
