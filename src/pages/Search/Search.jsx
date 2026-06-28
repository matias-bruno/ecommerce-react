import { useEffect } from 'react'
import ItemList from '../../components/ItemList/ItemList'
import Container from '../../components/Container'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../context/ProductsContext.jsx'
import { useSearch } from '../../context/SearchContext.jsx'
import styles from './Search.module.css'

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
            {productsSearch.length > 0 ?
                (
                    <>
                        <div className={styles.headerProducts}>
                            <h2 className={styles.headerProducts__title}>{"Resultados de la busqueda"}</h2>
                        </div>
                        <ItemList productos={productsSearch} />
                    </>
                )
                :
                (
                    <p className={styles.noResults}>No hay productos que coincidan con la búsqueda.</p>
                )
            }
        </Container>
    );

}

export default Search;