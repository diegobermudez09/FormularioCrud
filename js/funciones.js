import Notificacion from './classes/Notificacion.js';
import AdminCitas from './classes/AdminCitas.js';
import { citaObj, editando } from "./variables.js";
import {
    formulario, formularioInput, pacienteInput, propietarioInput, telefonoInput, emailInput, fechaInput
    , sintomasInput
} from './selectores.js';

const citas = new AdminCitas();
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value; // Esto solo sirve si el objeto tiene el mismo name de los inputs
}

export function submitCita(e) {
    e.preventDefault();

    if (Object.values(citaObj).some(valor => valor.trim() === '')) { // Object.values(citaObj)> me da todos los valores del obj, parte derecha, some> revisa que incluya('')
        new Notificacion({ // const notificacion = new Notificacion> como no usare el const solo la instancio
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })

        return;
    }

    if (editando.value) {
        citas.editar({ ...citaObj });
        new Notificacion({ // const notificacion = new Notificacion> como no usare el const solo la instancio
            texto: 'Guardado Correctamente',
            tipo: 'exito'
        })
    } else {
        citas.agregar({ ...citaObj });
        new Notificacion({ // const notificacion = new Notificacion> como no usare el const solo la instancio
            texto: 'Paciente Registrado',
            tipo: 'exito'
        })
    }

    formulario.reset();
    reiniciarObjetoCita();
    formularioInput.value = 'Registrar Paciente';
    editando.value = false;

}


export function reiniciarObjetoCita() {
    // Reiniciar el objeto
    // citaObj.paciente = '';
    // citaObj.propietario = '';
    // citaObj.email = '';
    // citaObj.fecha = '';
    // citaObj.sintomas = '';
    Object.assign(citaObj, {
        id: generarId(),
        paciente: '',
        propietario: '',
        telefono: '',
        email: '',
        fecha: '',
        sintomas: ''
    })

}

export function generarId() {
    return Math.random().toString(36).substring(2) + Date.now(); // me crea un ID unico
}

export function cargarEdicion(cita) {
    Object.assign(citaObj, cita);

    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    telefonoInput.value = cita.telefono;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando.value = true;

    formularioInput.value = 'Guardar Cambios';

}