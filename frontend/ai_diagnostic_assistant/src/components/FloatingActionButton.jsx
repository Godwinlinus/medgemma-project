import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsSendFill } from "react-icons/bs";

const FloatingActionButton = ({
  to = "/ai-assistant",
  icon: Icon = BsSendFill,
  label = "Add",
  className = "",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (to && location.pathname !== to) {
      navigate(to);
    }
  };

  return (
    <div className="fixed bottom-14 right-6 md:hidden z-50">
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        title={label}
        className={`
          w-14 h-14 bg-primary text-white rounded-full
          flex items-center justify-center
          hover:scale-110 active:scale-95 transition-all
          shadow-lg
          ${className}
        `}
      >
        <Icon className="text-3xl" />
      </button>
    </div>
  );
};

export default FloatingActionButton;
