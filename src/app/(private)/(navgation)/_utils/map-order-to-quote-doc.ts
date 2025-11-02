import { quoteCompanyInfo } from "@/pdfs/_constants/company-mock";
import type {
  QuoteDocumentProps,
  QuoteProjectProps,
} from "@/pdfs/_docs/quote-document";
import { paymentCategories } from "../../order/_constants/payment-categories";
import { currencyFormatter } from "../../order/_utils/currency-formatter";
import { calculatePieceMaterial } from "../../order/functions/calculate-piece-value";
import { calculateProjectValue } from "../../order/functions/calculate-project-value";
import { formatDate } from "./format-date";

export const mapOrderToQuoteDoc = (
  order: Partial<Order>,
): QuoteDocumentProps => {
  const currency = (value: number) => currencyFormatter.format(value);

  const projects = order.projects ?? [];

  const rawAmount =
    order.projects?.reduce((acc, project) => {
      const projectPieces = project.pieces ?? [];

      const projectPiecesValue = projectPieces.reduce((sum, piece) => {
        const { value } = calculatePieceMaterial(piece);
        return sum + value;
      }, 0);

      const costValue =
        project.costs?.reduce((sum, c) => sum + c.value, 0) ?? 0;
      const { finalValue } = calculateProjectValue(
        projectPiecesValue,
        costValue,
        project.profitRate ?? 0,
        project.monthlyExpense ?? 0,
        project.comission ?? 0,
        project.qtde ?? 1,
      );

      return acc + finalValue;
    }, 0) ?? 0;

  const discountPercent = order.discountPercent ?? 0;
  const discountAmount = rawAmount * discountPercent;
  const finalAmount = rawAmount - discountAmount;
  const installmentCount = order.installmentCount ?? 1;
  const advanceAmount = order.advanceAmount ?? 0;
  const remainingAmount = finalAmount - advanceAmount;

  const quoteProjects: QuoteProjectProps[] = projects.map((p: Project) => {
    const projectPieces = p.pieces ?? [];

    const projectPiecesValue = projectPieces.reduce((acc, piece) => {
      const { value } = calculatePieceMaterial(piece);
      return acc + value;
    }, 0);

    const costValue = p.costs?.reduce((acc, c) => acc + c.value, 0) ?? 0;
    const { finalValue } = calculateProjectValue(
      projectPiecesValue,
      costValue,
      p.profitRate ?? 0,
      p.monthlyExpense ?? 0,
      p.comission ?? 0,
      p.qtde ?? 1,
    );

    const unitPrice = finalValue / (p.qtde ?? 1);

    return {
      name: p.name || "Projeto sem nome",
      qtde: p.qtde ?? 1,
      unitPrice: currency(unitPrice),
      totalPrice: currency(finalValue),
    };
  });

  const paymentMethodName = paymentCategories.find(
    (p) => p.id === order.paymentMethod,
  )?.name;

  return {
    company: quoteCompanyInfo,
    client: {
      name: order.client?.name || "",
      document: order.client?.document || "N/A",
      phone: order.client?.phone || "N/A",
      email: order.client?.email || "N/A",
      code: order.client?.code ? `C${order.client.code}` : undefined,
      address: {
        street: order.client?.street || "",
        complement: order.client?.complement || "",
        neighborhood: order.client?.neighborhood || "",
        city: order.client?.city || "",
        cep: order.client?.cep || "",
      },
    },

    order: {
      code: order.code ?? "",
      name: order.name ?? "",
      generationDate: formatDate(order.initialDate),
      expirationDays: order.expirationDays ?? 0,
      projects: quoteProjects,
      included: order.included || "",
      excluded: order.excluded || "",
      rawAmount: currency(rawAmount),
      discountPercent: Number((discountPercent * 100).toFixed(2)),
      discountAmount: `-${currency(discountAmount)}`,
      finalAmount: currency(finalAmount),
      notes: order.notes ?? "",
    },

    payment: {
      initialDate: order.initialDate ? formatDate(order.initialDate) : "",
      paymentMethod: paymentMethodName ?? "",

      advanceAmount:
        typeof order.advanceAmount === "number"
          ? currency(order.advanceAmount)
          : "",
      deliveryDays: order.deliveryDays,
      remainingPaymentInfo:
        remainingAmount >= 0 ? currency(remainingAmount) : "0",
      installmentsInfo:
        remainingAmount >= 0
          ? `${installmentCount} x ${currency(
              remainingAmount / installmentCount,
            )} = ${currency(remainingAmount)}`
          : "",
    },
  };
};
