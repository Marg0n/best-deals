import { Navigate, useLocation } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import useAuth from './../hooks/useAuth';
import useUserProfile from './../hooks/useUserProfile';

const UserRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const { profile } = useUserProfile();
    const location = useLocation();
    // console.log(location)

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <ClimbingBoxLoader color="#36d7b7" />
        </div>;
    }

    if (!user && profile[0]?.role !== "User") {
        return <Navigate to='/login' state={location?.pathname || '/'} replace={true} />
    }

    return (
        <>
            {children}
        </>
    );
};

export default UserRoute;