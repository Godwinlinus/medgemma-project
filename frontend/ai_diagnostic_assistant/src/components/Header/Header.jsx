import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NotificationButton from "./NotificationButton";
import UserProfile from "./UserProfile";
import { MdMenu, MdClose, MdWorkspacesFilled } from "react-icons/md";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Workspace", path: "/clinical-workspace" },
    { label: "AI Assistant", path: "/ai-assistant" },
    { label: "Library", path: "/library" },
    { label: "Cases", path: "/cases" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <header className="h-12 px-6 border-b border-white/5 bg-bg-dark flex items-center justify-between lg:justify-end sticky top-0 z-50">
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden"
        aria-label="Open navigation"
      >
        <MdMenu size={24} />
      </button>

      {/* Mobile sidebar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <aside className="fixed top-0 left-0 h-full w-64 bg-bg-dark z-50
                            border-r border-border-dark
                            animate-slide-in">
            <div className="flex items-center justify-between px-6 h-12 border-b border-border-dark">
              <MdWorkspacesFilled size={24} />
              <button onClick={() => setIsOpen(false)}>
                <MdClose size={22} />
              </button>
            </div>

            <nav className="flex flex-col px-6 py-6 space-y-4 text-sm">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      py-2 border-b border-border-dark transition-colors
                      ${isActive
                        ? "text-primary font-semibold"
                        : "text-slate-400 hover:text-primary"}
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Demo / Mock Mode badge */}
        {/** show badge when server indicates mock mode */}
        {typeof window !== 'undefined' && (
          <MockBadge />
        )}
        <NotificationButton hasUnread />
        <div className="h-8 w-px bg-border" />
        <Link to="/profile">
          <UserProfile
            name="Dr. Sarah Williams"
            role="Chief Resident"
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAmXPq_V2u3VHBO4fR49_mkevpYserFQ4pmzkRiNqTh2sXu8idv4LBSBBhDvCrFXLmX-gDtqCm96dQYRSDgSBe62twbzLzQFSlD2rP01jdtAolJVfk9WeCOfPD9wykXl0LpWqurq7FSGo3udIKWMMpLjTAptuQKtmTpKFI9XCjDHHI7MwbWfOVlht_VPjzD2oooVBNiw6cXK1d0u3sutU4AmrzJwXuNM3xmgd2kYLLxO3VtGoT6YsnqHjI5Ys6ljF-kqchmaCELPfw"
          />
        </Link>
      </div>
    </header>
  );
};

const MockBadge = () => {
  const [mockMode, setMockMode] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch('/api/status')
      .then((r) => r.json())
      .then((j) => { if (mounted && j && j.mock_mode) setMockMode(true); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  if (!mockMode) return null;
  return (
    <div className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">Demo / Mock Mode</div>
  );
};

export default Header;
