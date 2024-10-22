import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '@uploadcare/react-uploader/core.css';
import uploadcare from 'uploadcare-widget';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Confetti from 'react-confetti';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const VendorRegistration = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [pdfUrl, setPdfUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);


    const { data: allUserForVendorRegistration = [], refetch } = useQuery({
        queryKey: ["allUserForVendorRegistration"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUsers`);
            return res.data;
        },
    });

    const filterUser = allUserForVendorRegistration?.find(userfil => userfil?.email == user?.email)
    const vendorStatus = filterUser?.vendorDocument?.vendorStatus
    console.log(filterUser);

    const onSubmit = async (data) => {
        const vendorDocument = {
            ...data,
            pdfUrl: pdfUrl,
            vendorStatus: { status: "Pending", reason: "" }
        };
        const vendorReg = { vendorDocument }

        console.log(vendorDocument);
        const userDoc = await axiosSecure.patch(`/allUsers/${filterUser._id}`, vendorReg)
        console.log(userDoc);
        reset();
        refetch();
    };

    const handleFileUpload = () => {
        setIsUploading(true);
        uploadcare.openDialog(null, {
            publicKey: 'd26d6b033ba38a449f00',
            tabs: 'file',
            multiple: false
        }).done((file) => {
            file.done((fileInfo) => {
                setPdfUrl(fileInfo.cdnUrl);
                setIsUploading(false);
                setIsUploaded(true)
            });
        }).fail(() => {
            setIsUploading(false);
            setIsUploaded(false);
        })
    };

    const mainDiv = <>
        <div className="w-3/4 my-4 mx-auto p-8 bg-white shadow-md rounded flex gap-16 justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-2xl font-bold mb-6">Vendor Registration</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline`}
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="companyName">
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="companyName"
                        {...register('companyName', { required: 'Company name is required' })}
                        className={`shadow appearance-none border ${errors.companyName ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline`}
                    />
                    {errors.companyName && <p className="text-red-500 text-xs italic">{errors.companyName.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="phoneNumber">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        {...register('phoneNumber', { required: 'Phone number is required', pattern: { value: /^[0-9]{11}$/, message: 'Phone number must be 11 digits' } })}
                        className={`shadow appearance-none border ${errors.phoneNumber ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline`}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">
                        Document
                    </label>
                    {
                        isUploaded ? <button
                            type="button"
                            className="bg-red-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleFileUpload}
                        > Change Pdf
                        </button> : <button
                            type="button"
                            className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleFileUpload}
                        >
                           <UploadFileIcon className='mr-1'/> {isUploading ? 'Uploading...' : 'Upload PDF'}
                        </button>
                    }

                    {isUploading && (
                        <div className="mt-2">
                            {/* You can replace this text with an actual loader/spinner */}
                            <p className="text-yellow-600 text-xs">Uploading file, please wait...</p>
                        </div>
                    )}
                    {pdfUrl && <p className="text-green-400 text-xs mt-2">File uploaded: {pdfUrl}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-cyan-700 hover:bg-gray-400 hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </button>
                </div>
            </form>
            <div>
                <div>
                <div className='my-2'>
                    You must have these documents provided in the pdf Attachment file :
                </div>
                <div>
                    <ul className='ml-4'>
                        <li>&#8226; Company Registration Certificate</li>
                        <li>&#8226; Bank Statement</li>
                        <li>&#8226; Business License</li>
                        <li>&#8226; Tax Identification Number (TIN)</li>
                        <li>&#8226; Proof of Business Insurance</li>
                    </ul>
                </div>
                </div>
                    <div><img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjdwbDUxajQ1cW05ZGMwcjFvcGRkc2ZidThlaHU2cHkzMWVlOXNnMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0Gqn9yuw8hnPGn5K/giphy.gif" className="w-[420px] h-[420px] text-center"></img></div><p></p>
            </div>
        </div>
    </>

    return (
        <div>
            {
                vendorStatus?.status == "Pending" ?
                    <div role="alert" className="alert alert-info my-20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-20 w-20 shrink-0 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className='text-[32px]'>Your registration for Vendor is still pending. Await for response from the Admin</span>

                    </div>
                    :
                    <div>
                        {
                            vendorStatus?.status == "Declined" ?
                                <div>
                                    <div className='w-3/4 my-3 mx-auto'>
                                        <div role="alert" className="alert alert-error">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 shrink-0 stroke-current"
                                                fill="none"
                                                viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{vendorStatus?.reason}</span>
                                        </div>
                                    </div>
                                    {mainDiv}
                                </div> :
                                <div>
                                    {
                                        vendorStatus?.status == "Approved" ?
                                            <div className='w-3/4 my-20 mx-auto'>
                                                <div role="alert" className="alert alert-success">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 shrink-0 stroke-current"
                                                        fill="none"
                                                        viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Congratulations! You have been approved as a vendor.</span>
                                                </div>
                                                <Confetti
                                                    width='1000px'
                                                    height='250px'
                                                    className='mx-auto my-20'
                                                />
                                                <div className='mt-5 text-center'>
                                                    <Link to='/vendorDashboard'><button className='btn hover:bg-gray-400 hover:text-black'>Check Out Your Dashboard</button></Link>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                {mainDiv}
                                            </div>
                                    }
                                </div>

                        }

                    </div>

            }
            <div className='my-4 mx-auto text-center'>

                <Link to='/'><button className='p-2 bg-orange-950 font-bold rounded-lg text-white hover:bg-gray-400 hover:text-orange-950'><KeyboardReturnIcon className='mr-2' />Return Home</button></Link>
            </div>
        </div>

    );
};

export default VendorRegistration;


// import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
// import '@uploadcare/react-uploader/core.css';

// function App() {
//   return (
//     <div>
//       <FileUploaderRegular
//          sourceList="local, url, camera, dropbox"
//          classNameUploader="uc-light"
//          pubkey="d26d6b033ba38a449f00"
//       />
//     </div>
//   );
// }

// export default App;