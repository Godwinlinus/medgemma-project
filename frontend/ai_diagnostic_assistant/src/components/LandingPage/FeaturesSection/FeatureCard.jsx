import React from 'react'

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="group">
            <div className="w-14 h-14 bg-surface-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-primary text-3xl">
                    {icon}
                </span>
            </div>

            <h3 className="text-sm md:text-xl text-primary-light dark:text-primary-dark font-bold mb-4">{title}</h3>

            <p className="text-slate-500 dark:text-secondary-dark leading-relaxed">
                {description}
            </p>
        </div>
    );
}

export default FeatureCard
