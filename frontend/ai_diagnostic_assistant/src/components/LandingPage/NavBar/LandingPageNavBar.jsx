import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Logo";

const LandingPageNavBar = () => {
  const navigate = useNavigate();

  const handleRequestAccess = () => {
    navigate("/user-auth");
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel bg-bg-light dark:bg-bg-dark border-b border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-slate-600 dark:text-slate-400">
          <span className="hover:text-primary transition-colors cursor-pointer">
            Features
          </span>
          <span className="hover:text-primary transition-colors cursor-pointer">
            Security
          </span>
          <span className="hover:text-primary transition-colors cursor-pointer">
            Research
          </span>
          <span className="hover:text-primary transition-colors cursor-pointer">
            Compliance
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleRequestAccess}
            className="px-5 py-2.5 rounded-full text-sm font-semibold
                       border border-primary/20 text-primary
                       hover:bg-primary/10 transition-all"
          >
            Request Access
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavBar;
