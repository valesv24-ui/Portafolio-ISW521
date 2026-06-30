/*
function exterior(){
    const mensaje = "Hola desde afuera";    
    function interior(){
        console.log(mensaje);
    }
    interior();

}
exterior();

*/
/* Clausura: Una clausura es una función que tiene acceso a las variables de su función externa, incluso después de que la función externa haya terminado de ejecutarse. Esto permite que la función interna "recuerde" el estado de las variables de la función externa.
function crearContador(){
    let cuenta = 0;
    return function(){
        cuenta++;
        return cuenta;
    };
}
 const contador = crearContador();
console.log(contador());
console.log(contador());
console.log(contador());
*/
/*
comporta miento del THIS

const equipo = {
    nombre: "Backend",
    avisar: function(){
        setTimeout(function(){
            console.log({this.nombre);
        }, 100);
    }
*/

/* Call Aply Bind 
function presentar(salud){
    console.log(`${salud}, soy ${this.nombre}`);
}
const persona1 = { nombre: "Carla" };

presentar.call(persona1, "Hola"); // Hola, soy Carla
presentar.apply(persona1, ["Buenas"]); // Hola, soy Carla

const presentarCarla = presentar.bind(persona1);
presentarCarla("Que tal"); // Que Tal, soy Carla
*/

/*const persona = {nombre: "Luis", edad: 30, rol: "dev"};
const {nombre, rol: puesto = "invitado"} = persona;

const colores = ["rojo", "verde", "azul"];
const [primero, , tercero] = colores;

console.log(nombre, puesto); // Luis dev
console.log(primero, tercero); // rojo azul
*/

/*const persona = {nombre: "pepe", edad: 50};
const {edad: anios = 21} = persona;
console.log(anios);
*/

/*function sumarTodo(...numeros){
    return numeros.reduce((acum, n) => acum + n, 0); 
} 

console.log(sumarTodo(1, 2, 3, 8, 13)); //6
console.log(sumarTodo(5, 10, 15, 20, 59, 89, 99)); //50
*/ 

/*const original = {nombre: "Equipo A", puntos: 10};
const actualizado = {...original, puntos: 15};

console.log(original.puntos); //10 (No cambio)
console.log(actualizado.puntos); //15

const numeros = [1, 2, 3];
const copia = [...numeros, 4]
*/

/*const descuento = 0;
console.log(descuento || 10); //10 (0 es falsy, se remplaza)
console.log(descuento ?? 10); //0 (0 no es nullish, se respeta)

const nombre = "";
console.log(nombre || "Invitado"); //"Invitado"
console.log(nombre ?? "Invitado"); // ""
*/

/*import {sumar, restar} from './operadores.js';

console.log(sumar(5, 5));
console.log(restar(9, 4));
*/

/*import { Perro }  from "./Perro.js";

const perroUno = new Perro("Firulais", "Mamifero", "Golden", 7);

console.log(perroUno.ladrar());
console.log(perroUno.comer());
*/

/*let a = {puntos: 10};
let b = a;
b.puntos = 99;

let c = {...a };
c.puntos = 1;

console.log(a.puntos, b.puntos, c.puntos);
*/

/*const animal = {
    comer() {
        console.log(`${this.nombre} está comiendo`);
    }
};

const perro = Object.create(animal);
perro.nombre = "Rocky";
perro.comer(); //delega hacia "animal"

console.log(perro.__proto__ === animal);
//true
*/

/*const base = {saludo: "Hola"};
const hijo = Object.create(base);

console.log(hijo.saludo);
hijo.saludo = "Pura Vida";
console.log(hijo.saludo);
console.log(base.saludo);
*/

/*function Persona(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
}

Persona.prototype.saludar = function() {
    console.log(`Hola, soy ${this.nombre}`);
};

const ana = new Persona (AnalyserNode, 25);
ana.saludar();
*/

/*function Curso(nombre) {
    this.nombre = nombre;
}

const prog = new Curso("Programacion Web");
console.log(prog.nombre);
*/

/*class CuentaBancaria {
    constructor(saldoInicial) {
        this._saldo = saldoInicial;
    }
    get saldo () {
        return this._saldo;
    }
    set saldo(valor) {
        if (valor < 0) throw new Error("Saldo no puede ser negativo");
        this._saldo = valor;
    }
}

const cuenta = new CuentaBancaria(1000);
cuenta.saldo = 1500;
console.log(cuenta.saldo); //1500
*/

