import React from 'react'

const FloatingNodeStatus = () => {
    return (
        <div className="fixed bottom-6 right-6 hidden md:flex flex-col items-end space-y-3 cursor-pointer">
            <div className="bg-card-dark/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl flex items-center space-x-3 pointer-events-auto cursor-help group">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(45,138,138,0.8)]"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                        Gamma-7
                    </span>
            </div>
        </div>
    )
}

export default FloatingNodeStatus
