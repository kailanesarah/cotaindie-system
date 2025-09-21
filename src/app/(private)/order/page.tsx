import { PageMain } from "../(navgation)/_components/page-main";
import { clients } from "../(navgation)/clients/_constants/clients-list";
import {
  FormContent,
  FormDescription,
  FormEmptySection,
  FormGroup,
  FormHeading,
  FormSection,
  FormSeparator,
  FormTitle,
} from "./_components/form-block";
import { OrderIncludedForm } from "./_components/order-included-form";
import { OrderPaymentForm } from "./_components/order-payment-form";
import {
  OrderProjects,
  OrderProjectsActions,
  OrderProjectsContent,
  OrderProjectsTotal,
} from "./_components/order-projects";
import { OrderReferenceForm } from "./_components/order-reference-form";
import { SummaryTable } from "./_components/summary-table";

export default async function OrderPage() {
  return (
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
            <OrderReferenceForm clients={clients} />
          </FormContent>
        </FormSection>
        <FormSection>
          <FormHeading>
            <FormTitle>Projetos inclusos</FormTitle>
            <FormDescription>
              Projetos que o cliente está orçando e o que está incluso.
            </FormDescription>
          </FormHeading>
          <FormSeparator />
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
    </PageMain>
  );
}
