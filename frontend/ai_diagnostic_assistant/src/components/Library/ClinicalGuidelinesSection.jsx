import GuidelineCard from "./GuidelineCard";
import SearchInput from "./SearchInput";
import {
  MdFavorite,
  MdLocalHospital,
  MdScience,
} from "react-icons/md";

const ClinicalGuidelinesSection = () => {

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-8">
        <h3 className="text-lg font-bold flex items-center">
          Clinical Guidelines
        </h3>
        <SearchInput />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GuidelineCard
          icon={<MdFavorite className="text-xl" />}
          color="rose"
          title="Cardiology 2024"
          description="ESC/ACC protocols for acute coronary syndrome and chronic management guidelines."
          meta="124 MB • PDF"
        />

        <GuidelineCard
          icon={<MdLocalHospital className="text-xl" />}
          color="amber"
          title="Emergency Triage"
          description="Modified Early Warning System (MEWS) updates for high-acuity departments."
          meta="88 MB • WEB"
        />

        <GuidelineCard
          icon={<MdScience className="text-xl" />}
          color="blue"
          title="Endocrinology"
          description="Latest ADA standards for diabetes care and pharmacological interventions."
          meta="42 MB • PDF"
        />
      </div>
    </section>
  );
};

export default ClinicalGuidelinesSection;
