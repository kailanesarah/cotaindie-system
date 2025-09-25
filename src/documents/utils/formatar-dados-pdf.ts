import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { costInput } from "@/modules/costs/schemas/costs-schemas";
import type { pieceInput } from "@/modules/piece/schemas/pieces-schemas";
import type { ProductInput } from "@/modules/products/schema/products-schema";
import type { projectInput } from "@/modules/projects/schemas/project-schema";

import type { CondicoesPagamento } from "../types/condicoes-pagamento";
import type { InformacoesAdicionais } from "../types/infos-adicionais";
import type { EmpresaInfo } from "../types/simple-header";
import { objetoParaTabela } from "./objetoParaTabela";

interface FormatPDFParams {
  empresa?: EmpresaInfo[];
  clients?: ClientInput[];
  products?: ProductInput[];
  projects?: projectInput[];
  costs?: costInput[];
  pieces?: pieceInput[];
  infos?: InformacoesAdicionais[];
  condicoesPagamento?: CondicoesPagamento[];
}

interface FormatPDFReturn {
  empresaData: string[][];
  contratanteData: string[][];
  clientesLinhas: string[][];

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
    Status?: string;
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
}: FormatPDFParams): FormatPDFReturn {
  const formatCurrency = (value: number) => `R$ ${value.toFixed(2)}`;

  // Clientes
  const clientesLinhas = clients.flatMap((cliente) =>
    objetoParaTabela({
      Nome: cliente.client_name,
      Código: cliente.client_id ?? "",
    }),
  );

  const contratanteData = clients.flatMap((cliente) =>
    objetoParaTabela({
      Nome: cliente.client_name,
      Código: cliente.client_id ?? "-",
      Categoria: cliente.client_category ?? "-",
      CPF: cliente.client_cpf ?? "-",
      CNPJ: cliente.client_cnpj ?? "-",
      Telefone: cliente.client_phone ?? "-",
      Email: cliente.client_email ?? "-",
      Cidade: cliente.client_city ?? "-",
      CEP: cliente.client_zipCode ?? "-",
      Bairro: cliente.client_neighborhood ?? "-",
      Endereço: cliente.client_address ?? "-",
      Complemento: cliente.client_complement ?? "-",
      Observações: cliente.client_notes ?? "-",
    }),
  );

  // Empresa
  const empresaData = empresa.flatMap((emp) =>
    objetoParaTabela({
      Nome: emp.nome,
      CNPJ: emp.cnpj ?? "-",
      PMF: emp.pmf ?? "-",
      IE: emp.ie ?? "-",
      Endereço: emp.endereco ?? "-",
      Cidade: emp.cidade ?? "-",
      Estado: emp.estado ?? "-",
      CEP: emp.cep ?? "-",
      WhatsApp: emp.whatsapp ?? "-",
    }),
  );

  // Materiais
  const materiaisDados = products.map((product) => {
    const qtd = 2; // default
    return {
      Código: product.product_id ?? "",
      Material: product.product_name,
      QtdeInt: 1,
      Qtd: qtd,
      Medida: product.product_measurements,
      ValorUnitario: product.product_price,
      Total: product.product_price * qtd,
    };
  });

  // Projetos
  const projetosDados = projects.map((proj) => ({
    Código: proj.project_id ?? "",
    NomeProjeto: proj.project_name,
    Quantidade: proj.project_quantity,
    Status: proj.project_status,
  }));

  // Custos
  const custosDados = costs.map((cost) => ({
    Código: cost.cost_id ?? "",
    Equipe: cost.cost_name,
    Quantidade: cost.cost_quantity,
    Valor: cost.cost_value_uni,
    Total: cost.cost_total_value,
  }));

  // Peças
  const pecasDados = pieces.map((piece) => ({
    Código: piece.piece_id ?? "",
    Nome: piece.piece_name,
  }));

  // Totais
  const totalMateriais = materiaisDados.reduce(
    (sum, item) => sum + Number(item.Total),
    0,
  );
  const totalCustos = custosDados.reduce(
    (sum, item) => sum + Number(item.Total || 0),
    0,
  );

  return {
    empresaData,
    contratanteData,
    clientesLinhas,
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
