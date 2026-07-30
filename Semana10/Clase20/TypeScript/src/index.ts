console.log("Hola Valery");
console.log("Hola Salas");

//explicito
let nombre: string = "Valery";
//implicito
let apellido= "Salas";

//explicito
function suma(a:number, b:number): number {
    return a+b;
}

//implicito
function sumaDos(a:number, b:number) {
    return a+b;
}

function saludar(nombre: string): void {
    console.log(`Hola ${nombre}`);
}

import { Persona } from "./Persona.js";

const personaUno = new Persona ("Valery", "Salas Vargas", 21);

console.log(personaUno.saludar());