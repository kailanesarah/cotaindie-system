"use client";

import { ToastCard } from "@/components/ui/toast-card";
import {
  CuttingPlanDocument,
  type CuttingPlanDocumentProps,
} from "@/pdfs/_docs/cutting-plan-document";
import { pdf } from "@react-pdf/renderer";
import toast from "react-hot-toast";

export const useGenerateCuttingPlanDocument = () => {
  const generateCuttingPlanDocument = async (
    data: CuttingPlanDocumentProps,
  ) => {
    if (!data.client.name) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Cliente não encontrado"
          text="Adicione um cliente antes de gerar o plano de corte."
        />
      ));
      return;
    }

    if (!data.plan?.title) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Título do plano ausente"
          text="Preencha o título do plano antes de gerar o documento."
        />
      ));
      return;
    }

    if (!data.plan.projects || data.plan.projects.length === 0) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Nenhuma peça de M2 foi adicionada"
          text="Deve haver ao menos um peça de M2 em um dos projetos para gerar o plano de corte."
        />
      ));
      return;
    }

    const loadingToast = toast((t) => (
      <ToastCard
        id={t.id}
        status="info"
        title="Gerando plano de corte..."
        text="Seu documento está sendo processado."
      />
    ));

    try {
      const blob = await pdf(<CuttingPlanDocument {...data} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url);

      toast.dismiss(loadingToast);
      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Plano de corte gerado!"
          text="O documento foi aberto em uma nova aba."
        />
      ));
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao gerar plano de corte"
          text="Tente novamente em instantes."
        />
      ));
    }
  };

  return { generateCuttingPlanDocument };
};
