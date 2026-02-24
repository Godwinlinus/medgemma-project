import ConfidenceBadge from "./ConfidenceBadge";
import ConfidenceBar from "./ConfidenceBar";

const PrimaryFindingCard = ({ title, confidence }) => (
  <div>
    <div className="flex justify-between items-start mb-6">
      <div>
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
          Primary Finding
        </span>
        <h3 className="text-2xl lg:text-3xl font-bold mt-1">
          {title}
        </h3>
      </div>

      <ConfidenceBadge value={confidence} />
    </div>

    <ConfidenceBar value={confidence} />
  </div>
);

export default PrimaryFindingCard;
