import styles from './FormularioProducto.module.css'

const FormularioProducto = ({datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, categorias, fileInputRef}) => {
    return (
        <form className={styles.formStyle} onSubmit={manejarEnvio}>
            <h3>Agregar Nuevo Producto</h3>
            <div className={styles.formGroup}>
                <label htmlFor="name">Nombre del producto:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={datosForm.name}
                    placeholder="Ej. Teclado Mecánico"
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="price">Precio:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={datosForm.price}
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
                <label htmlFor="categorySlug">Categoría:</label>
                <select
                    id="categorySlug"
                    name="categorySlug"
                    value={datosForm.categorySlug}
                    onChange={manejarCambio}
                    required
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.slug} value={categoria.slug}>
                            {categoria.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={datosForm.description}
                    placeholder="Ej. Teclado mecánico con switches azules"
                    rows={4}
                    maxLength={250}
                    onChange={manejarCambio}
                    required
                />
                <small>{datosForm.description.length}/250 caracteres</small>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="imageUrl">Imagen:</label>
                <input type="file" ref={fileInputRef} id="imageUrl" name="imageUrl" placeholder="https://..." onChange={manejarCambioImagen} />
            </div>
            <button className={styles.formButton} type="submit">Guardar Producto</button>
        </form>
    )
};

export default FormularioProducto;