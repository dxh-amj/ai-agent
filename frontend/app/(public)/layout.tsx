"use client";

import { Header } from "@/modules/landing/Header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* Add padding-top to account for fixed header */}
      <main className="pt-16">{children}</main>
    </>
  );
}
