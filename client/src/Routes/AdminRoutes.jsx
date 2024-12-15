import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './../hooks/useAuth';
import useUserProfile from './../hooks/useUserProfile';
import { ClimbingBoxLoader } from 'react-spinners';

const AdminRoutes = ({ children }) => {

    const { user, loading } = useAuth();
    const { profile } = useUserProfile();
    const location = useLocation();
    // console.log(location)

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <ClimbingBoxLoader color="#36d7b7" />
        </div>;
    }

    if (!user && profile[0]?.role !== "Admin") {
        return <Navigate to='/login' state={location?.pathname || '/'} replace={true} />
    }

    return (
        <div>
            {children}
        </div>
    );
};

AdminRoutes.propTypes = {
    children: PropTypes.node,
}

export default AdminRoutes;