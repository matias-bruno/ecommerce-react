import { useState, useContext, createContext, useCallback } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc } from 'firebase/firestore';

const ProductsContext = createContext();

export const useProductsContext = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProductsContext debe ser utilizado dentro de un ProductsProvider');
    }
    return context;
};

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [productsError, setProductsError] = useState(null);

    const loadProducts = useCallback(async () => {
        if (loadingProducts) return;
        setLoadingProducts(true);
        setProductsError(null);

        try {
            const productsRef = collection(db, 'products');
            const resp = await getDocs(productsRef);
            const datos = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProducts(datos);
        } catch (error) {
            console.error('Error al cargar productos:', error);
            setProductsError(error.message || 'No se pudieron cargar los productos.');
        } finally {
            setLoadingProducts(false);
        }
    }, [loadingProducts]);

    const getProductById = useCallback(async (id) => {
        const productoExistente = products.find((product) => product.id === id);
        if (productoExistente) {
            return productoExistente;
        }
        const productoRef = doc(db, 'products', id);
        const productoSnap = await getDoc(productoRef);
        if (productoSnap.exists()) {
            return { ...productoSnap.data(), id: productoSnap.id };
        }
        throw new Error('Producto no encontrado');
    }, [products]);

    const createProduct = async (newProduct) => {
        const productsCollection = collection(db, 'products');
        const docRef = await addDoc(productsCollection, newProduct);
        const productoCreado = { ...newProduct, id: docRef.id };
        setProducts((prevProducts) => [...prevProducts, productoCreado]);
        return productoCreado;
    };

    const deleteProduct = async (id) => {
        const productoRef = doc(db, 'products', id);
        await deleteDoc(productoRef);
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    return (
        <ProductsContext.Provider value={{
            products,
            loadingProducts,
            productsError,
            loadProducts,
            getProductById,
            createProduct,
            deleteProduct
        }}>
            {children}
        </ProductsContext.Provider>
    );
};
