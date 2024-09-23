import React from 'react';

const BankDetail = () => {
    return (
        <div className='py-3 px-4 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2] w-1/2'>
            <div className='flex items-center justify-between'>
                <p className='text-[#191c21] text-xs font-semibold'>Bank details/Bkash</p>
                <p className='text-[#191c21] text-xs font-normal'>ABCD BANK</p>
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-[#191c21] text-xs font-semibold'>IFS code</p>
                <p className='text-[#191c21] text-xs font-normal'>ABCD000XXXX</p>
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-[#191c21] text-xs font-semibold'>Swift code</p>
                <p className='text-[#191c21] text-xs font-normal'>ABCDUSBBXXX</p>
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-[#191c21] text-xs font-semibold'>Account #</p>
                <p className='text-[#191c21] text-xs font-normal'>37474892300011</p>
            </div>
        </div>
    );
};

export default BankDetail;