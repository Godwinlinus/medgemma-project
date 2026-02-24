import React from 'react'
import Aside from '../components/sideBar/Aside'
import Header from '../components/Header/Header'
import ClinicalGuidelinesSection from '../components/Library/ClinicalGuidelinesSection'
import DrugToolsSection from '../components/Library/DrugToolsSection'
import AiSummariesSection from '../components/Library/AiSummariesSection'


const Library = () => {
  return (
    <div className='min-h-screen flex'>
        <Aside />
        <main className='flex-1 flex flex-col min-w-0'>
          {/* Main content goes here */}
          <Header />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
            <div className="max-w-6xl mx-auto space-y-12">
              {/* Library content can be added here */}

              <ClinicalGuidelinesSection />
              <DrugToolsSection />
              <AiSummariesSection />
            </div>
          </div>
        </main>
      </div>
  )
}

export default Library
