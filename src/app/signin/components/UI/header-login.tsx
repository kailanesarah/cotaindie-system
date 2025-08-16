import Logo from "@/assets/imgs/logo.svg";
import Image from "next/image";

const HeaderLogin = () => {
  return (
    <header className="flex flex-col items-center gap-6 space-y-6 border-b border-(--color-gray-300) p-8 px-4 py-6 text-center">
      <Image
        src={Logo}
        alt="Logo da aplicação"
        width={160}
        height={80}
        priority
        className="m-0"
      />

      <div className="space-y-1">
        <h5>Faça seu login para continuar</h5>
        <p>Acesse seus pedidos, orçamentos e gerencie tudo em um só lugar.</p>
      </div>
    </header>
  );
};

export default HeaderLogin;
