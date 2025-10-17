import { useOrderStore } from "@/app/(private)/order/_stores/order-store";

export function getPDFDataFromStore() {
  const order = useOrderStore.getState().order;

  const empresa = order.empresa ?? [];

  // CLIENTES
  const clients = (order.client ?? []) as any[];
  const formattedClients = clients.map((c) => ({
    Nome: c.name ?? "",
    Código: c.code ?? "",
    Telefone: c.phone ?? "",
    Cidade: c.city ?? "",
    CPF: c.cpf ?? "",
    CNPJ: c.cnpj ?? "",
    Endereço: c.address ?? "",
    Bairro: c.neighborhood ?? "",
    Complemento: c.complement ?? "",
    Email: c.email ?? "",
    Observações: c.notes ?? "",
  }));

  // PROJETOS
  const projects = (order.projects ?? []) as any[];
  const formattedProjects = projects.map((p) => ({
    "Nome do Projeto": p.name ?? "",
    Status: p.status ?? "",
    Descrição: p.description ?? "",
    Cliente: p.client_name ?? "",
    Quantidade: p.quantity ?? 0,
    "Margem de Lucro": p.profit_margin ?? 0,
  }));

  // PRODUTOS | MATERIAIS
  const products = (order.products ?? []) as any[];
  const formattedProducts = products.map((p) => ({
    Produto: p.name ?? "",
    Descrição: p.description ?? "",
    Categoria: p.category ?? "",
    Quantidade: p.quantity ?? 0,
    Unidade: p.unit ?? "",
    Valor: p.value ?? 0,
  }));

  // PEÇAS (pieces)
  const pieces = (order.pieces ?? []) as any[];
  const formattedPieces = pieces.map((p) => ({
    "Nome da Peça": p.piece_name ?? "",
    "Altura (cm)": p.piece_height ?? 0,
    "Largura (cm)": p.piece_width ?? 0,
    "Valor do Produto": p.product_current_value ?? 0,
    "Produto Relacionado (ID)": p.product_id ?? "",
    "Projeto Relacionado (ID)": p.project_id ?? "",
  }));

  // CUSTOS
  const costs = (order.costs ?? []) as any[];
  const formattedCosts = costs.map((c) => ({
    Custo: c.name ?? "",
    Valor: c.value ?? 0,
  }));

  // INFORMAÇÕES ADICIONAIS
  const informacoesAdicionais = (order.informacoesAdicionais ?? []) as any[];
  const formattedInfos = informacoesAdicionais.map((i) => ({
    "Materiais Inclusos": i.info_materiais_inclusos ?? "",
    "Materiais Exclusos": i.info_materiais_exclusos ?? "",
    "Observações Internas": i.info_observacoes_equipe_interna ?? "",
  }));

  // CONDIÇÕES DE PAGAMENTO
  const condicoesPagamento = (order.condicoesPagamento ?? []) as any[];
  const formattedCondicoesPagamento = condicoesPagamento.map((c) => ({
    "Previsão de Entrega": c.pag_previsao_de_entrega ?? "",
    "Plano de Pagamento": c.pag_plano_de_pagamento ?? "",
    Adiantamento: c.pag_adiantamento ?? "",
    "Percentual de Desconto (%)": c.pag_percentual_de_desconto ?? "",
    "Valor do Desconto": c.pag_valor_do_desconto ?? "",
    "Pagamento Principal": c.pag_pagamento_principal ?? "",
    "Pagamento do Adiantamento": c.pag_pagamento_do_adiantamento ?? "",
    "Pagamento do Restante": c.pag_pagamento_do_restante ?? "",
    "Parcelas do Restante": c.pag_parcelas_do_restante ?? "",
    Restante: c.pag_restante ?? "",
    "Data da Venda": c.pag_data_da_venda ?? "",
    Observações: c.pag_observacoes ?? "",
  }));

  return {
    empresa,
    clients: formattedClients,
    projects: formattedProjects,
    products: formattedProducts,
    pieces: formattedPieces,
    costs: formattedCosts,
    informacoesAdicionais: formattedInfos,
    condicoesPagamento: formattedCondicoesPagamento,
  };
}
