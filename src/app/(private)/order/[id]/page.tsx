import { supabaseServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PageMain } from "../../(navgation)/_components/page-main";
import {
  FormContent,
  FormDescription,
  FormEmptySection,
  FormGroup,
  FormHeading,
  FormSection,
  FormSeparator,
  FormTitle,
} from "../_components/form-block";
import { OrderIncludedForm } from "../_components/order-included-form";
import { OrderMenu } from "../_components/order-menu";
import { OrderPaymentForm } from "../_components/order-payment-form";
import {
  OrderProjects,
  OrderProjectsActions,
  OrderProjectsContent,
  OrderProjectsTotal,
} from "../_components/order-projects";
import { OrderReferenceForm } from "../_components/order-reference-form";
import { OrderStoreWrapper } from "../_components/store-wrapper";
import { SummaryTable } from "../_components/summary-table";

interface IOrderPage {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Readonly<IOrderPage>) {
  const { id } = await params;

  let orderId: string | null = null;

  let code = undefined;

  if (id && id !== "new") {
    const supabase = await supabaseServer();

    const { data: order, error } = await supabase
      .from("orders")
      .select("id, code")
      .eq("id", id)
      .single();

    if (error || !order) notFound();
    orderId = order.id;
    code = order.code;
  }

  return (
    <>
      <OrderMenu code={code} />
      <PageMain>
        <OrderStoreWrapper id={orderId ?? ""}>
          <FormGroup>
            <FormSection>
              <FormHeading>
                <FormTitle>Dados do orçamento</FormTitle>
                <FormDescription>
                  Gerencie todos os orçamentos e o fechamento dos pedidos.
                </FormDescription>
              </FormHeading>
              <FormSeparator />
              <FormContent>
                <OrderReferenceForm />
              </FormContent>
            </FormSection>
            <FormSection>
              <FormHeading>
                <FormTitle>Projetos inclusos</FormTitle>
                <FormDescription>
                  Projetos que o cliente está orçando e o que está incluso.
                </FormDescription>
              </FormHeading>
              <FormSeparator className="hidden lg:block" />
              <FormContent>
                <OrderProjects>
                  <OrderProjectsContent>
                    <SummaryTable />
                    <OrderProjectsActions />
                  </OrderProjectsContent>
                  <OrderProjectsTotal />
                </OrderProjects>
              </FormContent>
              <FormSeparator />
              <FormContent>
                <OrderIncludedForm />
              </FormContent>
            </FormSection>
            <FormSection>
              <FormHeading>
                <FormTitle>Pagamento e condições</FormTitle>
                <FormDescription>
                  Indique como o cliente vai pagar ao finalizar o pedido.
                </FormDescription>
              </FormHeading>
              <FormSeparator />
              <FormContent>
                <OrderPaymentForm />
              </FormContent>
            </FormSection>
            <FormEmptySection />
          </FormGroup>
        </OrderStoreWrapper>
      </PageMain>
    </>
  );
}
