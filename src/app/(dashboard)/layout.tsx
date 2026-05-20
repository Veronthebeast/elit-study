"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AvatarProvider } from "@/contexts/AvatarContext";
import { Avatar } from "@/components/avatar/Avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AvatarProvider>
          <div className="min-h-screen bg-surface dark:bg-surface-dark">
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 lg:ml-64 p-4 lg:p-6 pb-20 lg:pb-6">
                {children}
              </main>
            </div>
            <MobileNav />
            <Avatar />
          </div>
        </AvatarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
