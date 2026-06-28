import styles from './Header.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../Container'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import CartIcon from '../../assets/icons/CartIcon'
import HomeIcon from '../../assets/icons/HomeIcon'
import UserIcon from '../../assets/icons/UserIcon'
import DashboardIcon from '../../assets/icons/DashboardIcon'
import ProductsIcon from '../../assets/icons/ProductsIcon'
import LogoutIcon from '../../assets/icons/LogoutIcon'
import SearchBar from '../SearchBar/SearchBar'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();
    const { user, logout } = useAuth();


    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.headerContent}>
                    {/* Aquí adentro de este enlace puede ir una imagen con el logo de la tienda */}
                    {/* Por ahora lo dejamos que diga mi E-commerce */}
                    <Link className={styles.header__logo} to="/">Mi E-Commerce</Link>

                    <SearchBar />

                    <button
                        className={styles.menu__button}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-label="Abrir menú"
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>

                    <nav className={`${styles.navbar} ${menuOpen ? styles.active : ''}`}>
                        <ul className={styles.header__menu}>
                            <li>
                                <Link className={styles.header__enlace} to="/" onClick={() => setMenuOpen(false)}>
                                    <span className={styles.navIcon}><HomeIcon /></span>
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link className={styles.header__enlace} to="/productos" onClick={() => setMenuOpen(false)}>
                                    <span className={styles.navIcon}><ProductsIcon /></span>
                                    Productos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={styles.header__enlaceCarrito}
                                    to="/carrito"
                                    title="Carrito"
                                    aria-label="Ver carrito"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span className={styles.cartIcon}>
                                        <span className={styles.navIcon}><CartIcon /></span>
                                        {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                                    </span>
                                    Carrito
                                </Link>
                            </li>
                            {user ? (
                                <>
                                    {user.role === 'admin' && (
                                        <li>
                                            <Link to="/dashboard" className={styles.header__enlace} onClick={() => setMenuOpen(false)}>
                                                <span className={styles.navIcon}><DashboardIcon /></span>
                                                Gestion
                                            </Link>
                                        </li>)}
                                    <li>
                                        <button onClick={() => { logout(); setMenuOpen(false) }} className={styles.logout__button}>
                                            <span className={styles.navIcon}><LogoutIcon /></span>
                                            Salir
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login" className={styles.header__enlace} onClick={() => setMenuOpen(false)}>
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