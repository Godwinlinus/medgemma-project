import { 
    MdMenuBook,
    MdOutlineHistory,
    MdOutlineDownload
 } from "react-icons/md";
import React from 'react'

const SampleResultCard = ({ analysis = null, files = [] }) => {
  const hasAnalysis = !!analysis && !analysis.error

  return (
    <div className={`bg-surface-light dark:bg-white/[0.03] border border-border-light dark:border-border-dark rounded-2xl p-6 ${hasAnalysis ? '' : 'opacity-40 grayscale pointer-events-none'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">
            {hasAnalysis ? 'Diagnostic Output' : 'Sample Output'}
          </span>
          <h4 className="text-xl font-bold mt-2">{hasAnalysis ? (analysis.primary_diagnosis || 'Primary Diagnosis') : 'Primary Diagnosis'}</h4>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-primary">{hasAnalysis ? (analysis.confidence || '—') : '— %'}</span>
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
            Confidence
          </p>
        </div>
      </div>

      <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-primary/20" style={{width: hasAnalysis && analysis.confidence ? `${parseFloat(analysis.confidence) || 0}%` : '0%'}} />
      </div>

      {hasAnalysis ? (
        <div className="space-y-4">
          <div className="text-sm text-slate-700 dark:text-slate-200">
            <strong>Clinical Reasoning</strong>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300">{analysis.clinical_reasoning}</p>
          </div>

          {Array.isArray(analysis.recommendations) && analysis.recommendations.length > 0 && (
            <div>
              <strong>Recommendations</strong>
              <ul className="list-disc ml-5 text-sm text-slate-600 dark:text-slate-300">
                {analysis.recommendations.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}

          {Array.isArray(analysis.differential_diagnoses) && analysis.differential_diagnoses.length > 0 && (
            <div>
              <strong>Differential Diagnoses</strong>
              <ul className="list-disc ml-5 text-sm text-slate-600 dark:text-slate-300">
                {analysis.differential_diagnoses.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          )}

          {files && files.length > 0 && (
            <div>
              <strong>Uploaded Files</strong>
              <ul className="mt-2 space-y-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <div className="truncate mr-4">{f.filename || f.name || f.file_id}</div>
                    {f.url ? (
                      <a className="text-primary hover:underline flex items-center gap-2" href={f.url} target="_blank" rel="noreferrer">
                        <MdOutlineDownload /> View
                      </a>
                    ) : (
                      <span className="text-slate-500">Processing</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-xs text-slate-500 flex gap-6">
            <span className="flex items-center gap-1"><MdMenuBook /> Citations: {analysis.citations ? analysis.citations.length : 0}</span>
            <span className="flex items-center gap-1"><MdOutlineHistory /> Updated: {analysis.timestamp || '—'}</span>
          </div>
        </div>
      ) : (
        <div className="flex gap-6 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <MdMenuBook className="text-sm" /> 0 Citations
          </span>
          <span className="flex items-center gap-1.5">
            <MdOutlineHistory className="text-sm" /> Updated: —
          </span>
        </div>
      )}
    </div>
  )
}

export default SampleResultCard;
