import React from 'react'

const FooterLinks = () => {
    return (
        <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <span>© {new Date().getFullYear()} Clinical Workspace Inc.</span>
            <a href="#" className="hover:text-primary">
                Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
                Terms of Service
            </a>
            <a href="#" className="hover:text-primary">
                EULA
            </a>
        </div>
    )
}

export default FooterLinks
