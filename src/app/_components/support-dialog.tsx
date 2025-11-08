import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogHeaderContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { SupportForm } from "./support-form";

export const SupportDialog = () => {
  return (
    <DialogContent size="small">
      <DialogHeader>
        <DialogHeaderContent>
          <DialogTitle>Envie uma mensagem para o suporte</DialogTitle>
          <DialogDescription>
            A nossa equipe irá resolver o mais rápido!
          </DialogDescription>
        </DialogHeaderContent>
      </DialogHeader>
      <DialogBody>
        <SupportForm />
      </DialogBody>
      <DialogFooter>
        <p className="text-body-lighter text-xs/normal">
          O suporte pode demorar até 24h para retornar o seu chamado.
        </p>
      </DialogFooter>
    </DialogContent>
  );
};
