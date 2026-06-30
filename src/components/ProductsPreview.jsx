import ItemList from './ItemList/ItemList'
import Container from './Container'
import { useProducts } from '../context/ProductsContext.jsx'

const ProductsPreview = ({ mensaje, categoria, cantidad }) => {
    const { products, loadingProducts, productsError } = useProducts();

    if (loadingProducts) {
        return <p>Cargando productos, por favor espere...</p>;
    }

    if (productsError) {
        return <p>Error: {productsError}</p>;
    }

    let filteredProducts = products;
    if (categoria) filteredProducts = filteredProducts.filter((p) => p.categorySlug === categoria);
    if (cantidad) filteredProducts = filteredProducts.slice(0, cantidad);

    return (
        <Container>
            <ItemList productos={filteredProducts} mensaje={mensaje}/>
        </Container>
    );
}

export default ProductsPreview;