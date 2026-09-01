import { Link } from 'react-router-dom';
import Container from '../Container.jsx'
import { useProducts } from '../../context/ProductsContextUtils.jsx'
import useCategories from '../../hooks/useCategories.jsx'
import styles from './ProductsPreview.module.css'
import ProductCard from '../ProductCard/ProductCard.jsx'

const ProductsPreview = ({ mensaje, categoria, cantidad = 4 }) => {
    const { products, loadingProducts, productsError } = useProducts();
    const { categories, loadingCategories } = useCategories();

    if (loadingProducts || loadingCategories) {
        return <p>Cargando productos, por favor espere...</p>;
    }

    if (productsError) {
        return <p>Error: {productsError}</p>;
    }

    let filteredProducts = products;
    if (categoria) filteredProducts = filteredProducts.filter((p) => p.categorySlug === categoria);
    filteredProducts = filteredProducts.slice(0, cantidad);

    const categoryName = categories.find((item) => item.slug === categoria)?.name || categoria;

    return (
        <Container>
            <div className={styles.wrapper}>
                <div className={styles.headerProductos}>
                    <h2 className={styles.headerProductos__titulo}>{mensaje}</h2>
                </div>
                <ul className={styles.listaProductos}>
                    {
                        filteredProducts.map(producto => (
                            <li key={producto.id}>
                                <ProductCard
                                    id={producto.id}
                                    nombre={producto.name}
                                    precio={producto.price}
                                    imagen={producto.imageUrl}
                                />
                            </li>
                        ))
                    }
                </ul>
                {categoria && (
                    <div className={styles.linkWrapper}>
                        <Link to={`/productos/${categoria}`} className={styles.linkButton}>
                            Ver más
                        </Link>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default ProductsPreview;