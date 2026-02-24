import React, { useState } from 'react'
import Aside from '../components/sideBar/Aside'
import Header from '../components/Header/Header'
import SectionHeader from '../components/AIAssistant/SectionHeader'
import MediaUploadCard from '../components/AIAssistant/MediaUploadCard'
import SymptomsInput from '../components/AIAssistant/SymptomsInput'
import RunInferencePanel from '../components/AIAssistant/RunInferencePanel'
import SampleResultCard from '../components/AIAssistant/SampleResultCard'
import CaseInputSection from '../components/AIAssistant/CaseInputSection'

const AiAssistant = () => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [symptoms, setSymptoms] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFilesAdded = (files) => {
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const handleFileUploaded = (fileRecord) => {
    setUploadedFiles((prev) => prev.map(f => f.file_id === fileRecord.file_id ? fileRecord : f))
  }

  const runInference = async (opts = {}) => {
    const payload = {
      symptoms: symptoms,
      medical_history: opts.medical_history || ''
    }

    try {
      const res = await fetch('/api/inference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (res.ok) setAnalysis(data.analysis)
      else setAnalysis({ error: data.error || 'Inference failed' })
      return data
    } catch (e) {
      setAnalysis({ error: e.message })
      return { error: e.message }
    }
  }

  return (
    <div className='min-h-screen flex'>
      <Aside />
      <main className='flex-1 flex flex-col min-w-0'>
        {/* Main content goes here */}
        <Header />
        <CaseInputSection>
          <SectionHeader title="Input Case Data" />
          <MediaUploadCard onFilesAdded={handleFilesAdded} onFileUploaded={handleFileUploaded} uploading={uploading} setUploading={setUploading} />
          <SymptomsInput symptoms={symptoms} setSymptoms={setSymptoms} />
          <RunInferencePanel onRun={() => runInference()} />

          <div className='pt-8 space-y-6'>
            {/* Additional sections can be added here */}
            <SectionHeader title="Diagnostic Results" />
            <SampleResultCard analysis={analysis} files={uploadedFiles} />
          </div>
        </CaseInputSection>

      </main>
    </div>
  )
}

export default AiAssistant
