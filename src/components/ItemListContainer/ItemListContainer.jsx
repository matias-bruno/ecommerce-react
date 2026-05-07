import ItemList from '../ItemList/ItemList'
import { useState, useEffect } from 'react'

const ItemListContainer = ({ mensaje }) => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        fetch('/data/productos.json')
            .then(respuesta => {
                return respuesta.json();
            })
            .then(datos => {
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
        <>
            <div className="header-productos">
                <h2 className="header-productos__titulo">{mensaje}</h2>
            </div>
            <ItemList productos={productos} />
        </>
    );
}

export default ItemListContainer;