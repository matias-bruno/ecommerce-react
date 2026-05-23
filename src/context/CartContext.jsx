import { useState, useContext, createContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser utilizado dentro de un CartProvider');
    }
    return context;
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Agregamos siempre de a uno
    const addToCart = (product) => {
        // Ver si ya está el producto en el carrito
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            // Solo actualizamos la cantidad
            const updatedCart = cart.map(item =>
                item.id === product.id ?
                    { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCart(updatedCart);
        } else {
            // Lo agregamos al arreglo
            setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        }
    }

    const decreaseQuantity = (id) => {
        setCart(cart
            .map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0)
        );
    }

    const removeFromCart = (product) => {
        setCart(cart.filter(item => item.id !== product.id));
    }

    const clearCart = () => {
        setCart([]);
    }

    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc += item.quantity, 0);
    }

    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc += item.price * item.quantity, 0)
    }

    const isInCart = id => cart.some(item => item.id === id);

    return (
        <CartContext.Provider
            value={{ // Pasamos un objeto con todos los elementos
                cart,
                addToCart,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                getCartQuantity,
                getCartTotal,
                isInCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
