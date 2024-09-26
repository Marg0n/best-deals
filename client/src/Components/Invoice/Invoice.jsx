import React, { useRef } from 'react';
import img from "../image/Best_Deal.png";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = ({ closeModal }) => {
    const invoiceRef = useRef();

    const handlePrint = () => {
        window.print(); 
    };

    const removeUnsupportedColors = (element) => {
        const elements = element.querySelectorAll('*');
        elements.forEach((el) => {
            const bgColor = window.getComputedStyle(el).backgroundColor;
            const textColor = window.getComputedStyle(el).color;

            // Check for unsupported "oklch" in both background and text color
            if (bgColor.includes('oklch')) {
                el.style.backgroundColor = 'rgb(255, 255, 255)'; // Set a fallback background color
            }
            if (textColor.includes('oklch')) {
                el.style.color = 'rgb(0, 0, 0)'; // Set a fallback text color
            }
        });
    };
    
    const downloadPDF = () => {
        const input = invoiceRef.current;
        
        // Remove unsupported color functions before capturing canvas
        removeUnsupportedColors(input);

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // portrait mode, mm units, and A4 size
    
            const imgWidth = 210; // A4 page width in mm
            const pageHeight = 297; // A4 page height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
    
            let heightLeft = imgHeight;
            let position = 0;
    
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
    
            // Create new pages as long as there is height left
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
    
            pdf.save('invoice.pdf'); // Save the PDF file
        });
    };
    
    

    return (
        <div ref={invoiceRef}>
            <div className='px-4 py-3 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2] justify-between flex items-center'>
                <p className='text-[#191c21] text-xs font-semibold'>Invoice <span className='text-[#5e6470] text-xs font-semibold'>#AB2324-01</span></p>
                <p className='text-[#191c21] text-xs font-semibold'>Date <span className='text-[#5e6470] text-xs font-semibold'>01 Aug, 2023</span></p>
            </div>
            <div className='flex items-center justify-between gap-2 my-3'>
                <div className='py-3 px-4 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2] w-1/2'>
                    <p className='text-[#191c21] text-xs font-semibold'>To</p>
                    <p className='text-[#5e6470] text-xs font-semibold'>Company Name</p>
                    <p className='text-[#5e6470] text-xs font-normal'>Company address</p>
                    <p className='text-[#5e6470] text-xs font-normal'>City, Country - 00000</p>
                    <p className='text-[#5e6470] text-xs font-normal'>+0 (000) 123-4567</p>
                </div>
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
            </div>
            <div className='px-4 py-3 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2]'>
                <div className='flex items-center justify-between'>
                    <div className='w-3/5'>
                        <p className='text-[#191c21] text-xs font-semibold'>Service</p>
                    </div>
                    <div className='w-2/5 flex items-center justify-between'>
                        <p className='text-[#191c21] text-xs font-semibold'>Qty</p>
                        <p className='text-[#191c21] text-xs font-semibold'>Rate</p>
                        <p className='text-[#191c21] text-xs font-semibold'>Line Total</p>
                    </div>
                </div>
                <hr className='border-b-2 border-white' />
                {Array(3).fill().map((_, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <div className='w-3/5'>
                            <div>
                                <p className='text-[#191c21] text-xs font-semibold'>Service name</p>
                                <p className='text-[#5e6470] text-xs font-semibold'>Description</p>
                            </div>
                        </div>
                        <div className='w-2/5 flex items-center justify-between'>
                            <p className='text-[#5e6470] text-xs font-medium'>2</p>
                            <p className='text-[#5e6470] text-xs font-medium'>$100.00</p>
                            <p className='text-[#5e6470] text-xs font-medium'>$200.00</p>
                        </div>
                    </div>
                ))}
                <hr className='border-b-2 border-white' />
                <div className='flex justify-end'>
                    <div className='w-2/5'>
                        <div className='flex items-center justify-between'>
                            <p className='text-[#191c21] text-xs font-medium'>Subtotal</p>
                            <p className='text-[#5e6470] text-xs font-medium'>$600.00</p>
                        </div>
                        <hr className='border-b-2 border-white' />
                        <div className='flex items-center justify-between'>
                            <p className='text-[#191c21] text-xs font-medium'>Discount (0%)</p>
                            <p className='text-[#5e6470] text-xs font-medium'>$0.00</p>
                        </div>
                        <hr className='border-b-2 border-white' />
                        <div className='flex items-center justify-between'>
                            <p className='text-[#191c21] text-xs font-medium'>Total</p>
                            <p className='text-[#5e6470] text-xs font-medium'>$600.00</p>
                        </div>
                        <hr className='border-b-2 border-white' />
                        <div className='flex items-center justify-between'>
                            <p className='text-[#191c21] text-xs font-medium'>Amount due</p>
                            <p className='text-[#5e6470] text-xs font-medium'>$600.00</p>
                        </div>
                        <hr className='border-b-2 border-white' />
                    </div>
                </div>
            </div>
            <div className='px-4 py-3 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2] justify-between flex items-center mt-3'>
                <img className='h-12' src={img} alt="Best Deal" />
                <p className='text-[#191c21] text-xs font-semibold'>Hello@gmail.com</p>
            </div>
            <button
                onClick={closeModal}
                className="mt-4 btn px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
            >
                Close
            </button>
            <button
                onClick={downloadPDF}
                className="mt-4 btn px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
            >
                Download PDF
            </button>
            <button
                onClick={handlePrint}
                className="mt-4 btn px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
            >
                Print
            </button>
        </div>
    );
};

export default Invoice;
