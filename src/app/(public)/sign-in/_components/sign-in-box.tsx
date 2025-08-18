import Logo from "@/assets/imgs/logo.svg";
import Image from "next/image";
import { SignInForm } from "./sign-in-form";

export const SignInBox = () => {
  return (
    <div className="rounded-default bg-white">
      <div className="border-b-light flex flex-col items-center border-b p-6 pt-8 text-center">
        <Image src={Logo} alt="Logo CotaIndie" width={140} priority />
        <h5 className="mt-4 mb-2">Faça seu login para continuar</h5>
        <p>Acesse seus pedidos, orçamentos e gerencie tudo em um só lugar.</p>
      </div>
      <div className="p-6">
        <SignInForm />
      </div>
    </div>
  );
};
