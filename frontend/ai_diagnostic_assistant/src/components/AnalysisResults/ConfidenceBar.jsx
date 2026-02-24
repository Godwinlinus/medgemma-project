const ConfidenceBar = ({ value }) => (
  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-8">
    <div
      className="bg-primary h-full rounded-full transition-all duration-1000"
      style={{ width: `${value}%` }}
    />
  </div>
);

export default ConfidenceBar;
