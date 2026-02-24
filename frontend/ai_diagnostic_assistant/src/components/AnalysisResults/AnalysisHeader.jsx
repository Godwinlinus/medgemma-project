import { 
  MdMemory
 } from "react-icons/md";

import { 
  BiAnalyse
 } from "react-icons/bi";

const AnalysisHeader = () => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <h2 className="text-[10px] font-bold uppercase tracking-widest">
        MedGemma Analysis
      </h2>
      <BiAnalyse size={20} />
    </div>

    <div className="flex items-center gap-1.5">
      <MdMemory size={16} />
      <span className="text-[10px] font-bold uppercase tracking-wider">
        Local Inference Complete
      </span>
    </div>
  </div>
);

export default AnalysisHeader;
