import React from 'react';
import { Helmet } from 'react-helmet-async';
import useUserProfile from '../../../../hooks/useUserProfile';
import AlertCard from './AlertCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import './styles.css';
// Import required modules
import { Autoplay, EffectCards, Mousewheel, Pagination, Navigation } from 'swiper/modules';

const UserAlert = () => {

    // User data
    const { profile } = useUserProfile();
    // console.log('buy', profile[0])

    return (
        <div className="p-8 min-h-screen space-y-4">
            <Helmet>
                <title>Best Deal | Notification & Alerts</title>
            </Helmet>

            <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-base-300 min-h-[90vh]">
                <Swiper
                    effect={'cards'}
                    direction={'horizontal'}
                    // direction={'vertical'}
                    grabCursor={true}
                    mousewheel={{ forceToAxis: true, invert: true }}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    // navigation={true}
                    rewind={true}
                    modules={[Autoplay, EffectCards, Mousewheel, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        profile[0]?.purchaseHistory?.map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <AlertCard
                                    item={item}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

        </div>
    );
};

export default UserAlert;