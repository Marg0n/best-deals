import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import useUserProfile from './../hooks/useUserProfile';
import { ClimbingBoxLoader } from 'react-spinners';

const VendorRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const { profile } = useUserProfile();
    const location = useLocation();
    // console.log(location)

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <ClimbingBoxLoader color="#36d7b7" />
        </div>;
    }

    if (!user && profile[0]?.role !== "Vendor") {
        return <Navigate to='/login' state={location?.pathname || '/'} replace={true} />
    }

    return (
        <>
            {children}
        </>
    );
};

VendorRoute.propTypes = {
    children: PropTypes.node,
}

export default VendorRoute;