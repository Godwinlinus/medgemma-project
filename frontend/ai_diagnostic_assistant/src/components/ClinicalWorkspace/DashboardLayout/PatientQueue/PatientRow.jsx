import {
  MdAssignmentInd,
  MdCheckCircle,
  MdLogout,
} from "react-icons/md";

const icons = {
  assignment: MdAssignmentInd,
  check: MdCheckCircle,
  logout: MdLogout,
};

const PatientRow = ({ initials, name, age, status, note, action }) => {
  const Icon = icons[action];

  return (
    <div className="bg-surface p-4 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-between hover:border-primary/50 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center font-bold text-lg">
          {initials}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold">
              {name}, {age}y
            </h4>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black uppercase rounded">
              {status}
            </span>
          </div>
          <p className="text-xs text-textMuted">{note}</p>
        </div>
      </div>

      <button className="w-10 h-10 rounded-lg flex items-center justify-center text-textMuted hover:bg-primary/10 hover:text-primary transition-all">
        <Icon />
      </button>
    </div>
  );
};

export default PatientRow;
