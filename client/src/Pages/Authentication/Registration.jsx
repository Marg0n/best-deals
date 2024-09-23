import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { RxEyeClosed } from "react-icons/rx";
import { TfiEye } from "react-icons/tfi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bgImg from '../../assets/register.png';
import useAuth from "../../hooks/useAuth";
import { ClimbingBoxLoader } from "react-spinners";
import logo from '/rmv_bg_logo1.png';
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { imageUpload } from "../../utils/imageUpload";


const Registration = () => {

  const { createUser, user, updateUserProfile, loggedOut, googleLogin } = useAuth();

  // import custom axios functions
  const axiosCommon = useAxiosCommon();

  // custom loader for registration
  const [customLoader, setCustomLoader] = useState(false);

  // password show
  const [passShow, setPassShow] = useState('');

  // Navigation
  const navigate = useNavigate();
  const whereTo = '/login';

  // react form
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data, e) => {

    const image = e.target.avatar.files[0]

    // upload image and get image url
    const photo = await imageUpload(image);

    // creation date
    const createdTime = new Date();

    // role
    const role = 'User';

    // fetch data from the form
    const { email, password, name } = data;


    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}|\\;:'",.<>/?~])(?=.{6,})/.test(password)) {

      // console.log(watch('password'))
      return toast.error(
        `Password must contain 
        an Uppercase, 
        a Lowercase, 
        a numeric character, 
        a special character 
        and Length must be at least 6 characters long!`,
        { autoClose: 4000, theme: "colored" })
    }

    const userInfo = { email, password, name, photo, createdTime, role  };

    // insert user data in mongo DB
    await axiosCommon.post('/users', userInfo)

    // create user profile and update user
    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {

            setCustomLoader(true)
            // Profile updated!
            toast.success("Registration successful!🎉", { autoClose: 3000, theme: "colored" })
            toast.info("Try to Login! 😁", { autoClose: 5000, theme: "colored" })

            // loader
            setCustomLoader(false)
            loggedOut();
            navigate(whereTo, { replace: true })

          }).catch((errors) => {

            setCustomLoader(false)
            // An error occurred
            const errorMessage = errors.message.split(':')[1].split('(')[0].trim();

            toast.error(errorMessage, { autoClose: 3000, theme: "colored" });
            navigate('/registration');
          });

        // console.log(result)

      })
      .catch(errors => {

        setCustomLoader(false)
        // An error occurred                
        const errorCode = errors.code;
        // Remove 'auth/' prefix and '-' characters
        const cleanedErrorCode = errorCode.replace(/^auth\/|-/g, ' ');
        const words = cleanedErrorCode.split('-');
        const capitalizedWords = words.map(word => word.charAt(1).toUpperCase() + word.slice(2));
        const message = capitalizedWords.join(' ');

        toast.error(`${message}`, { autoClose: 5000, theme: "colored" })
        navigate('/registration');
      })
  }

  // Navigation handler for all social platform
  const handleSocialLogin = socialLoginProvider => {
    socialLoginProvider()
      .then(result => {
        if (result.user) {
          toast.success("Logged in successful!🎉", { autoClose: 2000, theme: "colored" })
          navigate(whereTo)
        }
      })
      .catch(error => {
        const errorCode = error.code;
        // Remove 'auth/' prefix and '-' characters
        const cleanedErrorCode = errorCode.replace(/^auth\/|-/g, ' ');
        const words = cleanedErrorCode.split('-');
        const capitalizedWords = words.map(word => word.charAt(1).toUpperCase() + word.slice(2));
        const message = capitalizedWords.join(' ');

        toast.error(`${message}`, { autoClose: 5000, theme: "colored" })
        navigate('/login')
      })
  }

  // waiting time loader
  const [timeLoading, setTimeLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Custom loader
  if (customLoader || timeLoading) {
    return <div className="flex justify-center items-center h-screen">
      <ClimbingBoxLoader color="#36d7b7" />
    </div>;
  }

  if (user && location?.pathname == '/login' && location?.state == null) {
    return <Navigate to='/' state={location?.pathname || '/'} />
  }


  return (
    <div className='flex justify-center h-screen items-center min-h-[calc(100vh-370px)] '>
      <Helmet>
        <title>Best Deal | Registration</title>
      </Helmet>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl '>
        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
          <div className='flex justify-center mx-auto'>
            <img
              className='w-auto h-12 rounded'
              src={logo}
              alt=''
            />
          </div>

          <p className='mt-3 text-xl text-center text-gray-600 '>
            Get Your Free Account Now!
          </p>

          <div
            onClick={() => handleSocialLogin(googleLogin)}
            className='flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:scale-105 hover:bg-[#0cc0df] overflow-hidden '>
            <div className='px-4 py-2'>
              <FcGoogle size='30' />
            </div>

            <span className='w-5/6 px-4 py-3 font-bold text-center'>
              Log in with Google
            </span>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>

            <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
              or Registration with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* username */}
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='name'
              >
                Username
              </label>
              <input
                id='name'
                autoComplete='name'
                name='name'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='text'
                {...register("name", { required: true })}
              />
              <div className="mt-1 animate-pulse">
                {errors.name && <span className="text-red-500">Please fill up Name field</span>}
              </div>
            </div>

            {/* email */}
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
                {...register("email", { required: true })}
              />
              <div className="mt-1 animate-pulse">
                {errors.email && <span className="text-red-500">Please fill up Email field</span>}
              </div>
            </div>

            {/* password */}
            <div className='mt-4 relative'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                id='loggingPassword'
                autoComplete='current-password'
                name='password'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type={passShow ? "text" : "password"}
                {...register("password", { required: true })}
              />
              <span
                onClick={() => setPassShow(!passShow)}
                className="cursor-pointer absolute top-10 right-4 text-black"
              >
                {
                  passShow ? <TfiEye /> : <RxEyeClosed />
                }
              </span>
              <div className="mt-1 animate-pulse">
                {errors.password && <span className="text-red-500">Please fill up Password field</span>}
              </div>
            </div>

            {/* photo */}
            <div className='mt-4'>
              <label htmlFor='image' className='block mb-2 text-sm  font-medium '>
                Upload Avatar:
              </label>

              <input
                // required
                className=' block w-full px-4 py-2 rounded-lg input  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 file-input-success border-none'
                type='file'
                id='avatar'
                name='avatar'
                accept='image/*'
                {...register("avatar", { required: true })}
              />
              <div className="mt-1 animate-pulse">
                {errors.avatar && <span className="text-red-500">Please upload an Avatar</span>}
              </div>
            </div>

            {/* submit */}
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
              >
                Register
              </button>
            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>

            <Link
              to='/login'
              className='text-xs text-rose-700 uppercase  hover:underline font-semibold animate-pulse'
            >
              Log In
            </Link>

            <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>
          </div>
        </div>
        <div
          className='hidden bg-cover bg-center lg:block lg:w-1/2'
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        ></div>
      </div>
    </div>
  )
}

export default Registration