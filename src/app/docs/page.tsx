"use client";

import { mockCuttingPlanDocument } from "@/pdfs/_constants/cutting-plan-doc-mock";
import { CuttingPlanDocument } from "@/pdfs/_docs/cutting-plan-document";
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
          {<CuttingPlanDocument {...mockCuttingPlanDocument} />}
        </PDFViewer>
      </div>
    </main>
  );
}
