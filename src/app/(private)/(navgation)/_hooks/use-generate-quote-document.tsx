import { ToastCard } from "@/components/ui/toast-card";
import {
  QuoteDocument,
  type QuoteDocumentProps,
} from "@/pdfs/_docs/quote-document";
import { pdf } from "@react-pdf/renderer";
import toast from "react-hot-toast";

export const useGenerateQuoteDocument = () => {
  const generateQuoteDocument = async (data: QuoteDocumentProps) => {
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
          text="Por favor, selecione o cliente que é dono do orçamento."
        />
      ));
      return;
    }

    if (!data.order?.projects || data.order.projects.length === 0) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Adicione ao menos um projeto"
          text="Informações do pedido incompletas."
        />
      ));
      return;
    }

    if (!data.order?.name || data.order.name.trim() === "") {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Título do orçamento"
          text="Preencha o título do orçamento antes de gerar o documento."
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
        title="Gerando orçamento..."
        text="Breve seu orçamento estará pronto!"
      />
    ));

    try {
      const blob = await pdf(<QuoteDocument {...data} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url);

      toast.dismiss(t);
      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Orçamento gerado!"
          text="O orçamento foi aberto em nova aba."
        />
      ));
    } catch (err) {
      console.error(err);

      toast.dismiss(t);
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao gerar orçamento!"
          text="Tente novamente em instantes."
        />
      ));
    }
  };

  return { generateQuoteDocument };
};
