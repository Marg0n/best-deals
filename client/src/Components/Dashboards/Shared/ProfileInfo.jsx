import { Dialog } from '@headlessui/react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { RxGear } from "react-icons/rx";
import useAuth from '../../../hooks/useAuth';
import useUserProfile from '../../../hooks/useUserProfile';
import { localDate } from '../../../utils/useBDdateTime';
import PopupProfileSettings from './PopupProfileSettings';

const ProfileInfo = () => {

    // user info
    const { user } = useAuth();
    const { profile } = useUserProfile();
    const formattedDate = localDate(user?.metadata.lastSignInTime)

    // headless UI open close state
    let [isOpen, setIsOpen] = useState(false)

    // date time converting to BD time
    const creationDate = localDate(profile[0]?.createdTime)
    const lastTimeLogin = localDate(profile[0]?.lastLogin)

    // avatar config
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));


    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex lg:flex-row flex-col gap-4 items-center justify-center text-base-300 relative" data-aos="fade-up" data-aos-duration="1000">

            {/* photo */}
            <div className='lg:w-1/3 text-center'>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    className='rounded-full ring-primary ring ring-offset-2'
                >
                    <Avatar
                        alt="Profile Image"
                        sx={{ width: 160, height: 160 }}
                        src={user?.photoURL}
                    />
                </StyledBadge>
            </div>

            {/* information */}
            <div className='lg:w-2/3 flex gap-4 items-center'>
                <div>
                    <h3>Name: </h3>
                    <p>Email: </p>
                    <p>Account Creation: </p>
                    <p>Last Login: </p>
                    <p>User Role: </p>
                </div>
                <div className='font-semibold'>
                    <h3>{user?.displayName}</h3>
                    <p>{user?.email}</p>
                    <p>{creationDate}</p>
                    <p>{formattedDate ? formattedDate : lastTimeLogin}</p>
                    <p
                        className={`${profile[0]?.role === 'Admin'
                            ? 'text-fuchsia-700'
                            : (profile[0]?.role === 'Vendor'
                                ? 'text-green-700'
                                : 'text-yellow-700')}`}>
                        {profile[0]?.role}
                    </p>

                </div>

            </div>

            <RxGear
                size={35}
                className='absolute top-6 left-6 cursor-pointer text-violet-600 hover:scale-110 hover:text-rose-400'
                onClick={() => setIsOpen(true)}
            />

            <Dialog open={isOpen} as='div' onClose={() => setIsOpen(false)} className="relative z-50 focus:outline-none ">
                <PopupProfileSettings setIsOpen={setIsOpen} />
            </Dialog>
        </div>
    );
};

export default ProfileInfo;