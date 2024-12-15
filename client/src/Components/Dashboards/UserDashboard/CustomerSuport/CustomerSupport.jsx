import React from 'react';
import { Helmet } from 'react-helmet-async';
import Inbox from './../../../Inbox/Inbox';

const CustomerSupport = () => {
    return (
        <div className="p-8 min-h-screen space-y-4">
            <Helmet>
                <title>Best Deal | Customer Support & Inbox</title>
            </Helmet>

            <Inbox />

        </div>
    );
};

export default CustomerSupport;