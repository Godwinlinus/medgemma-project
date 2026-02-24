import React from "react";
import Nav from "./Nav";
import Settings from "./Settings";
import { MdWorkspacesFilled, MdClose } from "react-icons/md";

const Aside = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen flex flex-col
          border-r border-slate-200 dark:border-white/5
          bg-white dark:bg-bg-dark
          transition-transform duration-300 ease-in-out
          
          w-16
          lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-center h-16 relative">
          <MdWorkspacesFilled size={24} />

          {/* Close button (mobile only) */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-3 lg:hidden text-slate-500 hover:text-slate-900"
          >
            <MdClose size={20} />
          </button>
        </div>

        <Nav isHovered={isHovered} />
        <Settings isHovered={isHovered} />
      </aside>
    </>
  );
};

export default Aside;
