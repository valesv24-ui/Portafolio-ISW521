console.log("Hola Valery");
console.log("Hola Salas");
//explicito
let nombre = "Valery";
//implicito
let apellido = "Salas";
//explicito
function suma(a, b) {
    return a + b;
}
//implicito
function sumaDos(a, b) {
    return a + b;
}
function saludar(nombre) {
    console.log(`Hola ${nombre}`);
}
import { Persona } from "./Persona.js";
const personaUno = new Persona("Valery", "Salas Vargas", 21);
console.log(personaUno.saludar());
//# sourceMappingURL=index.js.map