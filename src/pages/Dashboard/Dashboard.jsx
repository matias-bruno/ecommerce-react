import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import styles from './Dashboard.module.css';
import Container from "../../components/Container";
import { useProducts } from '../../context/ProductsContext.jsx';
import { useState } from 'react';
import FormContainer from '../../components/FormContainer.jsx';
import usePagination from '../../hooks/usePagination.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Seo from '../../components/Seo.jsx';
import seoData from '../../data/seoData';

const Dashboard = () => {
    const navigate = useNavigate();
    const { products, loadingProducts, productsError, deleteProduct } = useProducts();
    const { currentItems, currentPage, totalPages, goToPage, nextPage, prevPage } = usePagination({
        items: products,
        itemsPerPage: 10,
    });

    // null cuando el modal está cerrado
    // false cuando el modal está abierto en modo agregar
    // true cuando el modal está abierto en modo editar
    const [productEditing, setProductEditing] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Métodos necesarios para el estado de los formularios
    const openAdd = () => {
        setProductEditing(null);
        setModalOpen(true);
    };

    const openEdit = (producto) => {
        setProductEditing(producto);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setProductEditing(null);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Confirma eliminar el producto?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "var(--color-danger)",
        });
        if (result.isConfirmed) {
            try {
                await deleteProduct(id);
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Producto eliminado",
                    showConfirmButton: false,
                    timer: 3000
                });
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo eliminar el producto.",
                    icon: "error",
                });
            }
        }
    }

    if (loadingProducts) {
        return <p>Cargando productos, por favor espere...</p>;
    }

    if (productsError) {
        return <p>Error: {productsError}</p>;
    }

    return (
        <>
        <Seo { ...seoData.admin }/>
        <Container>
            <div className={styles.productsHeader}>
                <h1>Lista de productos</h1>

                <button className={[styles.btn, styles.btnNuevo].join(' ')} onClick={openAdd}>
                    + Nuevo producto
                </button>
                {modalOpen && (
                    // Este podría ser un componente también
                    <div className={styles.overlay} onClick={closeModal}>
                        <div className={styles.modalHeader}>

                        </div>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <button
                                className={styles.btnClose}
                                onClick={closeModal}
                                aria-label="Cerrar modal"
                                type="button"
                            >
                                &times;
                            </button>
                            <FormContainer
                                closeModal={closeModal}
                                productEditing={productEditing}
                            />
                        </div>
                    </div>
                )}
            </div>



            <div className={styles.tableContainer}>
                <table className={styles.productsTable}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((producto) => (
                            <tr key={producto.id}>
                                <td>
                                    {producto.name.length > 30
                                        ? `${producto.name.slice(0, 30)}...`
                                        : producto.name}
                                </td>
                                <td><img src={producto.imageUrl} alt={producto.name} /></td>
                                <td className={styles.numeric}>${producto.price}</td>
                                <td className={styles.numeric}>{producto.stock}</td>
                                <td
                                    className={styles.truncate}
                                    title={producto.description}
                                >
                                    {producto.description}
                                </td>
                                <td>
                                    {producto.categorySlug}
                                </td>
                                <td>
                                    <button className={[styles.btn, styles.btnSecondary].join(' ')} onClick={() => openEdit(producto)}>
                                        Editar
                                    </button>
                                    <button className={[styles.btn, styles.btnDanger].join(' ')} onClick={() => handleDelete(producto.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination 
                currentItems={currentItems}
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

export default Dashboard;