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
import { OrderProjects } from "../_components/order-projects";
import { OrderProjectsSection } from "../_components/order-projects-section";
import { OrderReferenceForm } from "../_components/order-reference-form";
import { OrderStoreWrapper } from "../_components/store-wrapper";

interface IOrderPage {
  params: Promise<{ code: string }>;
}

export default async function OrderPage({ params }: Readonly<IOrderPage>) {
  const { code } = await params;

  let id = undefined;

  if (code && code !== "new") {
    const supabase = await supabaseServer();

    const { data: order, error } = await supabase
      .from("orders")
      .select("id, code")
      .eq("code", code)
      .single();

    if (error || !order) notFound();

    id = order.id;
  }

  const orderCode = code !== "new" ? code : "";

  return (
    <OrderStoreWrapper id={id ?? ""}>
      <OrderMenu code={orderCode} />
      <PageMain>
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
                <OrderProjectsSection />
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
      </PageMain>
    </OrderStoreWrapper>
  );
}
