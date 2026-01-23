import { useState } from "react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/shared/ui/sheet";

import { SidebarItems } from "./SidebarItems";
import { SidebarProfile } from "./SidebarProfile";

interface SidebarProps {
  user?: any;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar = ({ user, mobileOpen, setMobileOpen }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center border-b px-4">
            <h1 className="text-xl font-bold">AI Agent</h1>
          </div>
          <div className="flex-1 overflow-y-auto mt-4">
            <SidebarItems />
          </div>
          <div className="border-t">
            <SidebarProfile user={user} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col lg:border-r lg:bg-background lg:transition-all lg:duration-300",
          isCollapsed ? "lg:w-16" : "lg:w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-4">
          {!isCollapsed && <h1 className="text-xl font-bold">AI Agent</h1>}
        </div>

        {/* Scrollable Menu Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="mt-4">
            <SidebarItems />
          </div>
        </div>

        {/* Bottom Profile Section */}
        <div className="border-t">
          <SidebarProfile user={user} isCollapsed={isCollapsed} />
        </div>
      </aside>
    </>
  );
};

export const useSidebarToggle = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return { isMobileOpen, toggleSidebar: () => setIsMobileOpen((prev) => !prev) };
};
