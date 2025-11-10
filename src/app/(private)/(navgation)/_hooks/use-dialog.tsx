"use client";

import { useDialogContext } from "../_context/dialog-provider";

export function useDialog(key?: string) {
  const { dialogs, setDialog, setAll } = useDialogContext();

  const open = key
    ? (dialogs[key] ?? false)
    : Object.values(dialogs).some(Boolean);

  const setOpen = (value: boolean) => {
    if (key) setDialog(key, value);
    else setAll(value);
  };

  return { open, setOpen };
}
