"use client";

import { useState } from "react";

import { IconMenu2, IconMoon, IconSun } from "@tabler/icons-react";

import { Button } from "@/shared/ui/button";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { ProfileDropdown } from "./ProfileDropdown";

interface HeaderProps {
  onMenuClick?: () => void;
  user?: any;
}

export const Header = ({ onMenuClick, user }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement actual theme toggle with your theme system
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <IconMenu2 size={20} />
        </Button>

        {/* Desktop Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="hidden lg:flex"
          aria-label="Toggle sidebar"
        >
          <IconMenu2 size={20} />
        </Button>

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
            className="text-muted-foreground hover:text-foreground"
            title="Toggle theme"
          >
            {isDarkMode ? <IconSun size={20} /> : <IconMoon size={20} />}
          </Button>

          {/* Profile Dropdown */}
          <ProfileDropdown user={user} />
        </div>
      </div>
    </header>
  );
};
