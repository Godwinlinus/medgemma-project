import React from 'react'
import FeatureCard from './FeatureCard.jsx'
import { 
    MdMemory,
    MdAutoGraph
} from "react-icons/md";
import { GrCluster } from "react-icons/gr";

const FeaturesSection = () => {
    return (
        <section className="py-24 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
                icon={<MdMemory />}
                title="MedGemma 7B Native"
                description="Optimized specifically for medical clinical notes and diagnostic assistance. Fine-tuned on millions of medical journals and anonymized case files."
            />

            <FeatureCard
                icon={<GrCluster />}
                title="Edge Infrastructure"
                description="Runs on standard NVIDIA workstation hardware or data center clusters. No data leaves the premise, ensuring absolute compliance with local regulations."
            />

            <FeatureCard
                icon={<MdAutoGraph />}
                title="Patient Monitoring"
                description="Real-time telemetry analysis for early critical trend detection. Alerts are generated locally and prioritized by clinical urgency."
            />
            </div>
        </div>
        </section>
    )
}

export default FeaturesSection
