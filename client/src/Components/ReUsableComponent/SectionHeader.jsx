
const SectionHeader = ({ title, description }) => {
    return (

        <div className="max-w-3/4 mx-auto mb-10">
            <h1 className="text-2xl md:text-3xl text-center dark:text-white lg:text-4xl">
                {title}
            </h1>
            <p className="text-center dark:text-white">{description}</p>
        </div>

    );
};

export default SectionHeader;