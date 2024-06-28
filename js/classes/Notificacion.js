import { formulario} from "../selectores.js";

// Classes
export default class Notificacion {
    constructor({ texto, tipo }) {
        this.texto = texto;
        this.tipo = tipo;

        this.mostrar(); // si lo coloco aqui, cada que lo instancie automaticamente llama ese metodo
    }

    mostrar() {
        // Crear la notificacion
        const alerta = document.createElement('div');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert',
            'uppercase', 'font-bold', 'text-sm');

        // Eliminar alertas duplicadas
        const alertaPrevia = document.querySelector('.alert');

        alertaPrevia?.remove(); // ¿> si existe ese elemento lo borra


        // Si es de tipo error agrega una clase
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

        // Mensaje de error
        alerta.textContent = this.texto;

        // Inserta en el DOM
        formulario.parentElement.insertBefore(alerta, formulario); // voy al padre del formulario con traversing y antes de formulario coloco el div de alerta

        // quitar despupes de 3s 
        setTimeout(() => {
            alerta.remove()
        }, 5000);
    }
}