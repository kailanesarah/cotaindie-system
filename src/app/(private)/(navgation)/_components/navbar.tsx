import { SupportDialog } from "@/app/_components/support-dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { requireUserServer } from "@/modules/supabase/supabase-auth-service";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { NavbarBreadcrumb } from "./navbar-breadcrump";
import { NavbarProfile } from "./navbar-profile";
import { QuestionsDialog } from "./questions-dialog";

export const Navbar = async () => {
  const user = await requireUserServer();

  return (
    <nav className="border-b-light flex h-[4.5625rem] items-center border-b bg-white px-6 py-4">
      <div className="flex grow items-center justify-between gap-6">
        <NavbarBreadcrumb />
        <div className="flex items-center gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">
                <Icon name="indeterminate_question_box" />
                Dúvidas e perguntas
              </Button>
            </DialogTrigger>
            <QuestionsDialog />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">
                <Icon name="forum" />
                Ajuda e Suporte
              </Button>
            </DialogTrigger>
            <SupportDialog />
          </Dialog>
          <NavbarProfile
            name={
              typeof user?.user_metadata?.user_name === "string"
                ? user.user_metadata.user_name
                : "Usuário"
            }
            role="administrador"
          />
        </div>
      </div>
    </nav>
  );
};
