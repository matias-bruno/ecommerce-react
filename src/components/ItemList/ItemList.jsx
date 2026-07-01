import ProductCard from "../ProductCard/ProductCard";
import styles from "./ItemList.module.css";

const ItemList = ({ productos, mensaje, currentPage, totalPages, goToPage, nextPage, prevPage }) => {
    return (
        <section>
            {productos.length > 0 ?
                <div>
                    <div className={styles.headerProductos}>
                        <h2 className={styles.headerProductos__titulo}>{mensaje}</h2>
                    </div>
                    <ul className={styles.listaProductos}>
                        {
                            productos.map(producto => (
                                <li key={producto.id}>
                                    <ProductCard
                                        id={producto.id}
                                        nombre={producto.name}
                                        precio={producto.price}
                                        imagen={producto.imageUrl}
                                    />
                                </li>
                            ))
                        }
                    </ul>

                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button onClick={prevPage} disabled={currentPage === 1} className={styles.paginationButton}>
                                Anterior
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => goToPage(index + 1)}
                                    className={`${styles.paginationButton} ${currentPage === index + 1 ? styles.activePage : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button onClick={nextPage} disabled={currentPage === totalPages} className={styles.paginationButton}>
                                Siguiente
                            </button>
                        </div>
                    )}
                </div>
                :
                (
                    <p className={styles.noResults}>No hay productos para mostrar.</p>
                )
            }
        </section>
    )
};

export default ItemList;