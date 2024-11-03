import React from 'react';
import ServiceCard from './ServiceCard';
import SectionHeader from '../ReUsableComponent/SectionHeader';
import { Link } from 'react-router-dom';

const Services = () => {
    return (

        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 my-10">
            <div>
                <ServiceCard
                    img={'https://i.ibb.co.com/Jk0LTrx/medal.png'}
                    title={'WARRANTY'}
                    text={'12-months warranty'} />
            </div>
            <div>
                <ServiceCard
                    img={'https://i.ibb.co.com/dr4gxcR/quality.png'}
                    title={'Certified'}
                    text={'Certified seller'} />
            </div>
            <div>
                <ServiceCard
                    img={'https://i.ibb.co.com/Pr81gpH/delivery-status.png'}
                    title={'Replacement'}
                    text={'7-Days Replacement'} />
            </div>
            <Link 
            to='/track-order'
            className=''
            >
                <div>
                    <ServiceCard
                        img={'https://i.ibb.co.com/NyRppNJ/track.png'}
                        title={'Track'}
                        text={'Track your order'} />
                </div>
            </Link>
            <Link to='/all'>
                <ServiceCard
                    img={'https://i.ibb.co.com/rcNNr81/measurement.png'}
                    title={'Range'}
                    text={'Vast Range of Products'} />
            </Link>
            <div>
                <ServiceCard
                    img={'https://i.ibb.co.com/zfW3kms/leaves.png'}
                    title={'Greener'}
                    text={'For a Greener Future'} />
            </div>


        </div>

    );
};

export default Services;