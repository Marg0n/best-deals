// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'animate.css';



// Import Swiper styles
import 'swiper/css'
// Import Swiper styles
import 'swiper/css';
import Slider from './Slider';

const Banner = () => {
    return (

        <div className=''>

            <div className="mx-auto">
                <Swiper className=' mx-auto z-10'
                    modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 6000 }}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                >
                    {/* slider 1 */}
                    <SwiperSlide >
                        <Slider  image={'https://i.ibb.co.com/njnsdch/Colorful-3-D-Gaming-Youtube-Banner.gif' }></Slider>
                    </SwiperSlide>

                    {/* slider 2 */}
                    <SwiperSlide >
                        <Slider  image={'https://i.ibb.co.com/qM6Mkhb/Green-and-Yellow-3-D-Illustrative-Digital-Marketing-Blog-Banner.gif'}></Slider>
                    </SwiperSlide>

                    {/* slider 3 */}
                    <SwiperSlide >
                        <Slider  image={'https://i.ibb.co.com/Ks6kJ1J/Green-and-Yellow-3-D-Illustrative-Digital-Marketing-Blog-Banner-1.gif' }></Slider>
                    </SwiperSlide>



                </Swiper>
            </div>
            {/* <div data-aos="fade-up">
                            <h2 className="text-[#B18B5E] font-bold text-6xl md:text-7xl lg:text-8xl  text-center mb-8 mt-10">100+</h2>
                            <h2 className="text-[#B18B5E] font-bold text-3xl md:text-5xl lg:pb-10 text-center">Stunning and impressive unique <br />Arts & Crafts</h2>
                        </div> */}
        </div>

    );
};

export default Banner;