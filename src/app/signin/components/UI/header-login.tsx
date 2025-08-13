import Image from "next/image";
import Logo from "@/assets/imgs/logo.svg";

const HeaderLogin = () => {
  return (
    <header className="
    flex 
    flex-col 
    items-center 
    text-center 
    gap-6 
    space-y-6 
    px-4 py-6 
    p-8 
    border-b 
    border-(--color-gray-300)">
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
