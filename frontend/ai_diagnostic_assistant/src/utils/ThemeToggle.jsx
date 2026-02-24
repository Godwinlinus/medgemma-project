import React from 'react'
import { 
    FaMoon,
    FaSun
} from "react-icons/fa";

const ThemeToggle = () => {
    const [theme, setTheme] = React.useState(() => {
        return document.documentElement.getAttribute("data-theme") || "dark";
    });

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };


    return (
        <div>
            <button onClick={toggleTheme}>
                {theme === "light" ?  <FaSun /> : <FaMoon />}
            </button>
        </div>
    )
}

export default ThemeToggle
