// src/utils/formatar-dados-pdf.ts
import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { costInput } from "@/modules/costs/schemas/costs-schemas";
import type { pieceInput } from "@/modules/piece/schemas/pieces-schemas";
import type { ProductInput } from "@/modules/products/schema/products-schema";
import type { projectInput } from "@/modules/projects/schemas/project-schema";
import type { InformacoesAdicionais } from "@/modules/quotation/schemas/additional-info-schema ";
import type { CondicoesPagamento } from "@/modules/quotation/schemas/payment-conditions-schema";
import type { EmpresaInfo } from "../types/simple-header";

// Função genérica de filtro com alias
export function filterFieldsWithAlias<T extends Record<string, any>>(
  data: T[],
  fieldsToShow?: (keyof T)[],
  aliasMap?: Record<keyof T, string>,
): Record<string, any>[] {
  if (!fieldsToShow) return data;

  return data.map((item) => {
    const filtered: Record<string, any> = {};
    fieldsToShow.forEach((field) => {
      const key = aliasMap?.[field] ?? (field as string);
      filtered[key] = item[field] ?? "";
    });
    return filtered;
  });
}

interface FormatPDFParams {
  empresa?: EmpresaInfo[];
  clients?: ClientInput[];
  products?: ProductInput[];
  projects?: projectInput[];
  costs?: costInput[];
  pieces?: pieceInput[];
  infos?: InformacoesAdicionais[];
  condicoesPagamento?: CondicoesPagamento[];
  clientFields?: (keyof ClientInput)[];
  condicoesPagamentoFields?: (keyof CondicoesPagamento)[];
}

export interface FormatPDFReturn {
  empresaData: EmpresaInfo[];
  contratanteData: ClientInput[];
  clientesLinhas: Record<string, any>[];
  condicoesPagamentoLinhas: Record<string, any>[];

  materiaisDados: {
    Código: string;
    Material: string;
    QtdeInt: number;
    Qtd: number;
    Medida?: string;
    ValorUnitario: number;
    Total: number;
  }[];
  projetosDados: {
    Código: string;
    NomeProjeto: string;
    Quantidade?: number;
    "Valor unitário"?: string;
    "Valor total"?: string;
  }[];
  custosDados: {
    Código: string;
    Equipe: string;
    Quantidade?: number;
    Valor?: number;
    Total?: number;
  }[];
  pecasDados: {
    Código: string;
    Nome: string;
  }[];

  totalMateriais: number;
  totalCustos: number;
  totalMateriaisStr: string;
  totalCustosStr: string;
  infosAdicionais: InformacoesAdicionais[];
}

export function formatarDadosParaPDF({
  empresa = [],
  clients = [],
  products = [],
  projects = [],
  costs = [],
  pieces = [],
  infos = [],
  condicoesPagamento = [],
  clientFields,
  condicoesPagamentoFields,
}: FormatPDFParams): FormatPDFReturn {
  const formatCurrency = (value: number) => `R$ ${value.toFixed(2)}`;

  // Mapas de nomes amigáveis
  const clientFieldNamesMap: Record<keyof ClientInput, string> = {
    client_name: "Nome",
    client_category: "Tipo de Cliente",
    client_phone: "Telefone",
    client_email: "E-mail",
    client_city: "Cidade",
    client_zipCode: "CEP",
    client_neighborhood: "Bairro",
    client_address: "Endereço",
    client_id: "ID",
    client_cpf: "CPF",
    client_cnpj: "CNPJ",
    client_complement: "Complemento",
    client_notes: "Observações",
  };

  const condicoesFieldNamesMap: Record<keyof CondicoesPagamento, string> = {
    previsaoDeEntrega: "Previsão de entrega",
    planoDePagamento: "Plano de pagamento",
    adiantamento: "Adiantamento",
    percentualDeDesconto: "Percentual de desconto (%)",
    valorDoDesconto: "Valor do desconto",
    pagamentoPrincipal: "Pagamento principal",
    pagamentoDoAdiantamento: "Pagamento do adiantamento",
    pagamentoDoRestante: "Pagamento do restante",
    parcelasDoRestante: "Parcelas do restante",
    restante: "Restante",
    dataDaVenda: "Data da venda",
    observacoes: "Observações",
  };

  const condicoesFields =
    condicoesPagamentoFields ??
    (Object.keys(condicoesFieldNamesMap) as (keyof CondicoesPagamento)[]);

  // Formata os dados
  const condicoesPagamentoLinhas = filterFieldsWithAlias(
    condicoesPagamento,
    condicoesFields,
    condicoesFieldNamesMap,
  );

  const clientesLinhas = filterFieldsWithAlias(
    clients,
    clientFields,
    clientFieldNamesMap,
  );

  const materiaisDados = products.map((product) => {
    const qtd = 2; // default
    return {
      Código: product.product_id ?? "",
      Material: product.product_name ?? "",
      QtdeInt: 1,
      Qtd: qtd,
      Medida: product.product_measurements ?? "",
      ValorUnitario: product.product_price ?? 0,
      Total: (product.product_price ?? 0) * qtd,
    };
  });

  const projetosDados = projects.map((proj) => ({
    Código: proj.project_id ?? "",
    NomeProjeto: proj.project_name ?? "",
    Quantidade: proj.project_quantity,
    "Valor unitário": "2.0000",
    "Valor total": "5.0000",
  }));

  const custosDados = costs.map((cost) => ({
    Código: cost.cost_id ?? "",
    Equipe: cost.cost_name ?? "",
    Quantidade: cost.cost_quantity,
    Valor: cost.cost_value_uni,
    Total: cost.cost_total_value,
  }));

  const pecasDados = pieces.map((piece) => ({
    Código: piece.piece_id ?? "",
    Nome: piece.piece_name ?? "",
  }));

  const totalMateriais = materiaisDados.reduce(
    (sum, item) => sum + item.Total,
    0,
  );
  const totalCustos = custosDados.reduce(
    (sum, item) => sum + (item.Total ?? 0),
    0,
  );

  return {
    empresaData: empresa,
    contratanteData: clients,
    clientesLinhas,
    condicoesPagamentoLinhas,
    materiaisDados,
    projetosDados,
    custosDados,
    pecasDados,
    totalMateriais,
    totalCustos,
    totalMateriaisStr: formatCurrency(totalMateriais),
    totalCustosStr: formatCurrency(totalCustos),
    infosAdicionais: infos,
  };
}
