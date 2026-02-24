import { MdCheckCircle } from "react-icons/md";

const colorMap = {
  primary: "bg-primary/10 text-primary",
  indigo: "bg-indigo-500/10 text-indigo-500",
};

const ToolCard = ({ 
  icon, 
  color, 
  title, 
  description 
}) => {
  return (
    <div className="bg-surface-dark border border-border-dark rounded-2xl p-5 flex items-center gap-5 cursor-pointer group shadow-sm">
      {/* Icon Circle */}
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorMap[color]}`}
      >
        {icon}
      </div>

      {/* Title & Description */}
      <div className="flex-1">
        <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      {/* Check Icon */}
      <MdCheckCircle className="text-primary text-2xl flex-shrink-0" />
    </div>
  );
};

export default ToolCard;
