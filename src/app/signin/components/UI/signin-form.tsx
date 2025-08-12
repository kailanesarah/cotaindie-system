import { login } from "@/app/signin/actions/signin-action";
import ButtonPrimary from "@/components/UI/button-primary";
import { LoginIcon } from "@/components/UI/icons";

export default function SignInForm() {
  return (
    <form action={login} className="space-y-6 max-w-md w-full mx-auto p-8 ">
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
          className="w-full 
          px-4 py-2 
          border border-(--color-gray-300) 
          rounded-(--corners-rounded) 
          shadow-sm focus:outline-none focus:ring-1
        focus:ring-(--color-gray-500)"
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
          className="w-full 
          px-4 py-2 
          border border-(--color-gray-300) 
          rounded-(--corners-rounded) 
          shadow-sm focus:outline-none focus:ring-1
        focus:ring-(--color-gray-500)"
        />
      </div>

      <ButtonPrimary
        text_button="Acessar o sistema"
        icon={<LoginIcon/>}
      />
    </form>
  );
}
