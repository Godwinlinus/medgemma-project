import { MdCheckCircle, MdArrowForward } from "react-icons/md";

const colorMap = {
  rose: "bg-rose-500/10 text-rose-500",
  amber: "bg-amber-500/10 text-amber-500",
  blue: "bg-blue-500/10 text-blue-500",
};

const GuidelineCard = ({ icon, color, title, description, meta }) => {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 rounded-2xl transition-all cursor-pointer group shadow-sm">
      {/* Top icons */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}
        >
          {icon}
        </div>
        <MdCheckCircle className="text-slate-300 dark:text-slate-600 text-xl flex-shrink-0" />
      </div>

      {/* Title */}
      <h4 className="font-bold text-lg mb-2 transition-colors">
        {title}
      </h4>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">
        {description}
      </p>

      {/* Meta + Open */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400">
        <span>{meta}</span>
        <span className="text-primary transition-transform inline-flex items-center">
          OPEN
          <MdArrowForward className="text-[16px] ml-1" />
        </span>
      </div>
    </div>
  );
};

export default GuidelineCard;
