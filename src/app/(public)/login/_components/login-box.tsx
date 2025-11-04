import Logo from "@/assets/imgs/logo.svg";
import Image from "next/image";
import { SignInForm } from "./login-form";

export const SignInBox = () => {
  return (
    <div className="rounded-default bg-white">
      <div className="border-b-light flex flex-col items-center border-b p-6 px-4 py-6 pt-8 text-center lg:px-6">
        <Image
          src={Logo}
          alt="Logo CotaIndie"
          width={140}
          priority
          loading="eager"
        />
        <h5 className="mt-4 mb-2">Faça seu login para continuar</h5>
        <p>Gerencie pedidos e orçamentos em um só lugar.</p>
      </div>
      <div className="px-4 py-6 lg:px-6">
        <SignInForm />
      </div>
    </div>
  );
};
