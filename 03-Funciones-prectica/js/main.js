//Seleccionar los elementos
const pContar = document.getElementById("contador");
const btnIncrementar = document.getElementById("BtnIncrementar");
const btnresetiar = document.getElementById("BtnResetear");

//Inicializar el contador
let contador = 0;

//funcion para contar click

function incrementarContador(){
    contador++;

    pContar.textContent = contador
}

//Asignar la funcion al boton 

btnIncrementar.addEventListener("click", incrementarContador)
btnresetiar.addEventListener("click", () =>{
    contador = 0;
    pContar.textContent = contador
})
