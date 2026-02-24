import { MdWarning } from "react-icons/md";

const AlertCard = ({ badge, title, description }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />

      <div className="bg-surface p-6 border border-border rounded-xl shadow-sm hover:shadow-md transition-all">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <MdWarning className="text-xl" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
                  {badge}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>

              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-textSecondary max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all">
              View Vitals
            </button>
            <button className="px-6 py-2.5 border border-border font-semibold rounded-xl hover:bg-surface transition-all">
              Acknowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
