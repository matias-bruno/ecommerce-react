import Hero from './Hero/Hero'
import ItemListContainer from './ItemListContainer/ItemListContainer';

const Home = () => {
    return (
        <>
            <Hero />
            <ItemListContainer mensaje="Computadores portatiles" categoria="laptops" cantidad={4} />
            <ItemListContainer mensaje="Celulares" categoria="smartphones" cantidad={4} />
        </>
        
    )
}

export default Home;