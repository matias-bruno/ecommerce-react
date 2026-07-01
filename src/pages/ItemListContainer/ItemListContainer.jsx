import ItemList from '../../components/ItemList/ItemList'
import Container from '../../components/Container'
import { useProducts } from '../../context/ProductsContext.jsx'
import { ITEMS_PER_PAGE } from '../../constants/pagination'
import usePagination from '../../hooks/usePagination'

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