import React from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";
import { MdGroups, MdTaskAlt, MdAdd } from "react-icons/md";

const SummaryPanel = () => {
  const navigate = useNavigate(); // hook for programmatic navigation

  const handleNewCase = () => {
    navigate("/ai-assistant"); // navigate to AiAssistant route
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
        <StatCard icon={MdGroups} value="12" label="Patients Today" />
        <StatCard icon={MdTaskAlt} value="08" label="Reports Ready" accent />
      </div>

      <button
        onClick={handleNewCase}
        className="w-full h-16 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 font-bold text-lg transition-all active:scale-95"
      >
        <MdAdd />
        New Case Entry
      </button>
    </div>
  );
};

export default SummaryPanel;
