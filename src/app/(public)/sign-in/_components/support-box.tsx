import { SupportDialog } from "@/app/_components/support-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";

export const SupportBox = () => {
  return (
    <div className="rounded-default flex flex-col bg-white">
      <div className="border-b-light flex flex-col border-b px-4 py-6 lg:px-6">
        <h6>Esqueceu sua senha?</h6>
        <p className="mt-2 mb-6">
          Envie uma mensagem ao suporte para receber atendimento.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">
              <Icon name="forum" />
              Ajuda e suporte
            </Button>
          </DialogTrigger>
          <SupportDialog />
        </Dialog>
      </div>
      <div className="text-body-lighter px-4 py-6 text-xs/normal lg:px-6">
        <p>
          Precisa de atendimento rápido? Fale com a gente pelo WhatsApp:
          <br />
          <Link className="underline" href="#" target="_blank">
            (88) 9 9332-6040.
          </Link>
        </p>
      </div>
    </div>
  );
};
