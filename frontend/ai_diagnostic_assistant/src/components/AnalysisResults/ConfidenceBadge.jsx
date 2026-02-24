const ConfidenceBadge = ({ value }) => (
  <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 text-center min-w-[100px]">
    <p className="text-2xl font-bold text-primary leading-none">
      {value}%
    </p>
    <p className="text-[10px] uppercase font-bold text-primary mt-1 opacity-70">
      Confidence
    </p>
  </div>
);

export default ConfidenceBadge;
