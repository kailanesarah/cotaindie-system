import ButtonSecondary from "@/components/UI/button-secondary";
import { ForumIcon } from "@/components/UI/icons";

const BottomLogin = () => {
  return (
    <div
      className="
        flex flex-col items-center text-center space-y-8
        px-6 py-10 w-full
        bg-white border border-gray-200
        rounded-[var(--corners-rounded)]
        shadow-sm
      "
    >
      <div className="space-y-4">
        <h5 className="text-lg font-semibold text-gray-900">
          Esqueceu sua senha?
        </h5>
        <p className="text-gray-600 max-w-md mx-auto">
          Envie uma mensagem ao suporte para receber atendimento.
        </p>
        <ButtonSecondary
          text_button="Ajuda e suporte"
          icon={<ForumIcon />}
        />
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">
        Precisa de atendimento rápido? Fale com a gente pelo WhatsApp: <br />
        <strong className="font-semibold">(88) 9 9332-6040</strong>
      </p>
    </div>
  );
};

export default BottomLogin;
