import ToolCard from "./ToolCard";
import { MdMedication, MdCalculate } from "react-icons/md";

const DrugToolsSection = () => {
  return (
    <section>
      <h3 className="text-xl font-bold mb-6">Drug Database & Tools</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToolCard
          icon={<MdMedication className="text-2xl" />}
          color="primary"
          title="Interaction Checker"
          description="Full offline compatibility with MedGemma engine for drug-to-drug safety."
        />

        <ToolCard
          icon={<MdCalculate className="text-2xl" />}
          color="indigo"
          title="Dosage Calculator"
          description="Pediatric & geriatric specialized scales for sensitive dosing."
        />
      </div>
    </section>
  );
};

export default DrugToolsSection;
