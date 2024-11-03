import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProfileInfo from '../../Shared/ProfileInfo';

const VendorProfile = () => {
    return (
        <div className="p-8 min-h-screen space-y-4">
             <Helmet>
                <title>Best Deal | Vendor Profile</title>
            </Helmet>
            
            {/* profile info */}
            <ProfileInfo />
        </div>
    );
};

export default VendorProfile;