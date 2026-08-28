import styles from './Header.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../Container'
import { useCart } from '../../context/CartContextUtils.jsx'
import { useAuth } from '../../context/AuthContextUtils.jsx'
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

    const userActions = user ? (
        <button onClick={() => { logout(); setMenuOpen(false) }} className={styles.logout__button}>
            <span className={styles.navIcon}><LogoutIcon /></span>
            Salir
        </button>
    ) : (
        <Link to="/login" className={styles.header__enlace} onClick={() => setMenuOpen(false)}>
            <span className={styles.navIcon}><UserIcon /></span>
            Login
        </Link>
    );

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.headerContent}>
                    <Link className={styles.header__logo} to="/">TecnoStore</Link>

                    <div className={styles.header__search}>
                        <SearchBar />
                    </div>

                    <div className={styles.headerRight}>
                        <nav className={`${styles.navbar} ${menuOpen ? styles.active : ''}`}>
                            <div className={styles.header__searchDropdown}>
                                <SearchBar onSearch={() => setMenuOpen(false)} />
                            </div>
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
                                {user?.role === 'admin' && (
                                    <li>
                                        <Link to="/dashboard" className={styles.header__enlace} onClick={() => setMenuOpen(false)}>
                                            <span className={styles.navIcon}><DashboardIcon /></span>
                                            Gestion
                                        </Link>
                                    </li>
                                )}
                                <li className={styles.mobileOnly}>{userActions}</li>
                            </ul>
                        </nav>

                        <div className={styles.headerActions}>
                            <Link
                                className={styles.cartLink}
                                to="/carrito"
                                title="Carrito"
                                aria-label={totalItems > 0 ? `Ver carrito (${totalItems} productos)` : 'Ver carrito'}
                                onClick={() => setMenuOpen(false)}
                            >
                                <span className={styles.cartIcon}>
                                    <CartIcon />
                                    {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                                </span>
                            </Link>
                            <span className={styles.actionsUser}>{userActions}</span>
                        </div>

                        <button
                            className={styles.menu__button}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-expanded={menuOpen}
                            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        >
                            {menuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header;
