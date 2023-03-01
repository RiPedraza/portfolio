// IIFE (inmediately invoked function expression) expresión de función inmediatamente invocada:
//Esta funcion sirve para obtener la fecha
(function (){
    date = new Date();
    year = date.getFullYear();
    document.getElementById("current_date").innerHTML = year;
    document.getElementById("footer_date").innerHTML = year;
})();


/**********************Genrar PDF**************************************/
/*Creado por Parzibyte (https://parzibyte.me)*/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnCrearPdf");
    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.body; // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0.2,
                filename: 'Portfolio_Pedraza_Ricardo.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: 'portrait' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});

