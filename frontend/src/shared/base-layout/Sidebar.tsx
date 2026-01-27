"use client";

import { IconLayoutDashboard, IconRobot, IconShare2 } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  useSidebar,
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
    titleKey: "navigation.connections",
    url: "/dashboard/connections",
    icon: IconShare2,
  },
];

const LogoButton = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenuButton
      size="lg"
      asChild
      className="h-16 w-full px-4 hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:!h-16 group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!px-4 group-data-[collapsible=icon]:!justify-center"
    >
      <Link href="/dashboard" className="flex items-center justify-center gap-3">
        <AgentKitLogo variant="dark" size={isCollapsed ? "sm" : "md"} showText={!isCollapsed} />
      </Link>
    </SidebarMenuButton>
  );
};

export const AppSidebar = ({ user, isLoading }: AppSidebarProps) => {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
      <SidebarHeader className="border-b border-border p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-normal px-2 mb-2 text-md">
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
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-medium text-base [&>svg]:size-5"
                          : "text-foreground/70 hover:bg-accent hover:text-accent-foreground text-base [&>svg]:size-5"
                      }
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="size-5" />
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
