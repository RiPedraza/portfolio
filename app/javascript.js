// IIFE (inmediately invoked function expression) expresión de función inmediatamente invocada:
//Esta funcion sirve para obtener la fecha
(function (){
    date = new Date();
    year = date.getFullYear();
    document.getElementById("current_date").innerHTML = year;
    document.getElementById("footer_date").innerHTML = year;
})();


/**********************botones en nav**************************************/
const btnRight = document.getElementById("iconDoubleRight");
const btnLeft = document.getElementById("iconDoubleLeft");
const btnPDF = document.getElementById("btnCrearPdf");
const btnQR = document.getElementById("btnLinkQR");

btnRight.addEventListener("click", ()=>{
    btnPDF.style.display = "block";
    btnQR.style.display = "block";
    btnLeft.style.display = "block";
    btnRight.style.display = "none";
});

btnLeft.addEventListener("click", ()=>{
    cerrar_btn();
});

function cerrar_btn(){
    btnPDF.style.display = "none";
    btnQR.style.display = "none";
    btnLeft.style.display = "none";
    btnRight.style.display = "block";
};

/**********************Mostrar QR**************************************/
const linkQR = document.getElementById("linkQR");

btnQR.addEventListener("click",()=>{
    if(linkQR.style.display == "block"){
        linkQR.style.display = "none";
    }else{
        linkQR.style.display = "block";
    }
});



/**********************Genrar PDF**************************************/
/*Creado por Parzibyte (https://parzibyte.me)*/

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnCrearPdf");
    $boton.addEventListener("click", () => {
        cerrar_btn(); //Ocultamos los botones del navegador
        const $elementoParaConvertir = document.body; // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0.3,
                filename: 'Portfolio_Pedraza_Ricardo_A4.pdf',
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
                },
                pagebreak: { 
                    mode: 'avoid-all', 
                    before: '#page2el' 
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});


/****** Ventana Modal: Section Skills******/
const ventanaModal = document.querySelector("#ventana-modal");
const cerrarModal = document.querySelector("#cerrar-modal");

cerrarModal.addEventListener("click",()=>{
    ventanaModal.close();
});

const clickCard = document.querySelector(".main__section__Skills__box");
clickCard.addEventListener("click",(e)=>{
    e.preventDefault();
    const targetClick = e.target;
    var targetElement = "";
        
    if(targetClick.classList[0] != 'main__section__Skills__box'){
    
        if(targetClick.classList[0] == 'card-skills'){
            targetElement = targetClick.classList[1];
        }else{
            targetElement = targetClick.parentNode.classList[1];
        }
        const cardSkills = document.getElementsByClassName(targetElement)[0];
        
        //obtenemos el SRC de la imagen como ruta relativa:
        const src = cardSkills.children[0].src; //recuperamos el src del elemento (target)
        const inicio = src.indexOf('/assets'); //indice inicio del corte
        const fin = src.length; //indice fin del corte
        let cadenaCortada = src.substring(inicio,fin); //cortamos la ruta deseada
        cadenaCortada = "." + cadenaCortada;  // agregamos el punto
        
        
        ventanaModal.showModal();   
        ventanaModal.children[0].innerHTML = cardSkills.children[1].innerHTML;
        ventanaModal.children[1].src = cadenaCortada;
        
        //Consumiendo datos Json. Guía: https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/JSON
        const requestURL = 'app/skillsDB.json';
        const request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            const dbJson = request.response;
            skills(dbJson);
        };

        function skills(dbJson){
            const nameSkill = targetElement;
            ventanaModal.children[2].innerHTML = dbJson[nameSkill][0]['nivel']+"<hr>";
            ventanaModal.children[3].textContent = dbJson[nameSkill][0]['detalle'];
            ventanaModal.children[4].textContent = dbJson[nameSkill][0]['seguimiento'];

        };

        ventanaModal.style.setProperty("max-width", "60ch");
    }
});



