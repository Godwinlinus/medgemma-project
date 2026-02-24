import React from 'react'
import FooterLinks from './FooterLinks.jsx'

const Footer = () => {
    return (
        <footer className="py-12 border-t border-slate-200 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs font-medium">
                <FooterLinks />
            </div>
        </footer>
    )
}

export default Footer
