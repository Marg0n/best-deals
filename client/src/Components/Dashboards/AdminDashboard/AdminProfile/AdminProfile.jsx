import React from 'react';
import ProfileInfo from '../../Shared/ProfileInfo';
import { Helmet } from 'react-helmet-async';

const AdminProfile = () => {
    return (
        <div className="p-8 min-h-screen space-y-4">
             <Helmet>
                <title>Best Deal | Admin Profile</title>
            </Helmet>
            
            {/* profile info */}
            <ProfileInfo />
        </div>
    );
};

export default AdminProfile;