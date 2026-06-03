import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import Container from '../Container'
import {useCart} from '../../context/CartContext'

const Header = () => {
    const { getCartQuantity } = useCart();  
    const totalItems = getCartQuantity();

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.headerContent}>
                    {/* Aquí adentro de este enlace puede ir una imagen con el logo de la tienda */}
                    {/* Por ahora lo dejamos que diga mi E-commerce */}
                    <Link className={styles.header__logo} to="/">Mi E-Commerce</Link>
                    <nav>
                        <ul className={styles.header__menu}>
                            {/* <li><Link className={styles.header__enlace} to="/login">Login</Link></li> */}
                            <li><Link className={styles.header__enlace} to="/">Inicio</Link></li>
                            <li><Link className={styles.header__enlace} to="/productos">Productos</Link></li>
                            <li>
                                <Link className={styles.header__enlace} to="/carrito">
                                    Carrito {totalItems > 0 && <span>{totalItems}</span>}
                                </Link>
                            </li>
                            <li><Link className={styles.header__enlace} to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}

export default Header;