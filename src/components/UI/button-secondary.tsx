import type { ButtonProps } from "../schema";

const ButtonSecondary = ({
  text_button,
  type = "button",
  icon,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className="h-(46px) flex w-full cursor-pointer items-center justify-center gap-4 self-stretch rounded-(--corners-rounded) bg-(--color-gray-200) px-[16px] py-[18px] text-(--color-black) transition-all duration-300 ease-in-out hover:bg-(--color-gray-300)"
      type={type}
      disabled={disabled}
    >
      {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}

      {text_button}
    </button>
  );
};

export default ButtonSecondary;
