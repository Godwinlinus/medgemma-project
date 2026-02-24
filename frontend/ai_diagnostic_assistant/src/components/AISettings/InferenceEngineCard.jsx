const InferenceEngineCard = ({
  localInference = false,
  setLocalInference,
  confidence = 50,
  setConfidence
}) => {
  const handleToggle = () => {
    setLocalInference((prev) => !prev);
  };

  const handleConfidenceChange = (e) => {
    setConfidence(Number(e.target.value));
  };

  return (
    <section className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden p-6 space-y-8">
      {/* Header */}
      <header className="pb-4 border-b border-border-dark">
        <h3 className="text-sm font-bold tracking-wide">
          Inference Engine
        </h3>
      </header>

      {/* Local Inference Toggle */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col gap-1 max-w-md">
          <span className="font-bold">
            Enable Local Inference
          </span>
          <span className="text-sm text-slate-500 leading-snug">
            Process sensitive images on local hardware instead of remote cloud GPU clusters.
          </span>
        </div>

        <label
          className="relative inline-flex items-center cursor-pointer"
          aria-label="Enable local inference"
        >
          <input
            type="checkbox"
            checked={localInference}
            onChange={handleToggle}
            className="sr-only peer"
          />
          <div className="
            w-11 h-6 rounded-full
            bg-slate-300 dark:bg-slate-700
            peer-checked:bg-primary
            transition-colors
            relative
            after:absolute
            after:top-[2px]
            after:left-[2px]
            after:h-5 after:w-5
            after:rounded-full
            after:bg-white
            after:border after:border-gray-300
            after:transition-transform
            peer-checked:after:translate-x-full
          " />
        </label>
      </div>

      {/* Confidence Threshold */}
      <div className="space-y-4">
        <div className="flex justify-between items-end gap-6">
          <div className="flex flex-col gap-1 max-w-md">
            <span className="font-bold">
              Confidence Threshold
            </span>
            <span className="text-sm text-slate-500 leading-snug">
              Minimum probability required for the system to surface a diagnostic finding.
            </span>
          </div>

          <span
            className="px-3 py-1 rounded-md
                       bg-primary/10 text-primary
                       font-bold text-lg tabular-nums"
            aria-live="polite"
          >
            {confidence}%
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={confidence}
          onChange={handleConfidenceChange}
          aria-label="Confidence threshold"
          className="
            w-full h-2 rounded-lg
            bg-black/10
            appearance-none cursor-pointer
            accent-primary
            focus:outline-none focus:ring-2 focus:ring-primary/40
          "
        />

        <div className="flex justify-between text-xs text-slate-500 px-1">
          <span>Conservative (0%)</span>
          <span>Aggressive (100%)</span>
        </div>
      </div>
    </section>
  );
};

export default InferenceEngineCard;
