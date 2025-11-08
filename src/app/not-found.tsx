import { Button } from "@/components/temp/button";
import { Icon } from "@/components/temp/icon";
import { ROUTES } from "@/constants/urls";
import Link from "next/link";
import { RedirectCountdown } from "./_components/redirect-count-down";

export default async function NotFoundPage() {
  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-white px-4 py-14 lg:px-6">
      <div className="flex flex-col text-center lg:max-w-[31rem]">
        <div className="flex gap-3 self-center">
          <Button square variant="secondary" className="size-14 min-w-14">
            <h2>4</h2>
          </Button>
          <Button square variant="secondary" className="size-14 min-w-14">
            <h2>0</h2>
          </Button>
          <Button square variant="secondary" className="size-14 min-w-14">
            <h2>4</h2>
          </Button>
        </div>
        <h4 className="mt-4 mb-2">Página não encontrada</h4>
        <p>
          A página que você procura pode ter sido movida ou você pode ter
          digitado o link de forma errada, por favor, tente novamente.
        </p>
        <Button variant="destructive" className="w-full" asChild>
          <Link href={ROUTES.PRIVATE.DASHBOARD} className="mt-6 mb-4">
            Retornar
            <Icon name="keyboard_arrow_right" />
          </Link>
        </Button>
        <RedirectCountdown redirectTo={ROUTES.PRIVATE.DASHBOARD} />
      </div>
    </main>
  );
}
