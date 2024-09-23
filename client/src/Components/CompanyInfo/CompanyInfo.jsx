import React from 'react';

const CompanyInfo = () => {
    return (
        <div className='py-3 px-4 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2] w-1/2'>
            <p className='text-[#191c21] text-xs font-semibold'>To</p>
            <p className='text-[#5e6470] text-xs font-semibold'>Company Name</p>
            <p className='text-[#5e6470] text-xs font-normal'>Company address</p>
            <p className='text-[#5e6470] text-xs font-normal'>City, Country - 00000</p>
            <p className='text-[#5e6470] text-xs font-normal'>+0 (000) 123-4567</p>

        </div>
    );
};

export default CompanyInfo;