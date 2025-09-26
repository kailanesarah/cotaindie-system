import { Icon } from "@/components/ui/icon";

export const OrderEmptyTable = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <div className="rounded-default border-b-light flex flex-col items-center gap-1 border border-dashed bg-[#E6E6E650] px-6 py-8">
      <Icon name="add_2" size={24} className="text-red-default" />
      <div className="text-title-light font-semibold">{title}</div>
      <p>{text}</p>
    </div>
  );
};
