import ItemList from '../../components/ItemList/ItemList'
import Container from '../../components/Container'
import { useProducts } from '../../context/ProductsContext.jsx'

const ItemListContainer = ({ mensaje }) => {
    const { products, loadingProducts, productsError } = useProducts();

    if (loadingProducts) {
        return <p>Cargando productos, por favor espere...</p>;
    }

    if (productsError) {
        return <p>Error: {productsError}</p>;
    }

    return (
        <Container>
            <ItemList productos={products} mensaje={mensaje}/>
        </Container>
    );
}

export default ItemListContainer;