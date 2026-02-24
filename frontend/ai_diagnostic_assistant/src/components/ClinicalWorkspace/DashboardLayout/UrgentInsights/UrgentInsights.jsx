import AlertCard from "./AlertCard";

const UrgentInsights = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Urgent Insights</h2>
        <span className="px-2.5 py-1 bg-error/10 text-error text-[11px] font-bold rounded-md tracking-wider uppercase">
          2 New Alerts
        </span>
      </div>

      <AlertCard
        badge="Critical Trend"
        title="Patient ID: #402-A"
        description={
          <>
            System detected a{" "}
            <span className="text-error font-bold">4% drop</span> in O2
            saturation over the last 15 minutes. MedGemma recommends immediate
            vitals review and pulmonary assessment.
          </>
        }
      />
    </section>
  );
};

export default UrgentInsights;
