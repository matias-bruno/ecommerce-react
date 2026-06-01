import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import Swal from "sweetalert2";
import FormularioProducto from '../components/FormularioProducto/FormularioProducto';

const FormularioContainer = () => {
    const datosIniciales = {
        name: '',
        price: '',
        stock: '',
        description: '',
        categorySlug: '',
        imageUrl: ''
    };
    const [datosForm, setDatosForm] = useState(datosIniciales);
    const [imagenFile, setImagenFile] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const fileInputRef = useRef(null);

    // Traemos las categorias disponibles
    useEffect(() => {
        const categoriasDB = collection(db, "categories")
        getDocs(categoriasDB).then((resp) => {
            let datos = resp.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            });
            setCategorias(datos);
        })
            .catch(error => {
                console.error('¡Ups! Hubo un error:', error);
            });
    }, [])

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };
    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };
    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
        const formData = new FormData();
        formData.append('image', imagenFile);

        try {
            console.log('Subiendo imagen a ImgBB...');
            const respuestaImgBB = await fetch(`http://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData
            });
            const datosImgBB = await respuestaImgBB.json();

            // Se guarda si la imagen se pudo subir
            if (datosImgBB.success) {
                console.log("Imagen subida con éxito. URL: ", datosImgBB.data.url);
                const productoCompleto = {
                    ...datosForm,
                    imageUrl: datosImgBB.data.url
                }
                console.log("Enviando los datos completos a la API: ", productoCompleto);

                // Aquí se guarda en Firestore
                const productsDB = collection(db, "products");
                const docRef = await addDoc(productsDB, productoCompleto);
                // Limpiar formulario
                limpiarFormulario();
                // Mostrar confirmación
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: `Producto creado con id: ${docRef.id}`,
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: error.message
            });
        }
    }
    const limpiarFormulario = () => {
        setDatosForm(datosIniciales);
        setImagenFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }
    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            categorias={categorias}
            fileInputRef={fileInputRef}
        />
    );
}
export default FormularioContainer;