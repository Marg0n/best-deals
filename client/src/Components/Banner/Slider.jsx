import PropTypes from 'prop-types';


const Slider = ({ image, text }) => {
    return (
        <div className='w-full bg-center bg-cover rounded-2xl mx-auto'>
            <img className='mx-auto rounded-2xl max-h-[600px]' src={image} />
        </div>
    );
};
Slider.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default Slider;