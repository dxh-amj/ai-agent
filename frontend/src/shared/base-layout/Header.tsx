"use client";

import { useState } from "react";

import { IconMoon, IconSun } from "@tabler/icons-react";

import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { ProfileDropdown } from "./ProfileDropdown";

import type { UserProfile } from "@/shared/types";

interface HeaderProps {
  user?: UserProfile | null;
  isLoading?: boolean;
}

export const Header = ({ user, isLoading }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="flex h-16 items-center gap-2 px-4">
        {/* Sidebar Toggle */}
        <SidebarTrigger className="-ml-1 text-foreground hover:bg-accent hover:text-accent-foreground" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-border" />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Side Actions */}
        <div className="flex items-center gap-1">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:bg-accent hover:text-foreground"
            title="Toggle theme"
          >
            {isDarkMode ? <IconSun size={20} /> : <IconMoon size={20} />}
          </Button>

          {/* Profile Dropdown */}
          <ProfileDropdown user={user} isLoading={isLoading} />
        </div>
      </div>
    </header>
  );
};
