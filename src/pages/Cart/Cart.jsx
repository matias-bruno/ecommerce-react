import Container from "../../components/Container";
import styles from './Cart.module.css';
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import Swal from "sweetalert2";
import Seo from '../../components/Seo';
import seoData from '../../data/seoData.js';
import { formatPrice } from '../../utils/formatPrice';

const Cart = () => {
    const { cart, addToCart, removeFromCart, clearCart, decreaseQuantity, getCartTotal } = useCart();
    const totalCart = getCartTotal();
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleClear = () => {
        clearCart();
    };

    const handlePurchase = async () => {
        if (cart.length === 0) return;
        if (!user) {
            const result = await Swal.fire({
                title: 'Debes iniciar sesión',
                text: 'Necesitas iniciar sesión para completar la compra.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--color-primary)',
                cancelButtonColor: 'var(--color-secondary)',
                confirmButtonText: 'Ir al login',
                cancelButtonText: 'Cancelar'
            });
            if (result.isConfirmed) {
                navigate('/login', { replace: true });
            }
            return;
        }
        const result = await Swal.fire({
            title: '¿Confirmar compra?',
            text: "¡El cargo se realizará en tu método de pago seleccionado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-primary)',
            cancelButtonColor: 'var(--color-secondary)',
            confirmButtonText: 'Comprar',
            cancelButtonText: 'Cancelar'
        });
        if (result.isConfirmed) {
            // Lógica de la compra pendiente
            Swal.fire(
                '¡Compra realizada!',
                'Tu pedido ha sido procesado con éxito. Revisa tu correo electrónico para el comprobante.',
                'success'
            )
            clearCart();
        }
    };

    const handleRemove = (item) => {
        removeFromCart(item);
    };

    // Si el carrito está vacío, mostramos un mensaje
    if (cart.length === 0) {
        return (
            <Container>
                <div className={styles.emptyState}>
                    <h2>Tu carrito está vacío</h2>
                    <p>Agregá productos para empezar a comprar</p>
                    <button
                        className={styles.carrito__boton + " " + styles.carrito__botonPrimario}
                        onClick={() => navigate("/productos")}
                    >
                        Ver productos
                    </button>
                </div>
            </Container>
        );
    }

    return (
        <>
        <Seo { ...seoData.cart } />
        <Container>
            <div className={styles.carrito__contenido}>
                <ul className={styles.carrito__items} id="carrito-items">
                    {
                        cart.map(item => (
                            <li key={item.id} className={styles.carrito__item}>
                                <img src={item.imageUrl} alt={item.name} className={styles.carrito__itemImagen} />
                                <div className={styles.carrito__itemInfo}>
                                    <p className="carrito__itemNombre">{item.name}</p>
                                    <p className="carrito__itemPrecio">{formatPrice(item.price)}</p>
                                    <div className={styles.carrito__itemCantidad}>
                                        <button onClick={() => decreaseQuantity(item.id)} className={styles.carrito__cantidadMenos}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => addToCart(item)} className={styles.carrito__cantidadMas}>+</button>
                                    </div>
                                </div>
                                <button onClick={() => handleRemove(item)} className={styles.carrito__itemEliminar}>
                                    Quitar
                                </button>
                            </li>
                        ))
                    }
                </ul>
                <div className={styles.carrito__resumen}>
                    <h2 className={styles.carrito__resumenTitulo}>Resumen</h2>
                    <p className={styles.carrito__resumenTotal}>Total: <span id="carritoTotal">{formatPrice(totalCart)}</span></p>
                    <button onClick={handleClear} className={styles.carrito__boton + " " + styles.carrito__botonSecundario}>Vaciar Carrito</button>
                    <button
                        onClick={handlePurchase}
                        className={styles.carrito__boton + " " + styles.carrito__botonPrimario}
                        disabled={cart.length === 0}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </Container>
        </>
    );
}

export default Cart;