import ProductCard from "../ProductCard/ProductCard";
import styles from "./ItemList.module.css";

const ItemList = ({ productos, mensaje }) => {
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