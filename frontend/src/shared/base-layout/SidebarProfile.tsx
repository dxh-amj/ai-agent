"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useRouter } from "next/navigation";

import { IconChevronUp, IconLogout, IconSettings } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/shared/ui/sidebar";
import { Skeleton } from "@/shared/ui/skeleton";
import { useLogout } from "@/utils/auth";
import { clearStorage } from "@/utils/clearStorage";
import { REFRESH_TOKEN } from "@/utils/constants";

import type { UserProfile } from "@/shared/types";

interface SidebarProfileProps {
  user?: UserProfile | null;
  isLoading?: boolean;
}

export const SidebarProfile = ({ user, isLoading }: SidebarProfileProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { isMobile } = useSidebar();
  const token = getCookie(REFRESH_TOKEN);
  const { mutateAsync, isPending } = useLogout();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLogout = async () => {
    if (isDisabled || isPending) return;

    setIsDisabled(true);
    try {
      await mutateAsync(token);
      clearStorage();
      toast.success("See you soon! Sign Out successful.");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsDisabled(false);
    }
  };

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!user) return null;

  const name = `${user.firstName} ${user.lastName}`;
  const initials = user.firstName?.[0] || "U";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.profilePictureUrl || undefined} alt={name} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <IconChevronUp className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.profilePictureUrl || undefined} alt={name} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/account-settings")}>
                <IconSettings className="mr-2 h-4 w-4" />
                <span>{t("profile.account_settings")}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isDisabled || isPending}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <IconLogout className="mr-2 h-4 w-4" />
              <span>{t("auth.logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
