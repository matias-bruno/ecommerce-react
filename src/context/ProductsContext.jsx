import { useState, useContext, createContext, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

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
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [productsError, setProductsError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
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
        };

        loadProducts();
    }, []);

    const getProductById = async (id) => {
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
    };

    const createProduct = async (newProduct) => {
        const productsCollection = collection(db, 'products');
        const docRef = await addDoc(productsCollection, newProduct);
        const createdProduct = { ...newProduct, id: docRef.id };
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
        return createdProduct;
    };

    const deleteProduct = async (id) => {
        const productRef = doc(db, 'products', id);
        await deleteDoc(productRef);
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    const editProduct = async (id, updatedProduct) => {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, updatedProduct);
        setProducts((prevProducts) => prevProducts.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product)));
    };

    return (
        <ProductsContext.Provider value={{
            products,
            loadingProducts,
            productsError,
            getProductById,
            createProduct,
            deleteProduct,
            editProduct
        }}>
            {children}
        </ProductsContext.Provider>
    );
};
