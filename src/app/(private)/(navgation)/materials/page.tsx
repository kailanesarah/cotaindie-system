import { PageContent } from "../_components/page-content";
import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderIcon,
  PageHeaderTitle,
} from "../_components/page-header";
import { FilterInputTags } from "../_components/seach";

export default async function MaterialsPage() {
  return (
    <main>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderIcon name="inventory_2" />
          <PageHeaderHeading>
            <PageHeaderTitle>
              Materiais disponíveis para clientes
            </PageHeaderTitle>
            <PageHeaderDescription>
              Gerencie os itens disponíveis, seus valores e tamanhos, que
              servirão como base para os orçamentos.
            </PageHeaderDescription>
          </PageHeaderHeading>
        </PageHeaderContent>
      </PageHeader>
      <FilterInputTags data={materials} />
      <PageContent>wqqwqw</PageContent>
    </main>
  );
}

const materials: Material[] = [
  {
    id: "1",
    category: "Piso",
    name: "Porcelanato",
    description: "Porcelanato polido 60x60cm",
    measureType: "m2",
    wasteTax: 0.1,
    baseValue: 50,
    measure: [0.36],
  },
  {
    id: "2",
    category: "Tinta",
    name: "Tinta Acrílica",
    description: "Tinta branca fosca",
    measureType: "ml",
    wasteTax: 0.05,
    baseValue: 25,
    measure: [18, 3.6],
  },
  {
    id: "3",
    category: "Revestimento",
    name: "Azulejo",
    description: "Azulejo 20x20cm azul",
    measureType: "m2",
    wasteTax: 0.08,
    baseValue: 30,
    measure: [0.04, 0.05],
  },
];
