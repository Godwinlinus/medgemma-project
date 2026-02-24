import { MdScience, MdPsychology, MdBiotech } from "react-icons/md";

const iconMap = {
  radiology: MdScience,
  psychology: MdPsychology,
  biotech: MdBiotech,
};

const ActivityItem = ({ type, title, meta, status, statusColor }) => {
  const Icon = iconMap[type] || MdScience;
  return (
    <div className="flex items-center justify-between p-4 bg-background-dark/30 border border-border-dark rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
          <Icon />
        </div>
        <div>
          <p className="text-white text-sm font-bold">{title}</p>
          <p className="text-slate-500 text-xs">{meta}</p>
        </div>
      </div>
      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${statusColor}`}>
        {status}
      </span>
    </div>
  );
};

export default ActivityItem;
