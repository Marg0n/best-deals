import React, { useState, useEffect } from 'react';

const Banner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [
        "https://i.ibb.co.com/yVVD2CD/best-deal-cover.jpg",
        "https://i.ibb.co.com/PtDY1P4/best-deal-cover2.jpg",
        "https://i.ibb.co.com/r2nGHzs/best-deal-cover3.jpg"
    ];

    // Auto slider logic
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); 

        return () => clearInterval(interval); 
    }, [images.length]);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative">
            <div className="carousel w-full ">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`carousel-item w-full transition-all duration-500 ease-in-out ${activeIndex === index ? 'block' : 'hidden'}`}
                    >
                        <img src={img} className="w-full" alt={`slide-${index}`} />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                onClick={handlePrev}
            >
                &#8592; {/* Left Arrow */}
            </button>
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                onClick={handleNext}
            >
                &#8594; {/* Right Arrow */}
            </button>
        </div>
    );
};

export default Banner;
