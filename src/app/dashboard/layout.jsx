"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  HandCoins,
  MessageCircle,
  ClipboardCheck,
  UserCircle2,
  LogOut,
  HelpCircle,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

// Navigation for each role
const navItems = {
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/complaints", label: "Complaints", icon: MessageCircle },
    { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
    { href: "/dashboard/admin/reports", label: "Reports", icon: FileText },
    { href: "/dashboard/admin/donations", label: "Donations", icon: HandCoins },
  ],
  user: [
    { href: "/dashboard/user", label: "My Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/user/complaints", label: "My Complaints", icon: MessageCircle },
    { href: "/dashboard/user/profile", label: "Profile", icon: HandCoins },
    { href: "/dashboard/user/volunteer/tasks", label: "Volunteer", icon: HelpCircle },
  ],
  
  donor: [
    { href: "/dashboard/donor", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/donor/make-donation", label: "Make Donation", icon: HandCoins },
  { href: "/dashboard/donor/history", label: "Donation History", icon: FileText },
  ],
};

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push("/auth/login");
      }
    }
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  const links = navItems[user.role] || [];

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster richColors position="top-right" />

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 md:z-auto bg-white border-r border-gray-200 
        w-64 h-screen overflow-y-auto p-5 transition-transform duration-300 shadow-sm 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-6 w-6 text-blue-600" />
            <h1 className="text-lg font-semibold text-gray-800">Civic Connect</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 mb-20">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
                  active
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Profile + Logout */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center gap-3 mb-3 border-t border-gray-200 pt-3">
            <UserCircle2 className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-5 py-3 shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold text-gray-700">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Notifications
            </Button>
            <Button variant="default" size="sm">
              Profile
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">{children}</main>

        <footer className="text-center py-4 text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} Civic Connect. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
