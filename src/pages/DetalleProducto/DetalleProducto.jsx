import Container from "../../components/Container";
import styles from './DetalleProducto.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { cart, addToCart, isInCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/data/productos-tech.json')
            .then(respuesta => {
                return respuesta.json();
            })
            .then(datos => {
                const productoEncontrado = datos.find((prod) => (prod.id == id))
                setProducto(productoEncontrado);
            })
            .catch(error => {
                console.error('¡Ups! Hubo un error:', error);
            })
            .finally(() => {
                setCargando(false);
            })
    }, [id]);

    if (!producto) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    if (!producto.id) {
        return <h2>Producto no encontrado.</h2>;
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
        <Container>
            <div className={styles.productoDetalle}>
                <div className={styles.productoDetalle__imagen}>
                    <img src={producto.imageUrl} alt={producto.name} />
                </div>
                <div className={styles.productoDetalle__info}>
                    <h1>{producto.name}</h1>
                    <p className={styles.productoDetalle__precio}>{producto.price}</p>
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
    );
}

export default DetalleProducto;