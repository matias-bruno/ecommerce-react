import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';

export default function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadCategories = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'categories'));
                if (isMounted) {
                    setCategories(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })));
                }
            } finally {
                if (isMounted) {
                    setLoadingCategories(false);
                }
            }
        };

        loadCategories();

        return () => {
            isMounted = false;
        };
    }, []);

    return { categories, loadingCategories };
}