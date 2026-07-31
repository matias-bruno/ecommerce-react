import styles from './ProductFilter.module.css';

const ProductFilter = ({
    categories,
    selectedCategory,
    maxPrice,
    sortOption,
    onCategoryChange,
    onMaxPriceChange,
    onSortChange,
    onClearFilters,
}) => {
    return (
        <div className={styles.filtrosPanel}>
            <div className={styles.filtrosControls}>
                <label className={styles.filtroGrupo}>
                    <span>Categoría</span>
                    <select value={selectedCategory} onChange={onCategoryChange}>
                        <option value="all">Todas</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </label>

                <label className={styles.filtroGrupo}>
                    <span>Precio máximo</span>
                    <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={onMaxPriceChange}
                        placeholder="Ej: 1000"
                    />
                </label>

                <label className={styles.filtroGrupo}>
                    <span>Ordenar por</span>
                    <select value={sortOption} onChange={onSortChange}>
                        <option value="default">Por defecto</option>
                        <option value="price-asc">Precio: menor a mayor</option>
                        <option value="price-desc">Precio: mayor a menor</option>
                        <option value="name-asc">Nombre: A-Z</option>
                        <option value="name-desc">Nombre: Z-A</option>
                    </select>
                </label>
            </div>

            <button type="button" className={styles.botonLimpiar} onClick={onClearFilters}>
                Limpiar filtros
            </button>
        </div>
    );
};

export default ProductFilter;
