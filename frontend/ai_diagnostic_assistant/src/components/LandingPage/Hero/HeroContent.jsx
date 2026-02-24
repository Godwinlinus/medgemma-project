import React from 'react'
import HeroBadeg from './HeroBadge.jsx'
import FeatureItem from './FeaturedItem.jsx'
import { 
    MdOfflineBolt,
    MdOutlineSecurity 
} from "react-icons/md";
import HeroBadge from './HeroBadge.jsx';

const HeroContent = () => {
    return (
        <div className="flex flex-col gap-8 items-center">
            <HeroBadge />

            <h1 className="text-4xl lg:text-7xl font-display font-bold tracking-normal leading-[1.1] max-w-2xl text-center">
                Precision Intelligence for{" "}
                <span className="text-primary">Modern Clinicians.</span>
            </h1>

            <p className="text-sm md:text-lg leading-relaxed max-w-4xl items-center text-center">
                Deploy MedGemma 7B directly within your clinical environment. Local
                inference, secure patient data handling, and real-time diagnostic
                insights designed for high-stakes healthcare.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <FeatureItem
                    icon={<MdOfflineBolt />}
                    title="Offline Inference"
                    description="Run LLMs locally on hospital infrastructure without internet dependency."
                />
                <FeatureItem
                    icon={<MdOutlineSecurity />}
                    title="Zero-Trust Data"
                    description="Your patient data never leaves the institutional network. Fully encrypted."
                />
            </div>
        </div>
    )
}

export default HeroContent
