"use client";

import { ToastCard } from "@/components/ui/toast-card";
import {
  ContractDocument,
  type ContractDocumentProps,
} from "@/pdfs/_docs/contract-document";
import { pdf } from "@react-pdf/renderer";
import toast from "react-hot-toast";

export const useGenerateContractDocument = () => {
  const generateContractDocument = async (data: ContractDocumentProps) => {
    if (!data.company) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro"
          text="Informações da empresa não encontradas."
        />
      ));
      return;
    }

    if (!data.client) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Adicione um cliente"
          text="Por favor, selecione o cliente que é dono do contrato."
        />
      ));
      return;
    }

    if (!data.contract?.projects || data.contract.projects.length === 0) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Adicione ao menos um projeto"
          text="Informações do contrato incompletas."
        />
      ));
      return;
    }

    if (!data.contract?.name || data.contract.name.trim() === "") {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Título do contrato"
          text="Preencha o título do contrato antes de gerar o documento."
        />
      ));
      return;
    }

    const payment = data.payment;

    if (
      !payment?.paymentMethod ||
      !payment?.advanceAmount ||
      !payment?.initialDate ||
      !payment?.remainingPaymentInfo
    ) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Preencha as informações de pagamento"
          text="Certifique-se de preencher: método de pagamento, adiantamento, data da venda, entrega e parcelas."
        />
      ));
      return;
    }

    const t = toast((t) => (
      <ToastCard
        id={t.id}
        status="info"
        title="Gerando contrato..."
        text="Breve seu contrato estará pronto!"
      />
    ));

    try {
      const blob = await pdf(<ContractDocument {...data} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url);

      toast.dismiss(t);
      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Contrato gerado!"
          text="O contrato foi aberto em nova aba."
        />
      ));
    } catch (err) {
      console.error(err);

      toast.dismiss(t);
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao gerar contrato!"
          text="Tente novamente em instantes."
        />
      ));
    }
  };

  return { generateContractDocument };
};
