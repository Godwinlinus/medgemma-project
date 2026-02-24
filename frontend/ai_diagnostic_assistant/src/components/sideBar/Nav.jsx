import {
  MdSpaceDashboard,
  MdSmartToy,
  MdLibraryBooks,
  MdOutlinePeopleAlt,
} from "react-icons/md";

import { 
    useNavigate, 
    useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Workspace",
    icon: MdSpaceDashboard,
    path: "/clinical-workspace",
  },
  {
    label: "AI Assistant",
    icon: MdSmartToy,
    path: "/ai-assistant",
  },
  {
    label: "Library",
    icon: MdLibraryBooks,
    path: "/library",
  },
  {
    label: "Patients",
    icon: MdOutlinePeopleAlt,
    path: "/patients",
  },
];
  
const Nav = ({ isHovered }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex-1 px-4 py-4 space-y-2">
      {navItems.map(({ label, icon: Icon, path }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={label}
            onClick={() => navigate(path)}
            title={label}
            className={`w-full flex items-center gap-1 px-4 py-3 rounded-xl
              transition-all duration-300 justify-center
              ${
                isActive
                  ? "bg-surface-dark text-primary border border-primary/30"
                  : "text-textSecondary hover:bg-surface"
              }`}
          >
            <Icon className="text-xl flex-shrink-0" />
          </button>
        );
      })}
    </nav>
  );
};

export default Nav;
