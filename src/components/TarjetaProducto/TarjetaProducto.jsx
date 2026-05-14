import styles from './TarjetaProducto.module.css'
import sinImagen from '../../assets/sinImagen.png'
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { useState } from 'react';
import {Link} from 'react-router-dom';

const TarjetaProducto = ({ id, nombre, precio, imagen }) => {

    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <li className={styles.item_producto}>
            <div className={styles.producto}>
                <img className={styles.producto_img} src={imagen ? imagen : sinImagen} />
                <p className={styles.producto__nombre}>
                    {nombre}
                </p>
                <p className={styles.producto__precio}>
                    ${precio}
                </p>
                <Link to={`/producto/${id}`} className={styles.producto__enlace}>Ver Producto</Link>
                <FavoriteButton
                    isFavorite={isFavorite}
                    onToggle={() => setIsFavorite(!isFavorite)}
                />
            </div>
        </li>
    );
}

export default TarjetaProducto;