import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { DropdownLogout } from "./dropdown-button";

interface INavbarProfile {
  readonly name: string;
  readonly role: "administrador" | "funcionário";
  readonly imageUrl?: string;
}

export const NavbarProfile = ({
  name,
  imageUrl,
  role,
}: Readonly<INavbarProfile>) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex cursor-pointer items-center gap-3 focus:outline-none">
          <Avatar>
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="-mt-0.5 flex flex-col gap-0 text-left">
            <span className="text-title-light font-semibold">{name}</span>
            <span className="text-body-light text-xs">{role}</span>
          </div>
          <Icon
            name="keyboard_arrow_down"
            size={20}
            className="-ml-0.5 group-data-[state=open]:rotate-180"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[10.75rem]">
        <DropdownLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
