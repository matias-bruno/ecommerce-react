import { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ItemList from '../components/ItemList/ItemList.jsx'
import Container from '../components/Container.jsx'
import ProductFilter from '../components/ProductFilter/ProductFilter.jsx';
import { useProducts } from '../context/ProductsContextUtils.jsx'
import { ITEMS_PER_PAGE } from '../constants/pagination.js'
import usePagination from '../hooks/usePagination.jsx'
import Pagination from '../components/Pagination/Pagination.jsx'
import useCategories from '../hooks/useCategories.jsx'
import Seo from '../components/Seo.jsx'
import seoData from '../data/seoData';

const ProductsPage = () => {
    const { products, loadingProducts, productsError } = useProducts();
    const { categorySlug } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { categories, loadingCategories } = useCategories();

    const categorySlugs = useMemo(() => categories.map((category) => category.slug), [categories]);
    const selectedCategory = categorySlug && categorySlugs.includes(categorySlug) ? categorySlug : 'all';
    const maxPrice = searchParams.get('maxPrice') ?? '';
    const sortOption = searchParams.get('sort') ?? 'default';
    const query = searchParams.get('query') ?? '';

    const normalizedQuery = query.trim().toLowerCase();

    const buildProductsPath = (nextCategory, nextMaxPrice, nextSort, nextQuery) => {
        const params = new URLSearchParams();

        if (nextMaxPrice !== '') {
            params.set('maxPrice', nextMaxPrice);
        }

        if (nextSort !== 'default') {
            params.set('sort', nextSort);
        }

        if (nextQuery !== '') {
            params.set('query', nextQuery);
        }

        const basePath = nextCategory === 'all' ? '/productos' : `/productos/${nextCategory}`;
        const queryString = params.toString();

        return queryString ? `${basePath}?${queryString}` : basePath;
    };

    const handleCategoryChange = (event) => {
        const nextCategory = event.target.value;
        navigate(buildProductsPath(nextCategory, maxPrice, sortOption, query));
    };

    const handleMaxPriceChange = (event) => {
        const nextMaxPrice = event.target.value;
        navigate(buildProductsPath(selectedCategory, nextMaxPrice, sortOption, query));
    };

    const handleSortChange = (event) => {
        const nextSortOption = event.target.value;
        navigate(buildProductsPath(selectedCategory, maxPrice, nextSortOption, query));
    };

    const handleClearFilters = () => {
        navigate('/productos');
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (normalizedQuery !== '') {
            result = result.filter((product) => product.name.toLowerCase().includes(normalizedQuery));
        }

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
    }, [products, normalizedQuery, selectedCategory, maxPrice, sortOption]);

    const mensaje = useMemo(() => {
        const parts = [];

        if (normalizedQuery !== '') {
            parts.push(`Resultados para: "${normalizedQuery}"`);
        }

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
    }, [normalizedQuery, selectedCategory, maxPrice, sortOption]);

    const { currentItems, currentPage, totalPages, goToPage, nextPage, prevPage } = usePagination({
        items: filteredProducts,
        itemsPerPage: ITEMS_PER_PAGE,
    });

    if (loadingProducts || loadingCategories) {
        return <p>Cargando productos y categorías, por favor espere...</p>;
    }

    if (productsError) {
        return <p>Error: {productsError}</p>;
    }

    return (
        <>
        <Seo {...seoData.products} />
        <Container>
            <ProductFilter
                categories={categories}
                selectedCategory={selectedCategory}
                maxPrice={maxPrice}
                sortOption={sortOption}
                onCategoryChange={handleCategoryChange}
                onMaxPriceChange={handleMaxPriceChange}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
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
        </>
    );
}

export default ProductsPage;