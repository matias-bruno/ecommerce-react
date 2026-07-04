import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, setDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';

export const useFavorites = (userId) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar favoritos
    useEffect(() => {
        if (!userId) return;

        const fetchFavorites = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users", userId, "favorites"));
                const favIds = querySnapshot.docs.map(doc => doc.id);
                setFavorites(favIds);
            } catch (error) {
                console.log("Error al cargar favoritos: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchFavorites();
    }, [userId]);

    // Agregar favorito (Optimista: actualiza la UI antes de la base de datos)
    const addFavorite = async (productId) => {
        if (favorites.includes(productId)) return;

        setFavorites(prev => [...prev, productId]);

        try {
            await setDoc(doc(db, 'users', userId, 'favorites', productId), {
                date: new Date().toISOString()
            });
        } catch (error) {
            // Si falla se revierte el cambio en la UI
            setFavorites(prev => prev.filter(id => id !== productId));
            console.error("Error al guardar en Firebase:", error);
        }

    }

    // Quitar favorito
    const removeFavorite = async (productId) => {
        if(!favorites.includes(productId)) return;

        setFavorites(prev => prev.filter(id => id !== productId));

        try {
            await deleteDoc(doc(db, 'users', userId, 'favorites', productId));
        } catch (error) {
            setFavorites(prev => [...prev, productId]);
            console.log("Error al eliminar en Firebase: ", error);
        }
    }

    const isFavorite = (productId) => favorites.includes(productId);

    return { favorites, loading, addFavorite, removeFavorite, isFavorite };
};
