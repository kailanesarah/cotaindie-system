// src/data/mocks.ts
import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { costInput } from "@/modules/costs/schemas/costs-schemas";
import type { pieceInput } from "@/modules/piece/schemas/pieces-schemas";
import type { ProductInput } from "@/modules/products/schema/products-schema";
import type { projectInput } from "@/modules/projects/schemas/project-schema";
import type { CondicoesPagamento } from "../types/condicoes-pagamento";
import type { InformacoesAdicionais } from "../types/infos-adicionais";

// ===========================================
// Condições de Pagamento
// ===========================================
export const condicoesPagamentoMock: CondicoesPagamento[] = [
  {
    planoDePagamento: "A combinar",
    adiantamento: "R$ 432,54",
    dataDaVenda: "30/05/2025",
    pagamentoDoRestante: "A combinar",
    previsaoDeEntrega: "45 dias úteis após a data da venda",
    restante: "1 X de R$ 805,60 = R$ 805,60",
  },
];

// ===========================================
// Projetos
// ===========================================
export const projetosMock: projectInput[] = [
  {
    project_id: "P-001",
    project_name: "Móveis da cozinha",
    client_id: "C-A4T4zJFf",
    project_status: "Em andamento",
    project_quantity: 2,
    project_profit_margin: 25.5,
    project_allocated_monthly: 2000,
    project_commission_amount: 500,
  },
  {
    project_id: "P-002",
    project_name: "Aplicativo Mobile",
    client_id: "C-B7K8xYZp",
    project_status: "Concluído",
    project_quantity: 5,
    project_profit_margin: 30,
    project_allocated_monthly: 1500,
    project_commission_amount: 450,
  },
  {
    project_id: "P-003",
    project_name: "SEO e Marketing Digital",
    client_id: "C-C2L9vQWa",
    project_status: "Em espera",
    project_quantity: 8,
    project_profit_margin: 20,
    project_allocated_monthly: 1000,
    project_commission_amount: 300,
  },
];

// ===========================================
// Empresa
// ===========================================
export const empresaMock = [
  {
    nome: "Paulo César Arruda Aragão",
    cnpj: "23.933.978/0001-07",
    pmf: "2008857",
    ie: "06.213.730-1",
    endereco: "Bairro São Paulo",
    cidade: "Viçosa do Ceará",
    estado: "CE",
    cep: "62300000",
    whatsapp: "(88) 9 9735 6008",
    url: "Logo",
    pedido: "Xabdgf",
  },
];

// ===========================================
// Informações Adicionais
// ===========================================
export const dados: InformacoesAdicionais = {
  materiaisInclusos: "Estrutura confeccionada em MDF de alta qualidade",
  materiaisExclusos: "Espelhos, independentemente do tamanho ou espessura",
  observacoes: "Realizar pedido de materiais com antecedência",
  descontoPercentual: 10,
  valorDesconto: "R$ -432,54",
  valorAPagar: "R$ 1.832,54",
  valorPedido: "R$ 2.432,54",
  total: "R$ 2.132,54",
};

// ===========================================
// Clientes
// ===========================================
export const clientesMock: ClientInput[] = [
  {
    client_id: "C-A4T4zJFf",
    client_name: "João da Silva",
    client_category: "Pessoa física",
    client_cpf: "123.456.789-00",
    client_cnpj: "",
    client_phone: "(88) 99999-8888",
    client_email: "joao.silva@example.com",
    client_city: "Viçosa do Ceará",
    client_zipCode: "62300-000",
    client_neighborhood: "Bairro São Paulo",
    client_address: "Rua das Flores, 123",
  },
];

