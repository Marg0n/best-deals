import React from 'react';

const ThemeController = ({ toggleTheme, theme }) => {
    return (
        <div className="flex items-center justify-center">
            <label className="relative flex items-center cursor-pointer">
                <input
                    onChange={toggleTheme}
                    type="checkbox"
                    checked={theme === "dark"}
                    className="toggle theme-controller sr-only"
                />

                <div className="w-14 h-7 bg-base-content rounded-full"></div>
                <div className={`absolute left-1 top-1 w-5 h-5 bg-white  rounded-full transition-transform transform ${theme === "dark" ? 'translate-x-7' : 'translate-x-0'}`}></div>

                {/* Conditionally render SVG based on the theme */}
                {theme === "light" ? (
                    <svg
                        className="absolute left-1 w-4 h-4 stroke-[#775050] fill-[#775050]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                ) : (
                    <svg
                        className="absolute right-1 w-4 h-4 stroke-base-100 fill-base-100"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                )}
            </label>
        </div>
    );
};

export default ThemeController;
