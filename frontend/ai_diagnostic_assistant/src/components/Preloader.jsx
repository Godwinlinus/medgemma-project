import React from "react";
import { MdWorkspacesFilled } from "react-icons/md";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <MdWorkspacesFilled className="text-primary text-3xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
