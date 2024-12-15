import PropTypes from 'prop-types';


const Slider = ({ image, text }) => {
    return (
        <div className=''>
            <img className=' ' src={image} />
        </div>
    );
};
Slider.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default Slider;