console.log('Hello, World!');

if (true) {
    var edad = 25;
}

if (true) {
    let puntos = 100;
    console.log(puntos); // 100
}

const PI = 3.1416;
// PI = 3.14; // Error: Assignment to constant variable.

const user = { id:1};
user.id = 2;

const v8 = require('v8');

const miVariable = {
    nombre: "Jose",
    version:2026,
    apellido: "Ortiz"
};

const tamano = v8.serialize(miVariable).length;
console.log(`El tamaño de miVariable es: ${tamano} bytes`); //interpolacion de cadenas

const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

async function iniciar() {
    const nombre = await rl.question("Digite su nombre: ");
    if(validarDatos(nombre)) {
        console.log(`Hola, ${nombre}! Bienvenido a Node.js!`);
    } else {
        console.log("El nombre ingresado no es válido. Por favor, ingrese solo letras y espacios.");
    }
    rl.close();
}

function validarDatos(nombre) {
    const expresion = /^[a-zA-Z\s]+$/; 
    const nombreValido = expresion.test(nombre);
    if (nombreValido) {
        return true;
    } else {
        return false;
    }
}

iniciar();


// If/else-if/else

const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

async function iniciar() {
    const entrada = await rl.question("Digite su edad: ");
    const edad = parseInt(entrada);

    if (validarEdad(entrada)) {
        let resultado;

        if (edad >= 1 && edad <= 12) {
            resultado = "Niño";
        } else if (edad >= 13 && edad <= 17) {
            resultado = "Adolescente";
        } else if (edad >= 18 && edad <= 70) {
            resultado = "Adulto";
        } else {
            resultado = "Adulto Mayor o Fuera de rango";
        }

        console.log(`La categoría es: ${resultado}`);
    } else {
        console.log("La edad ingresada no es válida.");
    }
    rl.close();
}

function validarEdad(entrada) {
    return /^[0-9]+$/.test(entrada);
}

iniciar();

// Ternario

const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

async function iniciar() {
    const entrada = await rl.question("Digite su edad: ");
    const edad = parseInt(entrada);

    if (validarEdad(entrada)) {
        const esNino = (edad >= 1 && edad <= 12) ? "Niño" : "";
        const esAdolescente = (edad >= 13 && edad <= 17) ? "Adolescente" : "";
        const esAdulto = (edad >= 18 && edad <= 70) ? "Adulto" : "";

        const resultado = esNino || esAdolescente || esAdulto || "Adulto Mayor o Fuera de rango";

        console.log(`La categoría es: ${resultado}`);
    } else {
        console.log("La edad ingresada no es válida.");
    }
    rl.close();
}

function validarEdad(entrada) {
    return /^[0-9]+$/.test(entrada);
}

iniciar();

// Switch meses

const mes = "Diciembre";

switch (mes) {
    case "Enero":
        console.log("Inicio del año");
        break;
    case "Febrero":
        console.log("Mes del amor y la amistad");
        break;
    case "Marzo":
        console.log("Mes de la primavera");
        break;
    case "Abril":
        console.log("Mes de las flores");
        break;
    case "Mayo":
        console.log("Mes de los Santos");
        break;
    case "Junio":
        console.log("Mes del sol");
        break;
    case "Julio":
        console.log("Mes de las vacaciones");
        break;
    case "Agosto":
        console.log("Mes de la Virgen");
        break;
    case "Septiembre":
        console.log("Mes de la independencia");
        break;
    case "Octubre":
        console.log("Mes de Halloween");
        break;
    case "Noviembre":
        console.log("Mes de los muertos");
        break;
    case "Diciembre":
        console.log("Mes de la Navidad y mi cumple :D");
        break;
    default:
        console.log("Mes no reconocido");
}