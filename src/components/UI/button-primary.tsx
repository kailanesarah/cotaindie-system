import { blockchainnodeengine_v1 } from "googleapis";
import { ReactNode } from "react";
import {ButtonProps} from "../schema";


const ButtonPrimary = ({
  text_button,
  type = "submit",
  icon,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className="
      bg-(--color-red-500) 
      h-(46px) 
      w-full 
      px-[16px] 
      py-[18px] 
      flex 
      justify-center 
      items-center
      gap-4 
      self-stretch 
      rounded-(--corners-rounded) 
      text-(--color-white)
      hover:bg-(--color-red-700)
      transition-all 
      duration-300 
      ease-in-out
      cursor-pointer
      "
      type={type}
      disabled={disabled}
    >
      {text_button}
      {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
    </button>
  );
};

export default ButtonPrimary;
