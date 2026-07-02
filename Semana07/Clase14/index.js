/*const numeros = [40, 34, 5, 8, 100, 6];

console.log(numeros.sort((a, b) => a - b));
*/

/*let arr = ["a","b","c"];
arr[7] = "z";
arr.length;
*/

/*//Imperartivo
const dobleImp = [];
for (let i = 0; i < numeros.length; i++) {
    dobleImp.push(numeros[i] * 2);
}

//Declarativo
const dobleDec = numeros.map(n => n * 2);
*/

/*//Imperativo
const precios = [100, 250, 80, 400];
const caros = [];
for (let i = 0; i < numeros.length; i++) {
    if (precios[i] > 150)
caros.push(precios[i]);
}

//Declarativo
const precios = [100, 250, 80, 400];
const caros = precios.filter(precio => precio > 150);

console.log(caros);
*/

/*const estudiantes = [
    {nombre: "Ana", carnet: "2024001"},
    {nombre: "Luis", carnet: "2024002"}
];

const carnets = estudiantes.map(
    e => ${e.carnet}: ${e.nombre.toUpperCase()}
);

console.log(carnets);
*/

/*const estudiantes = [
    {nombre: "Ana", promedio: 85},
    {nombre: "Luis", promedio: 67},
    {nombre: "Sara", promedio: 91}
];

const promedios = estudiantes.filter(e => e.promedio >= 80);

console.log(promedios);*/

/*const soloPromedios = estudiantes
    .filter(e => e.promedio >= 80)
    .map(e => e.promedio);
// [85, 91]
console.log(soloPromedios);
*/