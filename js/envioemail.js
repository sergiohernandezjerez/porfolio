document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const checkCC = document.querySelector('#checkCC');

    //asignar eventos
    inputEmail.addEventListener('input', validar);
    inputCC.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFormulario();
        limpiarAlerta(formulario);
        console.log(email);
        console.log(e.target);
    })
    checkCC.addEventListener('change', comprobarCheckCC);

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();
            
            //Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
            'fond-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctament';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        },3000);
    }

    function validar(e){
        if(e.target.value.trim() === '' && e.target.id !== 'cc'){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no és válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'cc' && !validarEmail(e.target.value) && e.target.value.trim() !== ''){
            mostrarAlerta('El email no és válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

    
        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //comprobar el objeto email
        comprobarEmail();
        
    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);
        //Genera alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
        //inyectar error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
         //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.removeAttribute('enabled');
            btnSubmit.setAttribute("disabled", "");
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.removeAttribute('disabled');
        btnSubmit.setAttribute("enabled", "");
        

    }

    function resetFormulario(){
        email.asunto = '';
        email.email = '';
        email.mensaje = '';
        inputCC.classList.add('hidden');
        formulario.reset();
        comprobarEmail();
    }

    function comprobarCheckCC(){
        if (this.checked) {
            inputCC.classList.remove('hidden');
        } else {
            inputCC.classList.add('hidden');
        }
    }
});