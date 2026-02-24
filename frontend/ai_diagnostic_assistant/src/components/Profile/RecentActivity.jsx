import { MdHistory } from "react-icons/md";
import ActivityItem from "./ActivityItem";

const RecentActivity = ({ activities }) => {
  return (
    <section className="bg-card-dark border border-border-dark rounded-xl overflow-hidden">
      <div className="px-6 pt-6 pb-2 flex justify-between items-center">
        <h2 className="text-white text-xl font-bold flex items-center gap-2">
          <MdHistory className="text-primary" /> Recent Activity
        </h2>
        <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">
          View All
        </button>
      </div>
      <div className="p-6 flex flex-col gap-4">
        {activities.map((act, i) => (
          <ActivityItem
            key={i}
            type={act.type}
            title={act.title}
            meta={act.meta}
            status={act.status}
            statusColor={act.statusColor}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;
