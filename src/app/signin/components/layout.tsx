import BottomLogin from "./ui/bottom-login";
import HeaderLogin from "./ui/header-login";
import SignInForm from "./ui/signin-form";

const LayoutLogin = () => {
  return (
    <section className="flex w-full max-w-md flex-col gap-8">
      <div className="mb-[6px] rounded-(--corners-rounded) border-gray-300 bg-white">
        <HeaderLogin />
        <SignInForm />
      </div>

      <BottomLogin />
    </section>
  );
};

export default LayoutLogin;
