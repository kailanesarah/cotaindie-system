"use client";

import { mockMaterialsDocument } from "@/pdfs/_constants/materials-doc-mock";
import { MaterialsDocument } from "@/pdfs/_docs/materials-document";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

export default function Home() {
  return (
    <main className="w-full">
      <div className="h-[100vh] w-full">
        <PDFViewer width="100%" height="100%">
          {<MaterialsDocument {...mockMaterialsDocument} />}
        </PDFViewer>
      </div>
    </main>
  );
}
