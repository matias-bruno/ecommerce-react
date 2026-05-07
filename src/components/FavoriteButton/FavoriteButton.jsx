
import styles from './FavoriteButton.module.css'

const FavoriteButton = ({isFavorite, onToggle}) => {
    
    return (
        <button
            onClick={onToggle}
            className={styles.button}
        >
            {isFavorite ? '❤️' : '🤍'}
        </button>
    );
}

export default FavoriteButton;