
import Asistente from './Asistente';

const Ejercicio1 = ({ asistentes } = props) => {


    return (
        <>
            {
                asistentes.map((asistente, index) => (
                    // Va entre parentesis sin return
                    // Va entre llaves con return
                    <Asistente
                        key={index}
                        nombre={asistente.nombre}
                        tarea={asistente.tarea}
                    />
                    // <Asistente key={index} ...asistente />
                ))
            }
        </>
    );
}

export default Ejercicio1;