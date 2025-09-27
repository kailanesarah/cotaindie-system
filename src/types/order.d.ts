type Status = "approved" | "open";
type Payment =
  | "credit"
  | "debit"
  | "bank_transfer"
  | "pix"
  | "to_agree"
  | "others";

interface Order {
  id: string;
  status: Status;
  code: string;

  //base infor
  name: string;
  client: Pick<Client, "id" | "name" | "code">;
  expirationDays: number;
  initialDate: string;

  projects: Project[];

  //projet material
  included: string;
  excluded: string;
  teamNotes: strinf;

  //payment
  rawAmount: number;

  deliveryDays: number;
  paymentMethod: Payment;
  discountPercent: number;
  installmentCount: number;

  advanceAmount: number;
  advancePaymentMethod: Payment;

  notes: string;
}
