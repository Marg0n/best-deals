import { DialogPanel } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TiArrowBack } from "react-icons/ti";
import { useLocation, useNavigate } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import Swal  from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { imageUpload } from '../../../utils/imageUpload';

const PopupProfileSettings = ({ setIsOpen }) => {

    // state variables
    const { user, loading, setLoading, updateUserProfile } = useAuth();
    const axiosCommon = useAxiosCommon()

    // custom loader for update
    const [customLoader, setCustomLoader] = useState(false);

    // preview image
    const [imagePreview, setImagePreview] = useState(null);


    // Navigation
    const navigate = useNavigate();
    const location = useLocation();
    const whereTo = location?.state || '/userDashboard';

    // react form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    // Submit button for updating
    const onSubmit = async (data, e) => {

        const { name } = data;
        const image = e.target.avatar.files[0]

        try {
            setLoading(true);

            // upload image and get image url        
            const image_url = await imageUpload(image);
            // console.log(image_url)

            const userInfo = { name, image_url };

            // update user data in mongo DB
            const { data: update } = await axiosCommon.put(`/update/${user?.email}`, userInfo)


            // Add or update other data except email and pass
            updateUserProfile(name, image_url)
                .then(() => {

                    setCustomLoader(true)

                    // mongoDB updates
                    if (update?.modifiedCount > 0) {
                        Swal.fire({
                            title: 'Successfully Updated!',
                            text: 'Updated the Profile Information! 🎉',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                    } else {
                        toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
                        // loader
                        setLoading(false)
                        navigate(whereTo)
                    }

                    // Profile updated!
                    toast.success("Profile Update successful!🎉", { autoClose: 3000, theme: "colored" })

                    // loader
                    setLoading(false)
                    setCustomLoader(false)
                    navigate(whereTo)

                }).catch((errors) => {

                    setCustomLoader(false)
                    setLoading(false)
                    // An error occurred
                    const errorMessage = errors.message.split(':')[1].split('(')[0].trim();

                    toast.error(errorMessage, { autoClose: 3000, theme: "colored" });
                    navigate('/registration');
                });

            // console.log(result)

        }
        catch (err) {
            console.log(err);
            toast.error(err.message);
            setLoading(false)
            setCustomLoader(false)
        }

    }

    // waiting time loader
    const [timeLoading, setTimeLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


    // loader
    if (loading || customLoader || timeLoading) {
        return <div className="flex justify-center items-center h-screen">
            <ClimbingBoxLoader color="#36d7b7" />
        </div>;
    }

    return (
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 glass">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 text-primary bg-cover bg-no-repeat bg-center relative">


                <h3 className='mt-3 text-2xl text-center underline underline-offset-8 '>
                    Update Your Profile Information!
                </h3>

                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute left-4 top-4 btn btn-outline btn-primary"
                >
                    <TiArrowBack size={20} />
                </button>

                <div className='flex w-full mx-auto overflow-hidden lg:max-w-4xl justify-center items-center my-4 p-2'>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* name */}
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium  '
                                htmlFor='name'
                            >
                                Username
                            </label>
                            <input
                                id='name'
                                autoComplete='name'
                                name='name'
                                defaultValue={user?.displayName}
                                className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='text'
                                {...register("name", { required: true })}
                            />
                            <div className="mt-1 animate-pulse">
                                {errors.name && <span className="text-red-500">Please fill up Name field</span>}
                            </div>
                        </div>

                        {/* photo */}
                        <div className='mt-4'>
                            <label htmlFor='image' className='block mb-2 text-sm  font-medium '>
                                Upload Avatar:
                            </label>

                            <div className="flex md:flex-row flex-col gap-8 justify-center items-center">
                                <div className='w-16 h-14'>
                                    {
                                        imagePreview ? (
                                            <div className='mb-4'>
                                                <img src={imagePreview} alt='Selected Avatar' className=' rounded-full ring ring-primary ring-offset-base-100 ring-offset-2' />
                                            </div>
                                        )
                                            : (
                                                <div className='mb-4'>
                                                    <img src={user?.photoURL} alt='Current Avatar' className=' rounded-full ring ring-primary ring-offset-base-100 ring-offset-2' />
                                                </div>
                                            )
                                    }
                                </div>

                                <input
                                    // required
                                    onChangeCapture={e => setImagePreview(URL.createObjectURL(e.target.files[0]))}
                                    className=' block w-full px-4 py-2 rounded-lg input  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 file-input-success border-none'
                                    type='file'
                                    id='avatar'
                                    name='avatar'
                                    accept='image/*'
                                    // defaultValue={user?.photoURL}
                                    {...register("avatar", { required: true })}
                                />
                            </div>

                            <div className="mt-1 animate-pulse">
                                {errors.avatar && <span className="text-red-500">Please upload an Avatar</span>}
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className='mt-6'>
                            <button
                                type='submit'
                                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                            >
                                Update
                            </button>
                        </div>

                    </form>



                </div>


            </DialogPanel>

        </div>
    );
};

export default PopupProfileSettings;