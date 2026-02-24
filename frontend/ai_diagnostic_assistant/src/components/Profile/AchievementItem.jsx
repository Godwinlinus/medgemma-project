const AchievementItem = ({ icon, title, subtitle, gradient }) => {
  return (
    <div className="flex items-center gap-3 group">
      <div className={`w-12 h-12 rounded-lg ${gradient} flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-white text-sm font-bold">{title}</p>
        <p className="text-slate-500 text-xs">{subtitle}</p>
      </div>
    </div>
  );
};

export default AchievementItem;
