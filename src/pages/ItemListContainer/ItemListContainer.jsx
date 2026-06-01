import ItemList from '../../components/ItemList/ItemList'
import { useState, useEffect } from 'react'
import Container from '../../components/Container'
import styles from './ItemListContainer.module.css'

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ItemListContainer = ({ mensaje, categoria, cantidad }) => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        const productosDB = collection(db, "products")
        getDocs(productosDB).then((resp) => {
            let datos = resp.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            });
            if (categoria)
                datos = datos.filter((p) => p.categorySlug === categoria);
            if (cantidad)
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
    // Todo: agregarle estilos cuando se muestra cargando o error
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