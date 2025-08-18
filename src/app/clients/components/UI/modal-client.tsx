import type { ClientInput } from "@/modules/clients/clients-schema";
import { X } from "lucide-react";
import { ClientForm } from "./form-client";

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
}: Readonly<ClientModalProps>) {
  if (!show) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black px-4"
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 transition hover:text-gray-700"
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
