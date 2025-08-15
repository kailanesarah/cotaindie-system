import HeaderLogin from "./UI/header-login";
import SignInForm from "./UI/signin-form";
import BottomLogin from "./UI/bottom-login";

const LayoutLogin = () => {
  return (
    <section
      className="
        w-full 
        max-w-md 
        flex 
        flex-col 
        gap-8 
      "
    >
      <div className="mb-[6px] bg-white  border-gray-300
        rounded-(--corners-rounded)">
      <HeaderLogin />
      <SignInForm />

      </div>
      
      <BottomLogin />
    </section>
  );
};

export default LayoutLogin;
