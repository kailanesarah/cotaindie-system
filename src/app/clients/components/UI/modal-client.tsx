"use client";

import { ClientInput } from "@/modules/clients/clients-schema";
import { ClientForm } from "./form-client";
import { X } from "lucide-react";

interface ClientModalProps {
  show: boolean;
  onClose: () => void;
  clientData?: ClientInput;
  onSubmit: (data: ClientInput, isEditing: boolean) => void;
}

export function ClientModal({
  show,
  onClose,
  clientData,
  onSubmit,
}: ClientModalProps) {
  if (!show) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
    >
      <div className="relative bg-white rounded-2xl w-full max-w-3xl shadow-xl p-6 sm:p-8">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>

        <ClientForm
          initialData={clientData}
          isEditing={!!clientData}
          onSubmitAction={(data) => {
            onSubmit(data, !!clientData);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
