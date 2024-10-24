import React from 'react';
import img from "../assets/image/Best_Deal.png"
import img1 from "../assets/image/User.png"

const Header = () => {
    return (
        <div className="container mx-auto bg-[#d9cfae] px-2">
            <div className='flex items-center justify-between py-2'>
                <img className="h-14 lg:h-20" src={img} alt="" />
                <div>
                    <div className='flex items-center gap-2'>
                        <label className="input input-bordered flex items-center gap-2 lg:hidden bg-[#587177] rounded-[20px]">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                        <p className="bg-[#34394c] rounded-[63px] px-8 py-2 text-white text-lg font-normal font-['Inter'] hidden lg:block">Be a Vendor</p>
                        <img className='h-12 w-12' src={img1} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;