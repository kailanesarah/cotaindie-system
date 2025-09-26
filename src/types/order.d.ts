type Status = "approved" | "open";

type Payment = "credit" | "debit" | "bank_transfer" | "pix" | "others";

interface Order {
  id: string;
  code: string;
  name: string;
  client: Pick<Client, "code" | "name">;
  status: Status;

  rawAmount: number;

  deliveryDays: number;
  paymentMethod: Payment;
  discountPercent: number;
  installmentCount: number;

  advanceAmount: number;
  advancePaymentMethod: Payment;

  notes: string;
}
