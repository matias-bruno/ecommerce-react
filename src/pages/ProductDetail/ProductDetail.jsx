import Container from "../../components/Container.jsx";
import styles from './ProductDetail.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from "../../context/CartContextUtils.jsx";
import { useProducts } from "../../context/ProductsContextUtils.jsx";
import Swal from "sweetalert2";
import Seo from "../../components/Seo.jsx";
import { formatPrice } from '../../utils/formatPrice';

const ProductDetail = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);
    const { addToCart, isInCart } = useCart();
    const { getProductById } = useProducts();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducto = async () => {
            setCargando(true);
            try {
                const productoCargado = await getProductById(id);
                setProducto(productoCargado);
            } catch (error) {
                console.error('¡Ups! Hubo un error:', error);
                setError(error.message || "Error al cargar el producto");
            } finally {
                setCargando(false);
            }
        };

        fetchProducto();
    }, [id, getProductById]);

    if (cargando) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!producto) {
        return <h2>Producto no encontrado</h2>;
    }

    const handleAddToCart = () => {
        addToCart(producto);

        // Mostramos un mensajito al usuario para mejorar la experiencia
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Producto agregado",
            showConfirmButton: false,
            timer: 3000
        });
    }

    return (
        <>
        <Seo
            title={`${producto.name} | TecnoStore`}
            description={producto.description}
        />
        <Container>
            <div className={styles.productoDetalle}>
                <div className={styles.productoDetalle__imagen}>
                    <img src={producto.imageUrl} alt={producto.name} />
                </div>
                <div className={styles.productoDetalle__info}>
                    <h1>{producto.name}</h1>
                    <p className={styles.productoDetalle__precio}>{formatPrice(producto.price)}</p>
                    <p className={styles.productoDetalle__descripcion}>{producto.description}</p>
                    {
                        isInCart(producto.id) ? (
                            <button onClick={() => navigate("/carrito")} className={styles.productoDetalle__boton}>
                                Ir al carrito
                            </button>
                        ) : (
                            <button onClick={handleAddToCart} className={styles.productoDetalle__boton}>
                                Agregar al carrito
                            </button>
                        )
                    }
                </div>
            </div>
        </Container>
        </>
    );
}

export default ProductDetail;