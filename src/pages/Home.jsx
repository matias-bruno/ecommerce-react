import Hero from '../components/Hero/Hero'
import ProductsPreview from '../components/ProductsPreview';

const Home = () => {
    return (
        <>
            <Hero />
            <ProductsPreview mensaje="Computadoras portátiles" categoria="laptops" cantidad={4} />
            <ProductsPreview mensaje="Celulares" categoria="smartphones" cantidad={4} />
        </>
        
    )
}

export default Home;