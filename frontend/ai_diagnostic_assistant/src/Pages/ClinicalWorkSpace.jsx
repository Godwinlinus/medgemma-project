import React from 'react'
import Aside from '../components/sideBar/Aside'
import Header from '../components/Header/Header'
// import UrgentInsights from '../components/ClinicalWorkspace/DashboardLayout/UrgentInsights/UrgentInsights'
import PatientQueue from '../components/ClinicalWorkspace/DashboardLayout/PatientQueue/PatientQueue'
import SummaryPanel from '../components/ClinicalWorkspace/DashboardLayout/SummaryPanel/SummaryPanel'
import FloatingActionButton from '../components/FloatingActionButton'


const ClinicalWorkSpace = () => {
  return (
    <div className='min-h-screen flex'>
      <Aside />
      <main className='flex-1 flex flex-col min-w-0'>
        {/* Main content goes here */}
        <Header />
        <div className='p-8 mx-auto w-full space-y-8 grid lg:grid-cols-[2fr_1fr] lg:grid-rows-1 lg:gap-8 lg:grid-flow-col'>
          {/* Add your main workspace content here */}
          {/* <UrgentInsights /> */}
          <PatientQueue />
          <div className="items-end lg:pt-11">
            <SummaryPanel />
          </div>
          
        </div>

        <FloatingActionButton />

      </main>
    </div>
  )
}

export default ClinicalWorkSpace
