import { MdOutlinePlaylistAddCheck } from "react-icons/md";

const RecommendedSteps = ({ steps }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <MdOutlinePlaylistAddCheck className="text-xl" />
      <h3 className="font-semibold text-slate-900 dark:text-white">Recommended Next Steps</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {steps.map((step, index) => (
        <div 
          key={index}
          className="px-4 py-2 bg-slate-100 dark:bg-white/10 rounded-lg text-sm text-slate-700 dark:text-slate-300"
        >
          {step}
        </div>
      ))}
    </div>
  </div>
);

export default RecommendedSteps;
