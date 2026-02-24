import React from 'react'
import LandingPageNavBar from '../components/LandingPage/NavBar/LandingPageNavBar.jsx'
import Hero from '../components/LandingPage/Hero/Hero.jsx'
import FeaturesSection from '../components/LandingPage/FeaturesSection/FeaturesSection.jsx'
import Footer from '../components/LandingPage/Footer/Footer.jsx'
import FloatingNodeStatus from '../components/FloatingNodeStatus.jsx'

const LandingPage = () => {
    return (
        <div>
            <LandingPageNavBar />
            <Hero />
            <FeaturesSection />
            <Footer />
            <FloatingNodeStatus />
        </div>
    )
}

export default LandingPage
