"use client";

import { IconLayoutDashboard, IconRobot, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

import { SidebarProfile } from "./SidebarProfile";

import type { UserProfile } from "@/shared/types";

interface AppSidebarProps {
  user?: UserProfile | null;
  isLoading?: boolean;
}

// Menu items with translation keys
const menuItems = [
  {
    titleKey: "navigation.dashboard",
    url: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    titleKey: "navigation.agents",
    url: "/agents",
    icon: IconRobot,
  },
  {
    titleKey: "navigation.settings",
    url: "/settings",
    icon: IconSettings,
  },
];

export const AppSidebar = ({ user, isLoading }: AppSidebarProps) => {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
      <SidebarHeader className="border-b border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <IconRobot className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-foreground">
                    {t("sidebar.app_name")}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {t("sidebar.app_tagline")}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            {t("entities.navigation")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.titleKey}>
                    <SidebarMenuButton
                      asChild
                      tooltip={t(item.titleKey)}
                      isActive={isActive}
                      className={
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{t(item.titleKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarProfile user={user} isLoading={isLoading} />
      </SidebarFooter>
    </Sidebar>
  );
};
