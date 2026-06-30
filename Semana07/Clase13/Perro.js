import {Animal} from './Animal.js';

export class Perro extends Animal {
    constructor(nombre, especie, raza, edad) {
        super(nombre, especie);
        this.raza = raza;
        this.edad = edad;
    }

    ladrar() {
        console.log(`El perro llamado ${this.nombre} está ladrando!`);
    }
    comer() {
        console.log(`El perro llamado ${this.nombre} está comiendo!`);
    }
}