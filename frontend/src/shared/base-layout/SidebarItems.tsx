"use client";

import { IconLayoutDashboard } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}

export const SidebarItems = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  // Static menu items (not from server as requested)
  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      title: t("navigation.dashboard"),
      icon: <IconLayoutDashboard size={20} />,
      href: "/dashboard",
    },
  ];

  return (
    <div className="px-3">
      <nav className="space-y-1 pt-0">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
