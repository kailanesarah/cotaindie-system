import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface OrderStore {
  order: Partial<Order>;
  setStatusInfo: (data: Partial<Pick<Order, "status">>) => void;
  reset: () => void;
}

export const useOrderStore = create<OrderStore>()(
  subscribeWithSelector((set) => ({
    order: { status: "open" as Status },

    setStatusInfo: (data) =>
      set((state) => ({ order: { ...state.order, ...data } })),

    reset: () => set({ order: {} }),
  })),
);

useOrderStore.subscribe(
  (state) => state.order,
  (newOrder) => {
    console.log("Order updated: ", newOrder);
  },
);
