import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import Container from '../Container'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import CartIcon from '../../assets/icons/CartIcon'
import HomeIcon from '../../assets/icons/HomeIcon'
import UserIcon from '../../assets/icons/UserIcon'
import SearchBar from '../SearchBar/SearchBar'

const Header = () => {
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    const {user, logout} = useAuth();

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.headerContent}>
                    {/* Aquí adentro de este enlace puede ir una imagen con el logo de la tienda */}
                    {/* Por ahora lo dejamos que diga mi E-commerce */}
                    <Link className={styles.header__logo} to="/">Mi E-Commerce</Link>

                    <SearchBar />

                    <nav>
                        <ul className={styles.header__menu}>
                            {/* <li><Link className={styles.header__enlace} to="/login">Login</Link></li> */}
                            <li>
                                <Link className={styles.header__enlace} to="/">
                                    <span className={styles.navIcon}><HomeIcon /></span>
                                    Inicio
                                </Link>
                            </li>
                            <li><Link className={styles.header__enlace} to="/productos">Productos</Link></li>
                            <li>
                                <Link
                                    className={styles.header__enlaceCarrito}
                                    to="/carrito"
                                    title="Carrito"
                                    aria-label="Ver carrito"
                                >
                                    <CartIcon />
                                    <span className={styles.srOnly}>Carrito</span>
                                    {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                                </Link>
                            </li>
                            {user ? (
                                <>{/* Mostrar Gestion SOLO si el usuario es admin */}
                                    {user.role === 'admin' && (
                                        <li><Link to="/dashboard" className={styles.header__enlace}>Gestion</Link></li>)}
                                    {/* <li><Link to="/profile" className={styles.header__enlace}>Perfil</Link></li> */}
                                    <li><button onClick={logout} className={styles.header__button}>Cerrar Sesión</button></li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login" className={styles.header__enlace}>
                                        <span className={styles.navIcon}><UserIcon /></span>
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}

export default Header;