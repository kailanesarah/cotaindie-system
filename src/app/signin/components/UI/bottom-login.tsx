import ButtonSecondary from "@/components/ui/button-secondary";
import { ForumIcon } from "@/components/ui/icons";

const BottomLogin = () => {
  return (
    <div className="flex w-full flex-col items-center space-y-8 rounded-[var(--corners-rounded)] border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
      <div className="space-y-4">
        <h5 className="text-lg font-semibold text-gray-900">
          Esqueceu sua senha?
        </h5>
        <p className="mx-auto max-w-md text-gray-600">
          Envie uma mensagem ao suporte para receber atendimento.
        </p>
        <ButtonSecondary text_button="Ajuda e suporte" icon={<ForumIcon />} />
      </div>

      <p className="text-sm leading-relaxed text-gray-700">
        Precisa de atendimento rápido? Fale com a gente pelo WhatsApp: <br />
        <strong className="font-semibold">(88) 9 9332-6040</strong>
      </p>
    </div>
  );
};

export default BottomLogin;
