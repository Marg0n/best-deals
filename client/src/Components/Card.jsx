import React, { useState, useEffect } from 'react';
import img from "../assets/image/empty-white.jpg";
import { Link } from 'react-router-dom';

const Card = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isRightSide, setIsRightSide] = useState(true);

    // Function to determine if the card is on the right side of the screen
    const handleHover = (e) => {
        const cardRect = e.target.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        // Check if the card's right edge is too close to the window's right edge
        if (cardRect.right + 260 > windowWidth) {
            setIsRightSide(false); // Place modal to the left if close to right edge
        } else {
            setIsRightSide(true);  // Place modal to the right if there’s space
        }

        setIsHovered(true);
    };

    return (
        <Link>
            <div
                className="relative p-4 border rounded-lg shadow-lg"
                onMouseEnter={(e) => handleHover(e)}
                onMouseLeave={() => setIsHovered(false)}
            >
               
                <img className="hover:blur-sm" src={img} alt="Sample" />

                
                {isHovered && (
                    <div
                        className={`absolute top-0 ${isRightSide ? 'left-full ml-4' : 'right-full mr-4'} bg-white shadow-lg rounded-lg p-4 border w-60 h-32 z-50`}
                        style={{ transform: 'translateY(0)' }}
                    >
                        <h2 className="text-sm font-semibold">product name</h2>
                        <p className="text-xs">Additional info here.</p>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default Card;
