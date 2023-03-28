/*const inputNacimiento = document.querySelector("#birth")

inputNacimiento.addEventListener("blur", (evento)=>{

    validacionNacimiento(evento.target);
    //console.log(evento.target);

})*/

export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = " "
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio" 
    },
    email: {
        valueMissing: "Este campo no se puede dejar vacio",
        typeMissmatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no se puede dejar vacio",
        patterMissmatch: "Mínimo ocho y máximo 10 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
    },
    nacimiento: {
        valueMissing: "Este campo no se puede dejar vacio",
        customError: "tienes que ser mayor de edad"
    },
    numero: {
        valueMissing: "Este campo no se puede dejar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros"
    },

    direccion:{
        valueMissing: "este campo debe contener de 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing: "este campo debe contener de 4 a 40 caracteres"
    },
    estado:{
        valueMissing: "este campo debe contener de 2 a 40 caracteres"
    }
};

const tipoDeErrores = [
    "valueMissing",
    "typeMissmatch",
    "patternMismatch",
    "customError"
]

function mostrarMensajeDeError(tipoDeInput,  input){
    let mensaje ="";

    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput)
           console.log(mensajesDeError[tipoDeInput][error])
           mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;

}
    

const validadores = {
    nacimiento: (input) => validacionNacimiento(input),
};

function validacionNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "tienes que ser mayor de edad"
    };

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fechaCliente){
    const fechaActual = new Date();
    const difereciaFechas = new Date(
        fechaCliente.getUTCFullYear() +18 ,
        fechaCliente.getUTCMonth() ,
        fechaCliente.getUTCDate()
    );
    //console.log(fechaCliente, "*********",fechaActual, "//////////////////", difereciaFechas);
    return difereciaFechas <= fechaActual;
}

