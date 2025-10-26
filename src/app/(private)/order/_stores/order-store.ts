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
  updateProject: (index: number, updatedProject: Project) => void;
  deleteProject: (index: number) => void;
  duplicateProject: (index: number) => void;

  setRawAmount: (rawAmount: number) => void;

  reset: () => void;

  triggers: Record<string, () => Promise<boolean>>;
  setTrigger: (key: string, fn: () => Promise<boolean>) => void;
}

export const useOrderStore = create<OrderStore>()(
  subscribeWithSelector((set) => ({
    order: {
      status: "OPEN" as Status,
      rawAmount: 0,
      installmentCount: 1,
      discountPercent: 0,
      advanceAmount: 0,
      initialDate: new Date().toISOString(),
      projects: [],
    },

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

    updateProject: (index, updatedProject) =>
      set((state) => {
        const projects = [...(state.order.projects ?? [])];
        projects[index] = updatedProject;

        return {
          order: {
            ...state.order,
            projects,
          },
        };
      }),

    deleteProject: (index) =>
      set((state) => {
        const projects = [...(state.order.projects ?? [])];
        projects.splice(index, 1);
        return {
          order: {
            ...state.order,
            projects,
          },
        };
      }),

    duplicateProject: (index) =>
      set((state) => {
        const projects = [...(state.order.projects ?? [])];
        const projectToCopy = projects[index];
        if (!projectToCopy) return state;

        const duplicated = {
          ...structuredClone(projectToCopy),
          name: `${projectToCopy.name || "Projeto"} (cópia)`,
        };

        projects.splice(index + 1, 0, duplicated);

        return {
          order: {
            ...state.order,
            projects,
          },
        };
      }),

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
