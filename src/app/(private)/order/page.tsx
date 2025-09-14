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
import { OrderMenu } from "./_components/order-menu";
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
          <FormEmptySection />
        </FormGroup>
      </PageMain>
    </>
  );
}
