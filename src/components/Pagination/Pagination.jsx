import styles from './Pagination.module.css';

const Pagination = ({ currentItems, currentPage, totalPages, goToPage, nextPage, prevPage }) => {
    return (
        <>
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
        </>
    );
}

export default Pagination;