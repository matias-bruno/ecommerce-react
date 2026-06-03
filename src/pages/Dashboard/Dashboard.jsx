import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import styles from './Dashboard.module.css';
import Container from "../../components/Container";
import { useProductsContext } from '../../context/ProductsContext.jsx';

const Dashboard = () => {
    const navigate = useNavigate();
    const { products, loadingProducts, productsError, loadProducts, deleteProduct } = useProductsContext();

    useEffect(() => {
        if (products.length === 0 && !loadingProducts) {
            loadProducts();
        }
    }, [products.length, loadingProducts, loadProducts]);
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Confirma eliminar el producto?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
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
        <Container>
            <div className={styles.productsHeader}>
                <h1>Lista de productos</h1>

                <button className={[styles.btn, styles.btnNuevo].join(' ')} onClick={() => navigate('/alta')}>
                    + Nuevo producto
                </button>
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
                        {products.map((producto) => (
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
                                    <button className={[styles.btn, styles.btnDanger].join(' ')} onClick={() => handleDelete(producto.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
}

export default Dashboard;