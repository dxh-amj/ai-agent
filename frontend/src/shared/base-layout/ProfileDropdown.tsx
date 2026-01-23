import { useState } from "react";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profile?: {
    profilePictureUrl?: string;
    designation?: string;
  };
}

interface ProfileDropdownProps {
  user?: User;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogout = async () => {
    if (isDisabled) return;

    setIsDisabled(true);
    try {
      // TODO: Implement actual logout logic
      toast.success("See you soon! Sign Out successful.");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsDisabled(false);
    }
  };

  if (!user) {
    return (
      <Avatar className="h-9 w-9">
        <AvatarFallback>
          <IconUser size={20} className="text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
    );
  }

  const name = `${user.firstName} ${user.lastName}`;
  const initials = user.firstName?.[0] || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.profile?.profilePictureUrl} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account-settings" className="w-full cursor-pointer">
              <IconSettings className="mr-2 h-4 w-4" />
              <span>{t("profile.account_settings")}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isDisabled}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <IconLogout className="mr-2 h-4 w-4" />
          <span>{t("auth.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
