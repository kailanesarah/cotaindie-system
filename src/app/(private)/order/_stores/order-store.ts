import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface OrderStore {
  order: Partial<Order>;

  setStatusInfo: (data: Partial<Pick<Order, "status">>) => void;
  setExcluded: (
    data: Partial<Pick<Order, "included" | "excluded" | "teamNotes">>,
  ) => void;

  reset: () => void;

  triggers: Record<string, () => Promise<boolean>>;
  setTrigger: (key: string, fn: () => Promise<boolean>) => void;
}

export const useOrderStore = create<OrderStore>()(
  subscribeWithSelector((set) => ({
    order: { status: "open" as Status },

    setStatusInfo: (data) =>
      set((state) => ({ order: { ...state.order, ...data } })),

    setExcluded: (data) =>
      set((state) => ({ order: { ...state.order, ...data } })),

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
