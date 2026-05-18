import {useState} from 'react';
import FormularioProducto from '../components/FormularioProducto/FormularioProducto';

const FormularioContainer = () => {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: ''
    });
    const [imagenFile, setImagenFile] = useState(null);
    const manejarCambio = (evento) => {
        const {name, value} = evento.target;
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
        if(!imagenFile) {
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

            if(datosImgBB.success) {
                console.log("Imagen subida con éxito. URL: ", datosImgBB.data.url);
                const productoCompleto = {
                    ...datosForm,
                    urlImagen: datosImgBB.data.url
                }
                console.log("Enviando los datos completos a la API: ", productoCompleto);
            }
        } catch (error) {
            console.error("Error en el proceso de envío: ", error);
            alert("Hubo un error al subir la imagen. Por favor, intenta de nuevo");
        }
    }
    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
        />
    );
}
export default FormularioContainer;