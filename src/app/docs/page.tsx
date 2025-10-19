"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contractDocMock } from "@/pdfs/_constants/contract-doc-mock";
import { cuttingPlanDocMock } from "@/pdfs/_constants/cutting-plan-doc-mock";
import { materialsDocMock } from "@/pdfs/_constants/materials-doc-mock";
import { quoteDocMock } from "@/pdfs/_constants/quote-doc-mock";
import { ContractDocument } from "@/pdfs/_docs/contract-document";
import { CuttingPlanDocument } from "@/pdfs/_docs/cutting-plan-document";
import { MaterialsDocument } from "@/pdfs/_docs/materials-document";
import { QuoteDocument } from "@/pdfs/_docs/quote-document";
import dynamic from "next/dynamic";
import { useState } from "react";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

export default function Home() {
  const [docIndex, setDocIndex] = useState(0);

  const documents = [
    {
      id: 1,
      name: "Plano de Corte",
      component: <CuttingPlanDocument {...cuttingPlanDocMock} />,
    },
    {
      id: 2,
      name: "Contrato",
      component: <ContractDocument {...contractDocMock} />,
    },
    {
      id: 3,
      name: "Orçamento",
      component: <QuoteDocument {...quoteDocMock} />,
    },
    {
      id: 4,
      name: "Materiais",
      component: <MaterialsDocument {...materialsDocMock} />,
    },
  ];

  const currentDoc = documents[docIndex];

  return (
    <main className="flex h-dvh w-full flex-col bg-neutral-900 text-white">
      <div className="bg-black-default relative flex p-4">
        <Select
          value={docIndex.toString()}
          onValueChange={(value) => setDocIndex(Number(value))}
        >
          <SelectTrigger className="lg:ml-auto lg:w-56">
            <SelectValue placeholder="Selecionar documento" />
          </SelectTrigger>
          <SelectContent>
            {documents.map((doc, index) => (
              <SelectItem key={doc.id} value={index.toString()}>
                {doc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full grow bg-neutral-900">
        <PDFViewer key={currentDoc.id} width="100%" height="100%">
          {currentDoc.component}
        </PDFViewer>
      </div>
    </main>
  );
}
