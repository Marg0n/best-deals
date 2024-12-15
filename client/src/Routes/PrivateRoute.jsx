import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();
    // console.log(location, user)

    // waiting time loader
    const [timeLoading, setTimeLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading || timeLoading) {
        return <div className="flex justify-center items-center h-screen">
            <ClimbingBoxLoader color="#36d7b7" />
        </div>;
    }

    if (!user) {
        return <Navigate to='/login' state={location?.pathname || '/'} replace={true} />
    }

    return (
        <div>
            {children}
        </div>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
}

export default PrivateRoute;