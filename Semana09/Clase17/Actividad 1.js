let contador = 0;

document.getElementById("btnSumar").addEventListener("click", () => {
  contador++;
  document.getElementById("valor").innerText = contador;
  document.getElementById("historial").innerHTML += `<li>Click #${contador}</li>`;
  // si hay un contador en el header, hay que actualizarlo AQUI TAMBIEN
});

document.getElementById("btnReiniciar").addEventListener("click", () => {
  contador = 0;
  document.getElementById("valor").innerText = contador;
  document.getElementById("historial").innerHTML = "";
  // si hay un contador en el header, hay que resetearlo AQUI TAMBIEN
});


//La variable contador en memoria (el "estado real")
//El innerText de #valor (la copia visual del contador)
//El innerHTML de #historial (borrar la lista completa, no solo el contador)
//Un posible contador duplicado en el header (el comentario del código ya advierte de esto)

//El estado visual queda inconsistente con el estado real — el contador dice 0 pero el historial "recuerda" clicks que ya no existen. 
// No hay ningún error en consola ni ninguna advertencia; simplemente el DOM y la variable se desincronizan silenciosamente.