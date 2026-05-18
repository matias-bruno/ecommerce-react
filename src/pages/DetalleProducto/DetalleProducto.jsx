import Container from "../../components/Container";
import styles from './DetalleProducto.module.css';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

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
                    <button id="agregar-carrito" className={styles.productoDetalle__boton}>Agregar al Carrito</button>
                </div>
            </div>
        </Container>
    );
}

export default DetalleProducto;