import { useMemo, useState } from 'react';
import ItemList from '../components/ItemList/ItemList.jsx'
import Container from '../components/Container.jsx'
import ProductFilter from '../components/ProductFilter/ProductFilter.jsx';
import { useProducts } from '../context/ProductsContext.jsx'
import { ITEMS_PER_PAGE } from '../constants/pagination.js'
import usePagination from '../hooks/usePagination.jsx'
import Pagination from '../components/Pagination/Pagination.jsx'

const ProductsPage = () => {
    const { products, loadingProducts, productsError } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOption, setSortOption] = useState('default');

    const categories = useMemo(() => {
        return [...new Set(products.map((product) => product.categorySlug).filter(Boolean))].sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== 'all') {
            result = result.filter((product) => product.categorySlug === selectedCategory);
        }

        if (maxPrice !== '') {
            const maxPriceNumber = Number(maxPrice);
            if (!Number.isNaN(maxPriceNumber)) {
                result = result.filter((product) => Number(product.price) <= maxPriceNumber);
            }
        }

        switch (sortOption) {
            case 'price-asc':
                result.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case 'price-desc':
                result.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        return result;
    }, [products, selectedCategory, maxPrice, sortOption]);

    const mensaje = useMemo(() => {
        const parts = [];

        if (selectedCategory !== 'all') {
            parts.push(`Categoría: ${selectedCategory}`);
        }

        if (maxPrice !== '') {
            const maxPriceNumber = Number(maxPrice);
            if (!Number.isNaN(maxPriceNumber)) {
                parts.push(`Precio hasta $${maxPriceNumber}`);
            }
        }

        if (sortOption !== 'default') {
            const sortLabels = {
                'price-asc': 'Precio: menor a mayor',
                'price-desc': 'Precio: mayor a menor',
                'name-asc': 'Nombre: A-Z',
                'name-desc': 'Nombre: Z-A',
            };
            parts.push(`Ordenado: ${sortLabels[sortOption] || 'Personalizado'}`);
        }

        if (parts.length === 0) {
            return 'Todos los productos';
        }

        return `Productos filtrados (${parts.join(' • ')})`;
    }, [selectedCategory, maxPrice, sortOption]);

    const { currentItems, currentPage, totalPages, goToPage, nextPage, prevPage } = usePagination({
        items: filteredProducts,
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
            <ProductFilter
                categories={categories}
                selectedCategory={selectedCategory}
                maxPrice={maxPrice}
                sortOption={sortOption}
                onCategoryChange={(event) => setSelectedCategory(event.target.value)}
                onMaxPriceChange={(event) => setMaxPrice(event.target.value)}
                onSortChange={(event) => setSortOption(event.target.value)}
                onClearFilters={() => {
                    setSelectedCategory('all');
                    setMaxPrice('');
                    setSortOption('default');
                }}
            />

            <ItemList
                productos={currentItems}
                mensaje={mensaje}
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

export default ProductsPage;