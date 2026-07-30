"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
class Persona {
    nombre;
    apellido;
    edad;
    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    saludar() {
        console.log(`Hola ${this.nombre} ${this.apellido}`);
    }
}
exports.Persona = Persona;
//# sourceMappingURL=Persona.js.map