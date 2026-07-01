import { useCallback, useEffect, useMemo, useState } from 'react';

// Paginación para usar con el contexto de productos, sin hacer peticiones al backend

const usePagination = ({ items = [], itemsPerPage = 6, initialPage = 1 } = {}) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

    const currentItems = useMemo(() => {
        const startIndex = (safeCurrentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, safeCurrentPage, itemsPerPage]);

    const goToPage = useCallback((page) => {
        const nextPage = Math.min(Math.max(page, 1), totalPages);
        setCurrentPage(nextPage);
    }, [totalPages]);

    const resetPage = useCallback(() => {
        setCurrentPage(1);
    }, []);

    const nextPage = useCallback(() => goToPage(safeCurrentPage + 1), [goToPage, safeCurrentPage]);
    const prevPage = useCallback(() => goToPage(safeCurrentPage - 1), [goToPage, safeCurrentPage]);

    return {
        currentItems,
        currentPage: safeCurrentPage,
        totalPages,
        itemsPerPage,
        goToPage,
        resetPage,
        nextPage,
        prevPage,
    };
};

export default usePagination;
