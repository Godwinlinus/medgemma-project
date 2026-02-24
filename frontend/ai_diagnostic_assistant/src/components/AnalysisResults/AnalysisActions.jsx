import { 
    MdAdd,
    MdShare
} from "react-icons/md";

const AnalysisActions = () => (
  <div className="grid grid-cols-2 gap-4 pt-2">
    <button class="flex items-center justify-center gap-2 py-4 px-6 border border-primary/10 dark:hover:bg-white/5 transition-all rounded-xl font-bold transition-all">
      <span><MdShare /></span>
      Export Report
    </button>

      <button class="flex items-center justify-center gap-2 py-4 px-6 border border-primary/10 dark:hover:bg-white/5 transition-all rounded-xl font-bold transition-all">
      <span><MdAdd /></span>
      Save to Case
    </button>
  </div>
);

export default AnalysisActions;
