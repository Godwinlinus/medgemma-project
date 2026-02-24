import AiSummaryCard from "./AiSummaryCard";

const AiSummariesSection = () => {
  return (
    <section className="pb-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Recent AI Summaries</h3>
        <a className="text-sm font-semibold text-primary hover:underline" href="#">
          View All
        </a>
      </div>

      <div className="space-y-4">
        <AiSummaryCard
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuDmDZ_7bhLn53eRqu69IAhZrsc8g0UG6X3UW1ajnAlb32kQEF4pk7pVVA_JYPM4IXZjsuAl62zfj0ehejOEbXVjX9Hk-jOZikAhoVOuR9BNhwaHxx5SEma4doYRHVFyvX_iuU9jBLv9x6ojwcy_D1M-uXfW9Dt0B1XZLsLb1_jYpvOti4Umcwxb3FC5lKdl8g6a--NZdMHUs4EcVStsIw2A5mPCXgXCDhf77PH0nqcujbYoU6Sg2k9BKn8pNAj-1_BoqLe3k96wP74"
          badge="MedGemma Core"
          badgeColor="primary"
          title="Meta-analysis: Emerging patterns in antibiotic resistance in urban clinical settings"
          meta="Generated 4h ago • 1.2MB cached"
        />

        <AiSummaryCard
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuA04dRoJPPHgAPXkXXaflpc9Tag-kY1VD82577cD3ymI3EK3iYiVyqcivJJOpu3AI5mMpkRMoK3FnXSVPgCKt9lZX8VNRHowXRtEeIEH_i9THJjhteWdxl2xRdWK9x0Ethd_kDVczT7B5aCTavIBj27FzBolAln5ecXMSbljZUI_GXZI9kdXbHN8q1Vzbl-tD6rhrty7GyoRFsf9Tfe1vESnVWMNeY3ieRuz52oX8xjQUNGuBMDgrDJ7o8xL2UZbOHgwHje8-nYuAo"
          badge="Clinical Summary"
          badgeColor="indigo"
          title="Patient #8229: Longitudinal study summary and diagnostic trajectories"
          meta="Generated 1d ago • 0.5MB cached"
        />
      </div>
    </section>
  );
};

export default AiSummariesSection;
