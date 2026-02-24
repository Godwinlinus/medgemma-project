import { MdCheckCircle } from "react-icons/md";

const badgeMap = {
  primary: "bg-primary/20 text-primary border-primary/30",
  indigo: "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
};

const AiSummaryCard = ({ image, badge, badgeColor, title, meta }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl border border-border-light dark:border-border-dark">
      {/* Image background */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover opacity-30 group-hover:opacity-40 transition-opacity"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent p-8 flex flex-col justify-end">
        {/* Badge + verified icon */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${badgeMap[badgeColor]}`}
          >
            {badge}
          </span>
          <MdCheckCircle className="text-[14px] text-primary flex-shrink-0" />
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h4>

        {/* Metadata */}
        <p className="text-sm text-slate-500 dark:text-slate-400">{meta}</p>
      </div>
    </div>
  );
};

export default AiSummaryCard;
