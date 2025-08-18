import type { ButtonProps } from "../schema";

const ButtonPrimary = ({
  text_button,
  type = "submit",
  icon,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className="h-(46px) flex w-full cursor-pointer items-center justify-center gap-4 self-stretch rounded-(--corners-rounded) bg-(--color-red-500) px-[16px] py-[18px] text-(--color-white) transition-all duration-300 ease-in-out hover:bg-(--color-red-700)"
      type={type}
      disabled={disabled}
    >
      {text_button}
      {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
    </button>
  );
};

export default ButtonPrimary;
