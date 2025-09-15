//Seleccionar el boton y el parrafo.
const Calcular = document.getElementById("Calcular");
const Resultado = document.getElementById("Resultado");

Calcular.addEventListener("click", () => {
    const anioNacimineto = prompt("ingresa tu año de nacimiento.");
    const anioActual = new Date().getFullYear();

    const edad = anioActual - anioNacimineto

    //Mostrar el resultado 

    Resultado.textContent = `Tienes aproximadamente ${edad} años`
})
