import React, { useState } from 'react'
import Header from '../components/Header/Header'
import MainLayout from '../components/AnalysisResults/MainLayout'
import ImagingHeader from '../components/AnalysisResults/ImagingHeader'
import ImagingViewer from '../components/AnalysisResults/ImagingViewer'
import AnalysisHeader from '../components/AnalysisResults/AnalysisHeader'
import PrimaryFindingCard from '../components/AnalysisResults/PrimaryFindingCard'
import ClinicalReasoning from '../components/AnalysisResults/ClinicalReasoning'
import RecommendedSteps from '../components/AnalysisResults/RecommendedSteps'
import AnalysisActions from '../components/AnalysisResults/AnalysisActions'
import BottomNav from '../components/BottomNav'

const Results = () => {
  const [activeTab, setActiveTab] = useState("ai");
  return (
    <div className='min-h-full flex flex-col'>
      <main className='flex-1 flex flex-col min-w-0'>
        <Header />
        <MainLayout
            left={
                <>
                    <ImagingHeader />
                    <ImagingViewer 
                        src="https://lh3.googleusercontent.com/aida-public/..."
                        type="Chest X-Ray (PA View)"
                    />
                </>
                
            }
            right={
                <>
                    {/* Right panel content goes here */}
                    <AnalysisHeader />
                    <div className='space-y-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-6 shadow-sm'>
                      <PrimaryFindingCard
                        title="Community-Acquired Pneumonia"
                        confidence={88}
                      />
                      <div className='space-y-6'>
                        <ClinicalReasoning points={[
                          "Increased opacity in the right lower lobe consistent with alveolar consolidation.", 
                          "Presence of air bronchograms indicating fluid/pus in the terminal airways.",
                          "No evidence of pleural effusion or pneumothorax."
                          ]} 
                        />
                        <div className="h-px bg-border-light dark:bg-border-dark"></div>

                        <RecommendedSteps steps={[
                          "Sputum Culture and Gram Stain", 
                          "Empiric antibiotics",
                          "Follow-up Chest X-Ray in 6 weeks"
                        ]} />

                      </div>
                    </div>
                    
                    <AnalysisActions />
                    
                </>
            }
        />
      </main>

      <BottomNav
        active={activeTab}
        onChange={(tab) => setActiveTab(tab)}
      />
    </div>
  )
}

export default Results
