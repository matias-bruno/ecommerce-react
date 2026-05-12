import ItemList from '../ItemList/ItemList'
import { useState, useEffect } from 'react'
import Container from '../Container'
import styles from './ItemListContainer.module.css'

const ItemListContainer = ({ mensaje, categoria, cantidad }) => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        fetch('/data/productos-tech.json')
            .then(respuesta => {
                return respuesta.json();
            })
            .then(datos => {
                if(categoria)
                    datos = datos.filter( (p) => p.categorySlug === categoria);
                if(cantidad)
                    datos = datos.slice(0, cantidad);
                setProductos(datos);
            })
            .catch(error => {
                console.error('¡Ups! Hubo un error:', error);
            })
            .finally(() => {
                setCargando(false);
            })
    }, []);

    if (cargando) {
        return <p>Cargando productos, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
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