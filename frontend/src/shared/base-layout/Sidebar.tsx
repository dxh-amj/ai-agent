"use client";

import { IconLayoutDashboard, IconRobot, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { AgentKitLogo } from "@/shared/ui";
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
    url: "/dashboard/agents",
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
      <SidebarHeader className="border-b border-border p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="h-16 px-4 hover:bg-transparent active:bg-transparent"
            >
              <Link href="/dashboard" className="flex items-center gap-3">
                <AgentKitLogo variant="dark" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-semibold px-2 mb-2">
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
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-medium"
                          : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                      }
                    >
                      <Link href={item.url} className="flex items-center gap-3">
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

      <SidebarFooter className="border-t border-border p-2">
        <SidebarProfile user={user} isLoading={isLoading} />
      </SidebarFooter>
    </Sidebar>
  );
};
