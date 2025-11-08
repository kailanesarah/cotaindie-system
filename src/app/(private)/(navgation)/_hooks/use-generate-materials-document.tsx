"use client";

import { ToastCard } from "@/components/temp/toast-card";
import {
  MaterialsDocument,
  type MaterialsDocumentProps,
} from "@/pdfs/_docs/materials-document";
import { pdf } from "@react-pdf/renderer";
import toast from "react-hot-toast";

export const useGenerateMaterialsDocument = () => {
  const generateMaterialsDocument = async (data: MaterialsDocumentProps) => {
    if (!data.client?.name) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Cliente não encontrado"
          text="Adicione um cliente antes de gerar o relatório."
        />
      ));
      return;
    }

    if (!data.report?.title) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Título do orçamento ausente"
          text="Preencha o nome ou título do orçamento antes de gerar o relatório."
        />
      ));
      return;
    }

    if (!data.report.projects || data.report.projects.length === 0) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Nenhum projeto encontrado"
          text="Adicione ao menos um projeto ao pedido antes de gerar o relatório."
        />
      ));
      return;
    }

    const t = toast((t) => (
      <ToastCard
        id={t.id}
        status="info"
        title="Gerando relatório..."
        text="Seu relatório está sendo processado."
      />
    ));

    try {
      const blob = await pdf(<MaterialsDocument {...data} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url);

      toast.dismiss(t);
      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Relatório gerado!"
          text="O documento foi aberto em uma nova aba."
        />
      ));
    } catch (err) {
      console.error(err);
      toast.dismiss(t);
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao gerar relatório"
          text="Tente novamente em instantes."
        />
      ));
    }
  };

  return { generateMaterialsDocument };
};
