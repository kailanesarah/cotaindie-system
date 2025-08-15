import { blockchainnodeengine_v1 } from "googleapis";
import { ReactNode } from "react";
import {ButtonProps} from "../schema";


const ButtonSecondary = ({
  text_button,
  type = "button",
  icon,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className="
      bg-(--color-gray-200) 
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
      text-(--color-black)
      hover:bg-(--color-gray-300)
      transition-all 
      duration-300 
      ease-in-out
      cursor-pointer
      "
      type={type}
      disabled={disabled}
    >
        {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
    
      {text_button}
      
      
    </button>
  );
};

export default ButtonSecondary;
