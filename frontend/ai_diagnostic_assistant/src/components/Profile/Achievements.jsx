import { MdWorkspacePremium, MdMonitor, MdSecurity } from "react-icons/md";
import AchievementItem from "./AchievementItem";

const Achievements = () => {
  const achievements = [
    { icon: <MdWorkspacePremium className="text-2xl" />, title: "AI Diagnostics Tier 1", subtitle: "Top 5% Accuracy Rating", gradient: "bg-gradient-to-br from-primary to-emerald-600" },
    { icon: <MdMonitor className="text-2xl" />, title: "500+ Cases Reviewed", subtitle: "Verified by Diagnostic AI", gradient: "bg-gradient-to-br from-indigo-500 to-primary" },
    { icon: <MdSecurity className="text-2xl" />, title: "HIPAA Certified 2024", subtitle: "Data Privacy & Compliance", gradient: "bg-gradient-to-br from-slate-600 to-slate-800" },
  ];

  return (
    <section className="bg-card-dark border border-border-dark rounded-xl p-6">
      <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
        Achievements
      </h2>
      <div className="flex flex-col gap-4">
        {achievements.map((ach, i) => (
          <AchievementItem key={i} {...ach} />
        ))}
      </div>
    </section>
  );
};

export default Achievements;
