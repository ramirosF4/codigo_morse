import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/main.css';
import Swal from 'sweetalert2';
const codigoMorse = {
    A: '._',
    B: '_...',
    C: '_._.',
    D: '_..',
    E: '._',
    F: '.._.',
    G: '__.',
    H: '....',
    I: '..',
    J: '.___',
    K: '_._',
    L: '._..',
    M: '__',
    N: '_.',
    O: '___',
    P: '.__.',
    Q: '__._',
    R: '._.',
    S: '...',
    T: '_',
    U: '.._',
    V: '..._',
    W: '.__',
    X: '_.._',
    Y: '_.__',
    Z: '__..',
    0: '_____',
    1: '.____',
    2: '..___',
    3: '...__',
    4: '...._',
    5: '.....',
    6: '_....',
    7: '__...',
    8: '___..',
    9: '____.'
};
const entrada = document.getElementById('entrada');
const resultado = document.getElementById('resultado');
const textoAMorse = document.getElementById('textoAMorse');
const morseATexto = document.getElementById('morseATexto');
const convertir = document.getElementById('convertir');
const limpiar = document.getElementById('limpiar');
const etiquetaEntrada = document.getElementById('etiquetaEntrada');

let tipoConversion = 'texto';

textoAMorse.addEventListener('click', () => {
    tipoConversion = 'texto';
    textoAMorse.className = 'btn btn-primary flex-fill active';
    morseATexto.className = 'btn btn-outline-primary flex-fill';
    etiquetaEntrada.textContent = 'Escribe el texto que deseas convertir:';
    entrada.placeholder = 'Ejemplo: HOLA MUNDO';
    entrada.value = '';
    resultado.value = '';
    mensaje.textContent = 'Modo seleccionado: texto a Morse.';
});

morseATexto.addEventListener('click', () => {
    tipoConversion = 'morse';
    morseATexto.className = 'btn btn-primary flex-fill active';
    textoAMorse.className = 'btn btn-outline-primary flex-fill';
    etiquetaEntrada.textContent = 'Escribe el código Morse:';
    entrada.placeholder = 'Ejemplo: .... --- .-.. .-';
    entrada.value = '';
    resultado.value = '';
    mensaje.textContent = 'Modo seleccionado: Morse a texto.';
});

entrada.addEventListener('input', () => {
    let texto = entrada.value;
    let caracteresPermitidos = '';
    caracteresPermitidos = tipoConversion === 'texto'? /^[a-zA-Z0-9 ]*$/ : /^[._ /]*$/;
    !caracteresPermitidos.test(texto) ? (entrada.value = texto.slice(0, -1), mensaje.textContent = 'Ingresaste un carácter no permitido.') : mensaje.textContent = '';
});
const convertirATextoMorse = (texto) => {
    let resultadoMorse = '';
    texto = texto.toUpperCase();
    for (let i = 0; i < texto.length; i++) {
        let letra = texto[i];
        if (letra === ' ') {
            resultadoMorse += '/ ';
        } else if (codigoMorse[letra]) {
            resultadoMorse += codigoMorse[letra] + ' ';
        }
    }
    return resultadoMorse.trim();
};
const convertirAMorseTexto = (morse) => {
    let textoResultado = '';
    let palabras = morse.split('/');
    for (let i = 0; i < palabras.length; i++) {
        let codigos = palabras[i].trim().split(' ');
        for (let j = 0; j < codigos.length; j++) {
            let codigo = codigos[j];
            if (codigo === '') {
                continue;
            }
            let encontrado = false;
            for (let letra in codigoMorse) {
                if (codigoMorse[letra] === codigo) {
                    textoResultado += letra;
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) {
                Swal.fire({ title:"Error", text:'El código Morse "' + codigo + '" no es válido.', confirmButtonText: 'Aceptar'});
            }
        }
        if (i < palabras.length - 1) {
            textoResultado += ' ';
        }
    }
    return textoResultado;
};
convertir.addEventListener('click', () => {
    let texto = entrada.value.trim();
    if (texto === '') {
        resultado.value = '';
        mensaje.textContent = 'Escribe algo antes de convertir.';
        return;
    }
    try {
        if (tipoConversion === 'texto') {
            resultado.value = convertirATextoMorse(texto);
        } else {
            resultado.value = convertirAMorseTexto(texto);
        }
        mensaje.textContent = 'Conversión realizada correctamente.';
    } catch (error) {
        resultado.value = '';
        mensaje.textContent = error.message;
    }
});
limpiar.addEventListener('click', () => {
    entrada.value = '';
    resultado.value = '';
    mensaje.textContent = '';
});