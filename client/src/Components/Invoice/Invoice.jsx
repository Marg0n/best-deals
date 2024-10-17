import React, { useRef } from 'react';
import img from "../image/Best_Deal.png";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import useUserProfile from '../../hooks/useUserProfile';
import useAuth from '../../hooks/useAuth';

const Invoice = ({ closeModal, contactInfo, paymentInfo, handleClearCartList }) => {

    // profile information
    const { user } = useAuth()
    const { profile } = useUserProfile()

    // Destructuring information
    const { orderDate, items, totalAmount, status, paymentMethod, transactionId } = paymentInfo;
    const { uname, contact, address } = contactInfo;
    // console.log(paymentInfo)

    // Date information
    const dateObject = new Date(orderDate);

    // Extracting the date components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Months are zero-indexed
    const day = dateObject.getDate();

    const date = `${day} / ${month} / ${year}`;

    // reference for invoice
    const invoiceRef = useRef();

    // print
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

    // download into PDF
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
            {/* Invoice id and date */}
            <div className='px-4 py-3 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2] justify-between flex items-center'>
                <p className='text-[#191c21] text-xs font-semibold'>Invoice: <span className='text-[#5e6470] text-xs font-semibold'>{transactionId}</span></p>
                <p className='text-[#191c21] text-xs font-semibold'>Date: <span className='text-[#5e6470] text-xs font-semibold'>{date}</span></p>
            </div>

            {/* Receiver address */}
            <div className='flex items-center justify-between gap-2 my-3'>
                {/* sending address */}
                <div className='py-3 px-4 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2] w-1/2'>
                    <p className='text-[#191c21] text-xs font-semibold'>To</p>
                    <p className='text-[#5e6470] text-xs font-semibold'>{uname}</p>
                    <p className='text-[#5e6470] text-xs font-normal'>{address}</p>
                    <p className='text-[#5e6470] text-xs font-normal'>{contact}</p>
                </div>
                {/* payment info */}
                <div className='py-3 px-4 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2] w-1/2'>
                    <div className='flex items-center justify-between'>
                        <p className='text-[#191c21] text-xs font-semibold'>Payment Method</p>
                        <p className='text-[#191c21] text-xs font-normal'>{paymentMethod}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-[#191c21] text-xs font-semibold'>Payment status</p>
                        <p className='text-[#191c21] text-xs font-normal'>{status}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-[#191c21] text-xs font-semibold'>Card Type</p>
                        <p className='text-[#191c21] text-xs font-normal'>Visa</p>
                    </div>
                    {/* <div className='flex items-center justify-between'>
                        <p className='text-[#191c21] text-xs font-semibold'>Account #</p>
                        <p className='text-[#191c21] text-xs font-normal'>37474892300011</p>
                    </div> */}
                </div>
            </div>

            {/* Items */}
            <div className='px-4 py-3 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2]'>
                <div className='flex items-center justify-between'>
                    <div className='w-3/5'>
                        <p className='text-[#191c21] text-xs font-semibold'>Service</p>
                    </div>
                    <div className='w-2/5 flex items-center justify-between'>
                        <p className='text-[#191c21] text-xs font-semibold'>Qty</p>
                        <p className='text-[#191c21] text-xs font-semibold'>Rate</p>
                        <p className='text-[#191c21] text-xs font-semibold'>Total</p>
                    </div>
                </div>
                <hr className='border-b-2 border-black my-2' />
                {items[0]?.map((i, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <div className='w-3/5'>
                            <div>
                                <p className='text-[#191c21] text-xs font-semibold'>{i?.productName}</p>
                                <p className='text-[#5e6470] text-xs font-semibold'>{i?.description}</p>
                            </div>
                        </div>
                        <div className='w-2/5 flex items-center justify-between'>
                            <p className='text-[#5e6470] text-xs font-medium'>{i?.cartQuantity}</p>
                            <p className='text-[#5e6470] text-xs font-medium'>{i?.price}</p>
                            <p className='text-[#5e6470] text-xs font-medium'>{i?.cartQuantity * i?.price}</p>
                        </div>
                    </div>
                ))}
                <hr className='border-b-2 border-black my-1' />
                {/* net totals */}
                <div className='flex justify-end'>
                    <div className='w-2/5'>
                        <div className='flex items-center justify-between'>
                            <p className='text-[#191c21] text-xs font-medium'>Subtotal</p>
                            <p className='text-[#5e6470] text-xs font-medium'>{totalAmount}</p>
                        </div>
                        <hr className='border-b-2 border-white' />
                        <div className='flex items-center justify-between'>
                            <p className='text-[#191c21] text-xs font-medium'>Discount (0%)</p>
                            <p className='text-[#5e6470] text-xs font-medium'>$0.00</p>
                        </div>
                        <hr className='border-b-2 border-white' />
                        <div className='flex items-center justify-between'>
                            <p className='text-[#191c21] text-xs font-medium'>Total</p>
                            <p className='text-[#5e6470] text-xs font-medium'>{totalAmount}</p>
                        </div>
                        <hr className='border-b-2 border-white' />
                        <div className='flex items-center justify-between'>
                            <p className='text-[#191c21] text-xs font-medium'>Amount due</p>
                            <p className='text-[#5e6470] text-xs font-medium'>$00.00</p>
                        </div>
                        <hr className='border-b-2 border-white' />
                    </div>
                </div>
            </div>

            {/* profile user info */}
            <div className='px-4 py-3 bg-[#f2f4f7] rounded-[20px] border border-[#eaedf2] justify-between flex items-center mt-3'>
                {/* BestDeals Logo */}
                <img className='h-12' src={img} alt="Best Deal" />
                {/* profile user name */}
                <p className='text-[#191c21] text-xs font-semibold'>{user?.displayName}</p>
            </div>

            {/* buttons */}
            <div className='flex gap-2'>
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
                <button
                    onClick={handleClearCartList}
                    className="mt-4 btn px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
                >
                    Clear Cart
                </button>
            </div>

        </div>
    );
};

Invoice.propTypes = {
    paymentInfo: PropTypes.object,
    contactInfo: PropTypes.object,
    // CheckoutPrice: PropTypes.number,
    handleClearCartList: PropTypes.func,
    closeModal: PropTypes.func,
}

export default Invoice;
