import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = ({ items = [], itemsPerPage = 6, initialPage = 1, pageParam = 'page' } = {}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

    const rawPage = Number(searchParams.get(pageParam));
    const safeCurrentPage = Number.isInteger(rawPage) && rawPage >= 1
        ? Math.min(rawPage, totalPages)
        : initialPage;

    useEffect(() => {
        if (!searchParams.has(pageParam)) {
            return;
        }

        const parsed = Number(searchParams.get(pageParam));

        if (!Number.isInteger(parsed) || parsed < 1 || parsed > totalPages) {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.delete(pageParam);
                return params;
            }, { replace: true });
        }
    }, [searchParams, totalPages, pageParam, setSearchParams]);

    const currentItems = useMemo(() => {
        const startIndex = (safeCurrentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, safeCurrentPage, itemsPerPage]);

    const goToPage = useCallback((page) => {
        const target = Math.min(Math.max(page, 1), totalPages);
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            if (target === initialPage) {
                params.delete(pageParam);
            } else {
                params.set(pageParam, String(target));
            }
            return params;
        });
    }, [totalPages, initialPage, pageParam, setSearchParams]);

    const resetPage = useCallback(() => goToPage(initialPage), [goToPage, initialPage]);

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
