"use client";

import { ContractDocument } from "@/pdfs/_docs/contract-document";
import dynamic from "next/dynamic";
import { useState } from "react";

// --- Import dinâmico do PDFViewer ---
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

// --- Import dinâmico do PDFDownloadLink ---
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false },
);

// --- Mocks ---

export default function Home() {
  const [selectedDoc, setSelectedDoc] = useState("orcamento");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const fileNames: Record<string, string> = {
    espelho: "relatorio.pdf",
    plano: "plano-de-corte.pdf",
    orcamento: "orcamento.pdf",
    contrato: "contrato.pdf",
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center space-y-6 p-8">
      <h1 className="text-2xl font-semibold">Gerar e Visualizar PDFs</h1>

      <div className="flex items-center space-x-4">
        <select
          value={selectedDoc}
          onChange={(e) => setSelectedDoc(e.target.value)}
          className="rounded-lg border p-2"
        >
          <option value="espelho">Espelho de Materiais</option>
          <option value="plano">Plano de Corte</option>
          <option value="orcamento">Orçamento</option>
          <option value="contrato">Contrato</option>
        </select>

        <button
          onClick={handleRefresh}
          className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          🔄 Atualizar Documento
        </button>
      </div>

      <div className="h-[80vh] w-full rounded-lg border shadow-md">
        <PDFViewer
          key={`${selectedDoc}-${refreshKey}`}
          width="100%"
          height="100%"
        >
          {<ContractDocument />}
        </PDFViewer>
      </div>

      <PDFDownloadLink
        document={<ContractDocument />}
        fileName={fileNames[selectedDoc]}
      >
        {({ loading }) =>
          loading ? (
            "Gerando..."
          ) : (
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
              Baixar{" "}
              {selectedDoc.charAt(0).toUpperCase() + selectedDoc.slice(1)}
            </button>
          )
        }
      </PDFDownloadLink>
    </main>
  );
}
