import styles from './FormularioProducto.module.css'

const FormularioProducto = ({datosForm, manejarCambio, manejarEnvio, manejarCambioImagen}) => {
    return (
        <form className={styles.formStyle} onSubmit={manejarEnvio}>
            <h3>Agregar Nuevo Producto</h3>
            <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre del producto:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={datosForm.nombre}
                    placeholder="Ej. Teclado Mecánico"
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="precio">Precio:</label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    value={datosForm.precio}
                    placeholder="Ej. 35"
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={datosForm.stock}
                    placeholder="Ej. 5"
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="imagen">Imagen:</label>
                <input type="file" id="imagen" name="imagen" placeholder="https://..." onChange={manejarCambioImagen} />
            </div>
            <button className={styles.formButton} type="submit">Guardar Producto</button>
        </form>
    )
};

export default FormularioProducto;