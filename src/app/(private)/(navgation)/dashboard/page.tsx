import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderIcon,
  PageHeaderTitle,
} from "../_components/page-header";

export default async function DashboardPage() {
  return (
    <main>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderIcon name="dashboard_customize" />
          <PageHeaderHeading>
            <PageHeaderTitle>Dashboard - Resumo geral</PageHeaderTitle>
            <PageHeaderDescription>
              Veja os principais números e lançamentos de pedidos.
            </PageHeaderDescription>
          </PageHeaderHeading>
        </PageHeaderContent>
      </PageHeader>
    </main>
  );
}
