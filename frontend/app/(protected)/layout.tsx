"use client";

import React, { useState } from "react";

import { Header } from "@/shared/base-layout/Header";
import { Sidebar } from "@/shared/base-layout/Sidebar";

// Mock user data - replace with actual user data from your auth system
const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  profile: {
    designation: "Software Developer",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        user={mockUser}
        mobileOpen={isMobileSidebarOpen}
        setMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Header */}
        <Header onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} user={mockUser} />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
