import React from 'react'
import HeroContent from './HeroContent.jsx'

const Hero = () => {
    return (
        <div className="relative pt-32 sm:pt-50 pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 items-center">
                <HeroContent />
            </div>
        </div>
    )
}

export default Hero
