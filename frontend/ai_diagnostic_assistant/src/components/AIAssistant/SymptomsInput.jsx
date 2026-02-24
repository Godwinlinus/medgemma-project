import React from 'react'

const SymptomsInput = ({ symptoms, setSymptoms }) => (
  <div className="space-y-4">
    <label className="text-sm uppercase tracking-[0.2em]">
      Clinical Symptoms
    </label>

    <div className="relative">
      <textarea
        rows="6"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Describe patient presentation, medical history, and physical findings in detail..."
        className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none placeholder-slate-500"
      />

      <div className="absolute bottom-3 right-3 text-[10px] text-slate-500 font-mono tracking-tighter">
        ALT + ENTER TO SUBMIT
      </div>
    </div>
  </div>
)

export default SymptomsInput;
