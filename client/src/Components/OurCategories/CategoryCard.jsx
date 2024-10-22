

const CategoryCard = ({ category, image }) => {
    return (
        <div>

            <div className="card bg-base-100 rounded-2xl image-full w-44 h-44 shadow-xl  mx-auto">
                <figure>
                    <img
                        className="w-44 h-44"
                        src={image}
                        alt={category} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{category}</h2>
                </div>
            </div>

        </div>
    );
};

export default CategoryCard;