"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useRouter } from "next/navigation";

import { IconPower } from "@tabler/icons-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profile?: {
    profilePictureUrl?: string;
    designation?: string;
  };
}

interface SidebarProfileProps {
  user?: User;
  isCollapsed?: boolean;
}

export const SidebarProfile = ({ user, isCollapsed }: SidebarProfileProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLogout = async () => {
    if (isDisabled) return;

    setIsDisabled(true);
    try {
      // TODO: Implement logout logic
      toast.success("See you soon! Sign Out successful.");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsDisabled(false);
    }
  };

  if (!user) return null;

  const name = `${user.firstName} ${user.lastName}`;
  const initials = user.firstName?.[0] || "U";

  return (
    <div
      className={cn(
        "m-3 flex items-center gap-2 rounded-lg bg-secondary/50 p-2",
        isCollapsed && "justify-center"
      )}
    >
      {!isCollapsed ? (
        <>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.profile?.profilePictureUrl} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-sm font-semibold" title={name}>
              {name}
            </p>
            <p className="truncate text-xs text-muted-foreground" title={user.profile?.designation}>
              {user.profile?.designation || t("profile.n/a")}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            disabled={isDisabled}
            className="shrink-0 text-muted-foreground hover:text-foreground"
            title={t("auth.logout")}
          >
            <IconPower size={20} />
          </Button>
        </>
      ) : (
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.profile?.profilePictureUrl} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
