import ItemList from '../../components/ItemList/ItemList'
import Container from '../../components/Container'
import styles from './ItemListContainer.module.css'
import { useProducts } from '../../context/ProductsContext.jsx'

const ItemListContainer = ({ mensaje, categoria, cantidad }) => {
    const { products, loadingProducts, productsError } = useProducts();

    if (loadingProducts) {
        return <p>Cargando productos, por favor espere...</p>;
    }

    if (productsError) {
        return <p>Error: {productsError}</p>;
    }

    let productos = products;
    if (categoria) productos = productos.filter((p) => p.categorySlug === categoria);
    if (cantidad) productos = productos.slice(0, cantidad);

    return (
        <Container>
            <div className={styles.headerProductos}>
                <h2 className={styles.headerProductos__titulo}>{mensaje}</h2>
            </div>
            <ItemList productos={productos} />
        </Container>
    );
}

export default ItemListContainer;