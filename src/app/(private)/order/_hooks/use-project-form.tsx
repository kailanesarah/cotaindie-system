import { ToastCard } from "@/components/ui/toast-card";
import toast from "react-hot-toast";
import { useOrderStore } from "../_stores/order-store";

export const useProjectForm = () => {
  const setProjectStore = useOrderStore((state) => state.setProject);

  const saveProject = (values: Project): boolean => {
    if (values.pieces.length < 1) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Nenhuma peça adicionada!"
          text="Adicione pelo menos uma peça ao projeto."
        />
      ));
      return false;
    }

    setProjectStore({ ...values });

    toast((t) => (
      <ToastCard
        id={t.id}
        status="success"
        title="Projeto adicionado!"
        text="Lembre de salvar o orçamento antes de sair."
      />
    ));

    return true;
  };

  return { saveProject };
};
