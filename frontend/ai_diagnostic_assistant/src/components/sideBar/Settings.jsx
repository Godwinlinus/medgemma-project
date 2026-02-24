import React from "react";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";

const Settings = ({ isHovered }) => {
  return (
    <div className="p-4 border-t border-border border-slate-200 dark:border-white/5 space-y-2">
      <Link
        to="/settings"
        title="Settings"
        className="
          flex gap-3 px-4 py-3
          items-center justify-center
          rounded-xl text-textSecondary
          hover:bg-surface transition-all
        "
      >
        <MdSettings className="text-xl flex-shrink-0" />
      </Link>
    </div>
  );
};

export default Settings;