// ===========================================
// Produtos
// ===========================================
export const mockProducts: ProductInput[] = [
  {
    product_id: "m001",
    product_name: "Tábua de Madeira Maciça",
    product_description:
      "Tábua de madeira maciça de pinus, ideal para móveis e prateleiras.",
    product_category: "Madeira",
    product_measurements: "m2",
    product_height: 0.03,
    product_width: 1.2,
    product_price: 250,
    product_waste_rate: 5,
  },
  {
    product_id: "m002",
    product_name: "Parafuso Sextavado Aço Inox",
    product_description:
      "Parafuso sextavado de aço inoxidável para móveis e estruturas.",
    product_category: "Ferragens",
    product_measurements: "uni",
    product_price: 2.5,
    product_waste_rate: 0,
  },
  {
    product_id: "m003",
    product_name: "Cavilha de Madeira",
    product_description:
      "Cavilha cilíndrica de madeira para encaixes em móveis.",
    product_category: "Ferragens",
    product_measurements: "uni",
    product_price: 0.8,
    product_waste_rate: 0,
  },
  {
    product_id: "m004",
    product_name: "Cola de Madeira",
    product_description:
      "Adesivo PVA de alta resistência para colagem de madeiras.",
    product_category: "Acabamentos",
    product_measurements: "uni",
    product_price: 15,
    product_waste_rate: 2,
  },
  {
    product_id: "m005",
    product_name: "Lixa para Madeira",
    product_description:
      "Lixa de grão fino para acabamento de superfícies de madeira.",
    product_category: "Ferramentas",
    product_measurements: "uni",
    product_price: 5,
    product_waste_rate: 0,
  },
  {
    product_id: "m006",
    product_name: "Verniz Transparente",
    product_description:
      "Verniz de secagem rápida para proteção e acabamento da madeira.",
    product_category: "Acabamentos",
    product_measurements: "uni",
    product_price: 30,
    product_waste_rate: 5,
  },
  {
    product_id: "m007",
    product_name: "Tábua MDF 15mm",
    product_description:
      "MDF de 15mm, ótimo para móveis planejados e prateleiras.",
    product_category: "Madeira",
    product_measurements: "m2",
    product_height: 0.015,
    product_width: 1.22,
    product_price: 120,
    product_waste_rate: 7,
  },
  {
    product_id: "m008",
    product_name: "Dobradiça de Metal",
    product_description:
      "Dobradiça de metal resistente para portas de armários.",
    product_category: "Ferragens",
    product_measurements: "uni",
    product_price: 8,
    product_waste_rate: 0,
  },
  {
    product_id: "m009",
    product_name: "Serra Circular",
    product_description:
      "Serra circular elétrica, essencial para cortes precisos em madeira.",
    product_category: "Ferramentas",
    product_measurements: "uni",
    product_price: 450,
    product_waste_rate: 0,
  },
  {
    product_id: "m010",
    product_name: "Óleo de Linhaça",
    product_description: "Óleo de linhaça para acabamento natural da madeira.",
    product_category: "Acabamentos",
    product_measurements: "uni",
    product_price: 25,
    product_waste_rate: 3,
  },
];

// ===========================================
// Custos
// ===========================================
export const mockCosts: costInput[] = [
  {
    cost_id: "c001",
    cost_name: "Parafusos Sextavados",
    cost_quantity: 50,
    cost_value_uni: 2.5,
    cost_total_value: 125,
    project_id: "P-001",
  },
  {
    cost_id: "c002",
    cost_name: "Tábua de Madeira Maciça",
    cost_quantity: 10,
    cost_value_uni: 250,
    cost_total_value: 2500,
    project_id: "P-001",
  },
  {
    cost_id: "c003",
    cost_name: "Cola de Madeira",
    cost_quantity: 5,
    cost_value_uni: 15,
    cost_total_value: 75,
    project_id: "P-002",
  },
  {
    cost_id: "c004",
    cost_name: "Lixa para Madeira",
    cost_quantity: 20,
    cost_value_uni: 5,
    cost_total_value: 100,
    project_id: "P-002",
  },
  {
    cost_id: "c005",
    cost_name: "Verniz Transparente",
    cost_quantity: 3,
    cost_value_uni: 30,
    cost_total_value: 90,
    project_id: "P-003",
  },
];

// ===========================================
// Peças
// ===========================================
export const pieceMock: pieceInput = {
  piece_id: "p123",
  piece_name: "Peça Retangular",
  product_current_value: 150.75,
  piece_height: 200,
  piece_width: 100,
  product_id: "prod456",
  project_id: "proj789",
};

// ===========================================
// Materiais
// ===========================================
export const materiaisMock = {
  inclusos: [
    {
      nome: "MDF Branco 18MM - M28321",
      descricao: "Estrutura confeccionada em MDF de alta qualidade.",
    },
    {
      nome: "Cola de Madeira",
      descricao: "Adesivo PVA de alta resistência para colagem de madeiras.",
    },
  ],
  exclusos: [
    {
      nome: "Espelhos",
      descricao: "Independentemente do tamanho ou espessura.",
    },
    {
      nome: "Puxadores",
      descricao:
        "Não inclusos no projeto, deverão ser fornecidos pelo cliente.",
    },
  ],
};

// ===========================================
// Materiais para PDF
// ===========================================
export const materiaisParaPDF = [
  {
    n: "1",
    nome: "MDF Branco 18MM - M28321",
    corte: "Horizontal e vertical",
    quantidade: 2,
    subItems: [
      {
        n: "1.1",
        nome: "Porta de correr",
        infoExtra: "( Altura: 32cm, Largura 25cm)",
        quantidade: 2,
      },
      {
        n: "1.2",
        nome: "Prateleira simples",
        infoExtra: "(MDF Beige - Altura: 32cm, Largura 16cm)",
        quantidade: 1,
      },
    ],
  },
  {
    n: "2",
    nome: "Chapa 1 (2.75x1.83 m)",
    corte: "Horizontal",
    quantidade: 1,
    subItems: [
      {
        n: "2.1",
        nome: "Gaveta",
        infoExtra: "( Altura: 15cm, Largura 30cm)",
        quantidade: 4,
      },
    ],
  },
];
