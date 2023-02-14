document.addEventListener('DOMContentLoaded', function(){

    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    //asignar eventos
    inputEmail.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);

    function validar(e){
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            return;
        }

        limpiarAlerta(e.target.parentElement);
        
    }

    function mostrarAlerta(mensaje, referencia){
        //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
        //Genera alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
        //inyectar error al formulario
        referencia.appendChild(error);

    }

    function limpiarAlerta(referencia){
        console.log("desde limpiar alerta");
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }
});