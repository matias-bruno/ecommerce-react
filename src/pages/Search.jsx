import { useEffect } from 'react'
import ItemList from '../components/ItemList/ItemList.jsx'
import Container from '../components/Container.jsx'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext.jsx'
import { useSearch } from '../context/SearchContext.jsx'

const Search = () => {
    // Traemos todos los productos desde el contexto
    const { products } = useProducts();
    // Traemos la query de busqueda para filtrarlos
    const { query } = useSearch();
    // navigate nos permite redireccionar cuando sea necesario
    const navigate = useNavigate();

    // Si no tenemos query de busqueda o está vacía, redireccionamos
    useEffect(() => {
        if (!query || query.trim() === "")
            navigate('/')
    }, [query, navigate]);

    // Buscamos productos por nombres que incluyan la query
    const productsSearch = products ?
        products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())) : [];

    return (
        <Container>
            <ItemList productos={productsSearch} mensaje={"Resultados de la busqueda"} />
        </Container>
    );

}

export default Search;