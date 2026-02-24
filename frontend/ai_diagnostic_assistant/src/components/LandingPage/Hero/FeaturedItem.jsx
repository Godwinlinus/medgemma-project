import React from 'react'

const FeaturedItem = ({ icon, title, description }) => {
    return (
        <div className="flex flex-col space-y-2 bg-surface-light dark:bg-surface-dark backdrop-blur-md border border-primary/20 dark:border-white/10 p-4 rounded-2xl">
            <span className="material-icons-round text-primary text-2xl">{icon}</span>
            <h3 className="font-bold text-sm">{title}</h3>
            <p className="text-xs text-slate-500">{description}</p>
        </div>
    )
}

export default FeaturedItem
