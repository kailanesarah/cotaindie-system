import { PageMain } from "../(navgation)/_components/page-main";
import { OrderMenu } from "./_components/order-menu";

export default async function OrderPage() {
  return (
    <>
      <OrderMenu />
      <PageMain>Nova informação</PageMain>
    </>
  );
}
