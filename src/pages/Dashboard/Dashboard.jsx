import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

import Container from "../../components/Container";

const Dashboard = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "products");
            const resp = await getDocs(productosRef);

            setProductos(
                resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        fetchProductos();
    }, [productos]);
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar producto?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
        });
        if (result.isConfirmed) {
            const docRef = doc(db, "products", id);
            try {
                await deleteDoc(docRef);
                setProductos(productos.filter(prod => prod.id !== id));
                Swal.fire({
                    title: "Producto eliminado",
                    text: "El producto fue eliminado correctamente.",
                    icon: "success",
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
                        {productos.map((producto) => (
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