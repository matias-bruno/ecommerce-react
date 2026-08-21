import Hero from '../components/Hero/Hero'
import ProductsPreview from '../components/ProductsPreview';
import Seo from '../components/Seo';
import seoData from '../data/seoData';

const Home = () => {
    return (
        <>
            <Seo { ...seoData.home }/>
            <Hero />
            <ProductsPreview mensaje="Computadoras portátiles" categoria="laptops" cantidad={4} />
            <ProductsPreview mensaje="Celulares" categoria="smartphones" cantidad={4} />
        </>
        
    )
}

export default Home;