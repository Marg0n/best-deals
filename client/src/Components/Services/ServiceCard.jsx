import React from 'react';

const ServiceCard = ({img , title , text}) => {
    return (
        <div className='bg-white shadow-lg rounded-lg max-w-52 p-4 text-center flex flex-col items-center'>
            <img 
                className='max-w-12 max-h-12 mb-4' 
                src={img} 
                alt="Warranty Icon" 
            />
            <h2 className="font-bold text-sm uppercase  mb-2">{title}</h2>
            <p className="text-sm text-gray-500">{text}</p>
        </div>
    );
};

export default ServiceCard;
