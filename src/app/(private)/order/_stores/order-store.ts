import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface OrderStore {
  order: Partial<Order>;

  setStatusInfo: (data: Partial<Pick<Order, "status">>) => void;
  setReference: (
    data: Partial<
      Pick<Order, "name" | "client" | "initialDate" | "expirationDays">
    >,
  ) => void;
  setExcluded: (
    data: Partial<Pick<Order, "included" | "excluded" | "teamNotes">>,
  ) => void;
  setPayment: (
    data: Partial<
      Pick<
        Order,
        | "deliveryDays"
        | "paymentMethod"
        | "discountPercent"
        | "installmentCount"
        | "advanceAmount"
        | "advancePaymentMethod"
        | "notes"
      >
    >,
  ) => void;

  setProject: (data: Project) => void;
  setRawAmount: (rawAmount: number) => void;

  reset: () => void;

  triggers: Record<string, () => Promise<boolean>>;
  setTrigger: (key: string, fn: () => Promise<boolean>) => void;
}

export const useOrderStore = create<OrderStore>()(
  subscribeWithSelector((set) => ({
    order: { status: "open" as Status, rawAmount: 0, projects: [] },

    setStatusInfo: (data) =>
      set((state) => ({ order: { ...state.order, ...data } })),

    setReference: (data) =>
      set((state) => ({ order: { ...state.order, ...data } })),

    setExcluded: (data) =>
      set((state) => ({ order: { ...state.order, ...data } })),

    setPayment: (data) =>
      set((state) => ({ order: { ...state.order, ...data } })),

    setProject: (data) =>
      set((state) => ({
        order: {
          ...state.order,
          projects: [...(state.order.projects ?? []), data],
        },
      })),

    setRawAmount: (rawAmount: number) =>
      set((state) => ({ order: { ...state.order, rawAmount } })),

    reset: () => set({ order: {} }),

    triggers: {},
    setTrigger: (key, fn) =>
      set((state) => ({ triggers: { ...state.triggers, [key]: fn } })),
  })),
);

useOrderStore.subscribe(
  (state) => state.order,
  (newOrder) => {
    console.log("Order updated: ", newOrder);
  },
);
