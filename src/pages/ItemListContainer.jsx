import ItemList from '../components/ItemList/ItemList.jsx'
import Container from '../components/Container.jsx'
import { useProducts } from '../context/ProductsContext.jsx'
import { ITEMS_PER_PAGE } from '../constants/pagination.js'
import usePagination from '../hooks/usePagination.jsx'

const ItemListContainer = ({ mensaje }) => {
    const { products, loadingProducts, productsError } = useProducts();
    const { currentItems, currentPage, totalPages, goToPage, nextPage, prevPage } = usePagination({
        items: products,
        itemsPerPage: ITEMS_PER_PAGE,
    });

    if (loadingProducts) {
        return <p>Cargando productos, por favor espere...</p>;
    }

    if (productsError) {
        return <p>Error: {productsError}</p>;
    }

    return (
        <Container>
            <ItemList
                productos={currentItems}
                mensaje={mensaje}
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </Container>
    );
}

export default ItemListContainer;