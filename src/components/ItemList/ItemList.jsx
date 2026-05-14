import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";
import styles from "./ItemList.module.css";

const ItemList = ({ productos }) => {
    return (
        <section>
            <ul className={styles.listaProductos}>
            {
                productos.map( producto => (
                    <TarjetaProducto 
                        key={producto.id}
                        id={producto.id}
                        nombre={producto.name}
                        precio={producto.price}
                        imagen={producto.imageUrl}
                    />
                ))
            }
            </ul>
        </section>
    )
};

export default ItemList;