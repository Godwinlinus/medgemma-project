import React from "react";
import {
  MdSpaceDashboard,
  MdSmartToy,
  MdLibraryBooks,
  MdSettings,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: MdSpaceDashboard,
    path: "/clinical-workspace",
  },
  {
    id: "ai",
    label: "AI Assistant",
    icon: MdSmartToy,
    path: "/ai-assistant",
  },
  {
    id: "library",
    label: "Library",
    icon: MdLibraryBooks,
    path: "/library",
  },
  {
    id: "settings",
    label: "Settings",
    icon: MdSettings,
    path: "/settings",
  },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav
      role="navigation"
      className="
        fixed bottom-8 left-1/2 -translate-x-1/2 z-50
        hidden lg:flex items-center gap-1 p-1.5
        bg-surface-light/90 dark:bg-surface-dark/90
        border border-border-light dark:border-border-dark
        rounded-2xl backdrop-blur-xl
      "
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            to={item.path}
            className={`
              flex flex-col items-center gap-1 px-5 py-2 rounded-xl
              text-[10px] font-bold uppercase tracking-normal
              transition-all duration-200 focus:outline-none
              ${
                isActive
                  ? "text-primary border border-primary/20 bg-primary/5"
                  : "text-slate-500 hover:-translate-y-0.5"
              }
            `}
          >
            <Icon className="text-sm" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
