"use client";

import { QuoteDocument } from "@/pdfs/_docs/quote-document";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center space-y-6 p-8">
      <h1 className="text-2xl font-semibold">Gerar e Visualizar PDFs</h1>

      <div className="h-[80vh] w-full rounded-lg border shadow-md">
        <PDFViewer width="100%" height="100%">
          {<QuoteDocument />}
        </PDFViewer>
      </div>
    </main>
  );
}
