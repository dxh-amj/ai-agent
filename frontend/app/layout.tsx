import { Inter } from "next/font/google";

import { QueryProvider } from "@/providers/QueryProvider";

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Workforce Hub",
  description: "Deploy intelligent AI agents to automate business processes.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};
export default RootLayout;
