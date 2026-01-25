"use client";

import React from "react";

import { useUserProfile } from "@/shared/api/userProfile";
import { Header } from "@/shared/base-layout/Header";
import { AppSidebar } from "@/shared/base-layout/Sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // Prefetch user profile immediately to avoid delay on navigation
  const { data: user, isLoading } = useUserProfile();

  return (
    <SidebarProvider>
      <AppSidebar user={user} isLoading={isLoading} />
      <SidebarInset className="bg-background">
        {/* Header */}
        <Header user={user} isLoading={isLoading} />

        {/* Page Content */}
        <main className="flex-1 bg-background p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
