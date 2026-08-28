import styles from './ProductCard.module.css'
import sinImagen from '../../assets/img/sinImagen.png'
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContextUtils.jsx';
import { useFavorites } from '../../hooks/useFavorites';
import { formatPrice } from '../../utils/formatPrice';

const ProductCard = ({ id, nombre, precio, imagen }) => {
    const { user } = useAuth();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites(user?.uid);

    const toggleFavorite = () => {
        if (!isFavorite(id)) {
            addFavorite(id);
        } else {
            removeFavorite(id);
        }
    }

    return (
        <div className={styles.producto}>
            <img className={styles.producto__img} src={imagen ? imagen : sinImagen} />
            <p className={styles.producto__nombre}>
                {nombre}
            </p>
            <p className={styles.producto__precio}>
                {formatPrice(precio)}
            </p>
            <Link to={`/producto/${id}`} className={styles.producto__enlace}>Ver Producto</Link>

            {
                user &&
                <FavoriteButton
                    isFavorite={isFavorite(id)}
                    onToggle={toggleFavorite}
                />
            }
        </div>
    );
}

export default ProductCard;