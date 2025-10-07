export interface OrderSummary {
  totalAmount: number;
  remaining: number;
  installmentValue: number;
  discountValue: number;
}

export function calculateOrderSummary(order: Partial<Order>): OrderSummary {
  const totalAmount = order.rawAmount || 0;
  const discountPercent = order.discountPercent || 0;
  const advanceAmount = order.advanceAmount || 0;
  const installmentCount = order.installmentCount || 0;

  const discountValue = totalAmount * discountPercent;
  const remaining = totalAmount - discountValue - advanceAmount;
  const installmentValue =
    installmentCount > 0 ? remaining / installmentCount : 0;

  return {
    totalAmount,
    remaining,
    installmentValue,
    discountValue,
  };
}
