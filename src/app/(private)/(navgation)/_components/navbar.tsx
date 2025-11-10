"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { useSentryFeedback } from "@/hooks/use-sentry-feedback";
import { NavbarBreadcrumb } from "./navbar-breadcrump";
import { NavbarProfile } from "./navbar-profile";
import { QuestionsDialog } from "./questions-dialog";

interface INavbarProps {
  profile: { name: string; role: string; avatar?: string };
}

export const Navbar = ({ profile }: INavbarProps) => {
  const { buttonRef } = useSentryFeedback();

  return (
    <nav className="border-b-light hidden h-[4.5625rem] items-center border-b bg-white px-4 py-4 lg:flex lg:px-6">
      <div className="flex grow items-center justify-between gap-6">
        <NavbarBreadcrumb />
        <div className="hidden items-center gap-6 lg:flex">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">
                <Icon name="indeterminate_question_box" />
                Dúvidas e perguntas
              </Button>
            </DialogTrigger>
            <QuestionsDialog />
          </Dialog>
          <Button variant="link" ref={buttonRef}>
            <Icon name="forum" />
            Ajuda e Suporte
          </Button>
          <NavbarProfile profile={profile} />
        </div>
      </div>
    </nav>
  );
};
