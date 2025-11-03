import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { getInitialLetters } from "../_utils/get-initial-letters";
import { DropdownLogout } from "./dropdown-button";

interface INavbarProfile {
  profile: { name: string; role: string; avatar?: string };
}

export const NavbarProfile = ({ profile }: INavbarProfile) => {
  const initials = getInitialLetters(profile.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex cursor-pointer items-center gap-3 focus:outline-none">
          <Avatar>
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="-mt-0.5 flex flex-col gap-0 text-left">
            <span className="text-title-light font-semibold">
              {profile.name}
            </span>
            <span className="text-body-light text-xs">{profile.role}</span>
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
