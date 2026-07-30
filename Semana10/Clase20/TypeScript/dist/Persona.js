export class Persona {
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
//# sourceMappingURL=Persona.js.map