import { useEffect } from 'react'
import ItemList from '../components/ItemList/ItemList.jsx'
import Container from '../components/Container.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext.jsx'
import { ITEMS_PER_PAGE } from '../constants/pagination.js'
import usePagination from '../hooks/usePagination.jsx'
import Pagination from '../components/Pagination/Pagination.jsx'

const Search = () => {
    const { products } = useProducts();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

    useEffect(() => {
        if (!query.trim()) {
            navigate('/', { replace: true });
        }
    }, [query, navigate]);

    const normalizedQuery = query.trim().toLowerCase();
    const productsSearch = products
        ? products.filter(product => product.name.toLowerCase().includes(normalizedQuery))
        : [];

    const { currentItems, currentPage, totalPages, goToPage, resetPage, nextPage, prevPage } = usePagination({
        items: productsSearch,
        itemsPerPage: ITEMS_PER_PAGE,
    });

    useEffect(() => {
        resetPage();
    }, [normalizedQuery, resetPage]);

    return (
        <Container>
            <ItemList
                productos={currentItems}
                mensaje={"Resultados de la busqueda"}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </Container>
    );

}

export default Search;