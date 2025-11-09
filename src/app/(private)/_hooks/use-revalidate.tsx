"use client";

import { useRouter } from "next/navigation";
import { revalidatePaths } from "../_actions/use-revalidate-paths";

export function useRevalidatePaths() {
  const router = useRouter();

  async function revalidate(paths: string[]) {
    router.refresh();
    await revalidatePaths(paths);
  }

  return { revalidate };
}
