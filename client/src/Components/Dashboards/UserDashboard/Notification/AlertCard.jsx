import { string } from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';

const AlertCard = ({ item }) => {

    console.log(item)
    const { paymentMethod, status } = item;

    return (
        <div className="card text-primary-content w-96">
            <div className="card-body gap-6">
                <h2 className="card-title flex-col">
                    <span>Payment Method:</span>
                    <span className='text-white'>{paymentMethod}</span>
                </h2>
                <p className='text-base flex flex-col justify-center items-center'>
                    <span>Present Status: </span>
                    <span className='text-white'>{status}</span>
                </p>
            </div>
        </div>
    );
};

AlertCard.propTypes = {
    item: PropTypes.object,
}

export default AlertCard;