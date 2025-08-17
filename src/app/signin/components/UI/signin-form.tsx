import { login } from "@/app/signin/actions/signin-action";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export default function SignInForm() {
  return (
    <form action={login} className="mx-auto w-full max-w-md space-y-6 p-8">
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="email" className="font-semibold">
          Email *
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Ex:seu@email.com"
          required
          className="w-full rounded-(--corners-rounded) border border-(--color-gray-300) px-4 py-2 shadow-sm focus:ring-1 focus:ring-(--color-gray-500) focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-[8px]">
        <label htmlFor="password" className="font-semibold">
          Senha *
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required
          className="w-full rounded-(--corners-rounded) border border-(--color-gray-300) px-4 py-2 shadow-sm focus:ring-1 focus:ring-(--color-gray-500) focus:outline-none"
        />
      </div>

      <Button>
        Entrar no sistema
        <Icon name="login" />
      </Button>
    </form>
  );
}
