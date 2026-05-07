import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";
import styles from "./ItemList.module.css";

const ItemList = ({ productos }) => {
    return (
        <section>
            <ul className={styles.listaProductos}>
            {
                productos.map( producto => (
                    <TarjetaProducto 
                        key={producto.id }
                        nombre={producto.nombre}
                        precio={producto.precio}
                        imagen={producto.imagen}
                    />
                ))
            }
            </ul>
        </section>
    )
};

export default ItemList;