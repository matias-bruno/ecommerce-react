import { useEffect } from 'react'
import ItemList from '../components/ItemList/ItemList.jsx'
import Container from '../components/Container.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext.jsx'

const Search = () => {
    const { products } = useProducts();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

    useEffect(() => {
        if (!query.trim()) {
            navigate('/')
        }
    }, [query, navigate]);

    const normalizedQuery = query.trim().toLowerCase();
    const productsSearch = products
        ? products.filter(product => product.name.toLowerCase().includes(normalizedQuery))
        : [];

    return (
        <Container>
            <ItemList productos={productsSearch} mensaje={"Resultados de la busqueda"} />
        </Container>
    );

}

export default Search;