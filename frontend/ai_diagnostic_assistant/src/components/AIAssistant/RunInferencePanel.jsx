import { MdOutlineSettingsSuggest } from "react-icons/md";
import React, { useState } from 'react'

const RunInferencePanel = ({ onRun }) => {
    const [loading, setLoading] = useState(false)

    const handleRun = async () => {
        setLoading(true)
        try {
            await onRun()
        } finally {
            setLoading(false)
        }
    }

    return (
    <div className="flex flex-col items-center gap-4">
        <button onClick={handleRun} className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all group">
            < MdOutlineSettingsSuggest className="text-xl group-hover:animate-spin" />
            {loading ? 'Running...' : 'Run Local Inference'}
        </button>

        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            <span>Computing On-Device via</span>
            <span className="text-primary">MedGemma 7B</span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span>No data leaves this device</span>
        </div>
    </div>
    )
}

export default RunInferencePanel;
