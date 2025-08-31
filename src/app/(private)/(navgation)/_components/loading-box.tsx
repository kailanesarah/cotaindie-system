"use client";

import { Icon } from "@/components/ui/icon";
import { useSearchContext } from "../_context/seach-provider";

export const LoadingBox = () => {
  const { loading } = useSearchContext();

  if (!loading) return;

  return (
    <div className="rounded-default border-b-light flex h-full grow flex-col items-center justify-center gap-6 border-[1.5px] border-dashed p-6 pb-10">
      <div className="mb-8 flex flex-col items-center gap-2">
        <Icon
          name="cached"
          className="text-red-default animate-spin"
          size={24}
        />
        <div className="text-title-light text-base font-semibold">
          Carregando...
        </div>
      </div>
    </div>
  );
};
