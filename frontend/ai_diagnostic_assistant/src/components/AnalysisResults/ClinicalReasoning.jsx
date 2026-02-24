import { 
  MdOutlinePsychology,
  MdOutlineCheckCircle
 } from "react-icons/md";

const ClinicalReasoning = ({ points }) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <MdOutlinePsychology title="Clinical Reasoning" />
      <h3 className="text-lg font-bold uppercase tracking-widest">Clinical Reasoning</h3>
    </div>
    
    
    <ul className="space-y-4">
      {points.map((text, i) => (
        <li key={i} className="flex gap-3">
          <MdOutlineCheckCircle className="mt-1" />
          <p className="text-sm dark:text-slate-300">
            {text}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

export default ClinicalReasoning;
