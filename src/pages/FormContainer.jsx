import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import FormProduct from '../components/FormProduct/FormProduct.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import useCategories from '../hooks/useCategories.jsx';

const FormContainer = ({ closeModal, productEditing = null }) => {
    const datosIniciales = {
        name: '',
        price: '',
        stock: '',
        description: '',
        categorySlug: '',
        imageUrl: ''
    };
    const [datosForm, setDatosForm] = useState(datosIniciales);
    const [imageFile, setImageFile] = useState(null);
    const { categories, loadingCategories } = useCategories();
    const [cargando, setCargando] = useState(false);
    const { createProduct, editProduct } = useProducts();

    const mode = productEditing ? "editing" : "adding";

    // esto sirve solo para el modo editar
    // Recibimos el producto desde la prop
    useEffect(() => {
        if (productEditing) {
            setDatosForm({
                name: productEditing.name,
                price: productEditing.price,
                stock: productEditing.stock,
                description: productEditing.description,
                categorySlug: productEditing.categorySlug,
                imageUrl: productEditing.imageUrl
            });
        }
    }, [productEditing]);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };
    const manejarCambioImagen = (evento) => {
        setImageFile(evento.target.files[0] || null);
    };

    // Para subir la imagen, nos da la url o null si falló
    const uploadImage = async (file) => {
        const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
            method: "POST",
            body: formData,
        });

        const json = await res.json();
        return json.success ? json.data.url : null;
    };
    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        setCargando(true);
        try {
            let finalImageUrl = datosForm.imageUrl;

            if (mode === "adding") {
                if (!imageFile) {
                    Swal.fire({
                        icon: "warning",
                        title: "Imagen requerida",
                        text: "Debes seleccionar una imagen antes de crear el producto.",
                        confirmButtonText: "Entendido",
                    });
                    setCargando(false);
                    return;
                }

                finalImageUrl = await uploadImage(imageFile);
                if (!finalImageUrl) throw new Error("Error al subir imagen");

                const completeProduct = {
                    ...datosForm,
                    imageUrl: finalImageUrl
                };

                await createProduct(completeProduct);
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Producto creado con éxito",
                    showConfirmButton: false,
                    timer: 3000
                });
            } else {
                if (imageFile) {
                    const newImageUrl = await uploadImage(imageFile);
                    if (!newImageUrl) throw new Error("Error al subir imagen");
                    finalImageUrl = newImageUrl;
                }

                const updatedProduct = {
                    ...datosForm,
                    imageUrl: finalImageUrl
                };

                await editProduct(productEditing.id, updatedProduct);
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Producto editado con éxito",
                    showConfirmButton: false,
                    timer: 3000
                });
            }

            closeModal();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: error.message
            });
        } finally {
            setCargando(false);
        }
    }
    return (
        <FormProduct
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            categories={categories}
            loadingCategories={loadingCategories}
            mode={mode}
            cargando={cargando}
        />
    );
}
export default FormContainer;