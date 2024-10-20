import SectionHeader from "../ReUsableComponent/SectionHeader";
import CategoryCard from "./CategoryCard";

const OurCategories = () => {
    return (
        <div >
            <SectionHeader
                title={'Our Top Categories'}
                description={'Browse our categoies'}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 max-w-[1200px] mx-auto">
                <CategoryCard category={'Kitchen Appliances'} image={'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
                <CategoryCard category={'Home Appliances'} image={'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
                <CategoryCard category={'Technology'} image={'https://mediaemmovimento.com/wp-content/uploads/2021/02/03.02.2021_comunicar_tecnologia_mm_artigo_blog1-1.png'} />
            </div>
        </div>
    );
};

export default OurCategories;

