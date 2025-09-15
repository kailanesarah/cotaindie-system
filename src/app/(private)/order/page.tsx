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
import { OrderMenu } from "./_components/order-menu";
import { OrderPaymentForm } from "./_components/order-payment-form";
import { OrderReferenceForm } from "./_components/order-reference-form";

export default async function OrderPage() {
  return (
    <>
      <OrderMenu />
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
    </>
  );
}
