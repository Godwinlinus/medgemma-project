import React from 'react'
import Logo from '../Logo'
import Nav from './Nav'
import Settings from './Settings'

const Aside = () => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <div 
            className={`hidden border-r border-slate-200 dark:border-white/5 bg-surface-light dark:bg-surface-dark md:flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out ${
                isHovered ? 'w-64' : 'w-25'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Sidebar content goes here */}
            <div className='p-4'>
                <Logo />  
            </div>
            
            <Nav isHovered={isHovered} />
            <Settings isHovered={isHovered} />
        
        </div>
    )
}

export default Aside
