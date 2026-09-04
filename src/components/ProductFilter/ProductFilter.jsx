import { useState } from 'react';
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
    hasActiveFilters,
}) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className={styles.filtrosWrapper}>
            <div className={styles.filtrosActions}>
                <button
                    type="button"
                    className={styles.botonMostrar}
                    onClick={() => setShowFilters((isVisible) => !isVisible)}
                    aria-expanded={showFilters}
                    aria-controls="panel-filtros"
                >
                    {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
                </button>

                <button
                    type="button"
                    className={styles.botonLimpiar}
                    onClick={onClearFilters}
                    disabled={!hasActiveFilters}
                >
                    Limpiar filtros
                </button>
            </div>

            {showFilters && (
                <div id="panel-filtros" className={styles.filtrosPanel}>
                    <div className={styles.filtrosControls}>
                        <label className={styles.filtroGrupo}>
                            <span>Categoría</span>
                            <select value={selectedCategory} onChange={onCategoryChange}>
                                <option value="all">Todas</option>
                                {categories.map((category) => (
                                    <option key={category.slug} value={category.slug}>
                                        {category.name}
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
                </div>
            )}
        </div>
    );
};

export default ProductFilter;
