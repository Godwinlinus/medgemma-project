import { MdWarning } from "react-icons/md";

const AdvancedTuningCard = ({
  consensusEnabled = false,
  setConsensusEnabled
}) => {
  const handleToggle = () => {
    setConsensusEnabled((prev) => !prev);
  };

  return (
    <section className="bg-surface-dark border border-border-dark rounded-xl p-6">
      <div className="flex items-start gap-4">
        {/* Warning Icon */}
        <div
          className="p-3 rounded-lg bg-orange-500/10 text-orange-500 shrink-0"
          aria-hidden="true"
        >
          <MdWarning size={20} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 max-w-xl">
          <span className="font-bold text-orange-500">
            Experimental Feature: Multi-agent Consensus
          </span>

          <span className="text-sm text-slate-500 leading-snug">
            Routes each finding through three independent model versions to
            cross-validate results. Expect approximately a 2.5× increase in
            inference latency.
          </span>

          <button
            type="button"
            className="
              mt-2 text-sm font-bold
              underline underline-offset-4
              text-slate-400 hover:text-primary
              transition-colors
              self-start
            "
          >
            Learn more about consensus logic
          </button>
        </div>

        {/* Toggle */}
        <div className="ml-auto pt-1">
          <label
            className="relative inline-flex items-center cursor-pointer"
            aria-label="Enable multi-agent consensus"
          >
            <input
              type="checkbox"
              className="sr-only peer"
              checked={consensusEnabled}
              onChange={handleToggle}
            />
            <div
              className="
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
              "
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default AdvancedTuningCard;
