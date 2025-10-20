import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/idGenerator";
import { insertEntityToTable } from "../supabase/supabase-service";
import { insertAdditionalInfo } from "./additional-info-service";
import { insertPaymentConditions } from "./payment-conditions-service";
import { insertQuotationProducts } from "./products-service";
import { insertQuotationProjects } from "./projects-service";
import type { InformacoesAdicionais } from "./schemas/additional-info-schema ";
import type { CondicoesPagamento } from "./schemas/payment-conditions-schema";
import {
  QuotationCreateSchema,
  type QuotationCreateInfo,
} from "./schemas/quotation-schema";

export const AppendQuotationService = async (
  quotationData: QuotationCreateInfo,
  informacoesAdicionais: InformacoesAdicionais,
  condicoesPagamento: CondicoesPagamento,
) => {
  const parsed = QuotationCreateSchema.safeParse(quotationData);
  if (!parsed.success) {
    return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
  }

  const { product_ids, project_ids, ...quotatioFields } = parsed.data;
  const quotation_id = await generateId("QUO");

  try {
    const quotationResult = await insertEntityToTable(
      { ...quotatioFields, quo_id: quotation_id },
      {
        tableName: "table_quotation",
        idColumnName: "quo_id",
        selectFields: "*",
      },
    );

    const [
      productsResult,
      projectsResult,
      additionalInfoResult,
      paymentConditionsResult,
    ] = await Promise.all([
      insertQuotationProducts(quotation_id, product_ids),
      insertQuotationProjects(quotation_id, project_ids),
      insertAdditionalInfo(quotation_id, informacoesAdicionais),
      insertPaymentConditions(quotation_id, condicoesPagamento),
    ]);

    return {
      success: true,
      quotation: quotationResult.data,
      products: productsResult,
      projects: projectsResult,
      additionalInfo: additionalInfoResult,
      paymentConditions: paymentConditionsResult,
    };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details) };
  }
};
