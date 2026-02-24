const ImpactStats = ({ stats, avgTurnaround }) => {
  return (
    <section className="bg-primary/10 border border-primary/20 rounded-xl p-6">
      <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
        Clinical Impact
      </h2>
      <div className="space-y-4">
        {stats.map((stat, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300 text-xs font-medium">{stat.label}</span>
              <span className="text-primary text-xs font-bold">{stat.value}</span>
            </div>
            <div className="w-full bg-border-dark h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: stat.value }}></div>
            </div>
          </div>
        ))}
        {avgTurnaround && (
          <div className="pt-2">
            <div className="p-3 bg-background-dark/40 rounded-lg border border-primary/10">
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">
                Average Turnaround
              </p>
              <p className="text-white text-xl font-bold">
                {avgTurnaround.value} <span className="text-xs text-slate-500 font-normal">{avgTurnaround.unit}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImpactStats;
