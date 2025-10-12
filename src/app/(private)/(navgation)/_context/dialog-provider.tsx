"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type DialogContextType = {
  dialogs: Record<string, boolean>;
  setDialog: (key: string, value: boolean) => void;
  setAll: (value: boolean) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [dialogs, setDialogs] = useState<Record<string, boolean>>({});

  const setDialog = (key: string, value: boolean) =>
    setDialogs((prev) => ({ ...prev, [key]: value }));

  const setAll = (value: boolean) => {
    const newState: Record<string, boolean> = {};
    Object.keys(dialogs).forEach((k) => (newState[k] = value));
    setDialogs(newState);
  };

  return (
    <DialogContext.Provider value={{ dialogs, setDialog, setAll }}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx)
    throw new Error("useDialogContext must be used inside a DialogProvider");
  return ctx;
}
