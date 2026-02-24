import React from 'react'

const StatCard = ({ icon: Icon, value, label, accent }) => {
  return (
    <div className={`p-8 rounded-2xl border transition-all ${
      accent 
        ? 'bg-primary/10 border-primary/20 dark:border-primary/30' 
        : 'bg-surface-light dark:bg-surface-dark border-slate-200 dark:border-white/5'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-xl ${
          accent
            ? 'bg-primary/20'
            : 'bg-slate-100 dark:bg-white/5'
        }`}>
          <Icon className={`text-xl ${accent ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`} />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{value}</span>
          <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
        </div>
      </div>
    </div>
  )
}

export default StatCard
