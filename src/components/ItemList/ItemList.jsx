import ProductCard from "../ProductCard/ProductCard";
import styles from "./ItemList.module.css";

const ItemList = ({ productos }) => {
    return (
        <section>
            <ul className={styles.listaProductos}>
            {
                productos.map( producto => (
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
        </section>
    )
};

export default ItemList;