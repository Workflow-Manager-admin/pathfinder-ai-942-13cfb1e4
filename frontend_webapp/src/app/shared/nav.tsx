"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

/**
 * Route definitions for main app sections.
 */
const navRoutes: { label: string; href: string; key: string }[] = [
  { label: "Dashboard", href: "/", key: "dashboard" },
  { label: "Learning Path", href: "/learning-path", key: "learning-path" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "AI Chat", href: "/chat", key: "chat" },
  { label: "Onboarding", href: "/onboarding", key: "onboarding" },
];

// PUBLIC_INTERFACE
/** Nav - Top navigation bar for major app sections */
export default function Nav() {
  const pathname = usePathname();
  // Highlighting: treat "/" as dashboard, exact for other routes
  function isActive(route: string) {
    if (route === "/") return pathname === route;
    return pathname?.startsWith(route);
  }
  return (
    <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Brand */}
        <Link href="/" className="font-bold text-xl text-indigo-700 select-none flex gap-1 items-center">
          <span>🛤️</span>
          <span>SkillBridge</span>
        </Link>
        {/* Links */}
        <div className="flex gap-2 md:gap-4 items-center text-[15px] font-medium">
          {navRoutes.map((route) => (
            <Link
              key={route.key}
              href={route.href}
              className={`px-3 py-1.5 rounded-full transition-all ${
                isActive(route.href)
                  ? "bg-indigo-600 text-white shadow"
                  : "hover:bg-indigo-50 hover:text-indigo-700 text-gray-700"
              }`}
              aria-current={isActive(route.href) ? "page" : undefined}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
