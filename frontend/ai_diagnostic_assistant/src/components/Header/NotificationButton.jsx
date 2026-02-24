import React, { useEffect, useRef, useState } from "react";
import { MdNotifications } from "react-icons/md";

const NotificationButton = ({ hasUnread = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
        className="w-10 h-10 flex items-center justify-center
                   rounded-full hover:bg-surface
                   text-textSecondary relative transition"
      >
        <MdNotifications className="text-xl" />
        {hasUnread && (
          <span className="absolute top-2 right-2 w-2 h-2
                           bg-primary rounded-full
                           border-2 border-surface" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-80
                     bg-surface-dark border border-border-dark
                     rounded-xl shadow-xl overflow-hidden z-50"
        >
          <div className="px-4 py-3 border-b border-border-dark">
            <h4 className="text-sm font-bold">Notifications</h4>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {/* Empty state for now */}
            <div className="px-4 py-6 text-sm text-slate-400 text-center">
              No new notifications
            </div>

            {/* Example future item */}
            {/*
            <div className="px-4 py-3 hover:bg-surface transition">
              <p className="text-sm font-medium">
                New AI report ready
              </p>
              <p className="text-xs text-slate-400">
                Chest X-ray · 2 minutes ago
              </p>
            </div>
            */}
          </div>

          <div className="px-4 py-2 border-t border-border-dark text-center">
            <button className="text-xs font-semibold text-primary hover:underline">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
