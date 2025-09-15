//Elementos del DOM
const btnEvaluar = document.getElementById("btnEvaluar");
const inputNota = document.getElementById("nota");
const resultado = document.getElementById("resultado");

//funcion principal que se ejecuta al hacer click
function evaluarNota(){
    const nota = parseInt(inputNota.value);
    const calificacion = obtenerCalificacion(nota)
    resultado.textContent = `La calificación es: ${calificacion}`;

}

//funcion onbtener calificacion segun la nota

function obtenerCalificacion(nota){
    if(isNaN(nota) || nota < 0 || nota > 100){
        return "Nota invalida. Debe ser un numero entre 0 y 100"
    }
    if(nota >= 90) return "Exelente"
    if (nota >= 80 && nota <= 89) return "Muy Bueno"
    if(nota >= 70 && nota <= 79) return "Bueno"
    if(nota >= 60 && nota <= 69) return "Regular"
    return "Reprobado"
}

//Evaluar el boton 
btnEvaluar.addEventListener("click", evaluarNota);

inputNota.addEventListener("keydown", (e) =>{
    if(e.key == "Enter"){
        evaluarNota();
    }
})