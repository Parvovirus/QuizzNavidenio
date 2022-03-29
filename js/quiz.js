//! PAGINA DEL QUIZ

var invalid = []; // Recoge el array de respuestas invalidas
var valid = [];  // Recoge en un array todas las respuestas validas
var question = []; //Recoge en un array todas las preguntas
var respuestas = [];// Recoge los arrays de respuestas válidas e inválidas 
var j; // variable que evita que se repitan las respuestas al llamarlas
var ptos; //Puntos que se van acumulando 
var newFrase;//Variable con el texto corregido, sin signos &
var category;//Variable que guarda el número de categoría
var level;//Variable que guarda la dificultad
var mix;// mix = [categoria ,level]

function quiz() {
    // var music = new Audio('multiMedia/iniciotribal.mp3');
    // music.play();
    invalid = [];
    j = 1;
    ptos = 0;
    question = [];
    valid = [];
    //Saber que navegador estamos
    var es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (es_firefox) {
        var nomSesion = sessionStorage.key(1);
    } else {
        var nomSesion = sessionStorage.key(0);
    }


    if (document.getElementById("categorias") == null) {
        var category = mix[0];
        console.log(category);
        var level = mix[1];
    } else {
        var category = document.getElementById("categorias").options[document.getElementById("categorias").selectedIndex].id;
        var level = document.getElementById("dificultad").value;
    }

    mix = [category, level];
    console.log(mix);
    //Se elimina el div seccion
    document.querySelector('.seccion').remove();
    //Se modifica el icono perfil
    var icon = document.querySelector("#icons");
    icon.setAttribute("onclick", "inicio()");
    icon.setAttribute("title", "Inicio");
    icon.src = "multiMedia/home.png";
    // Se modifica el boton cerrar
    var close = document.querySelector("#cerrarS");

    close.setAttribute("value", `Cerrar sesión: ${nomSesion}`);
    close.setAttribute("onclick", "registroLogueo()");
    close.setAttribute("title", "Cerrar");


    // Todo esto es para hacer variables vacias donde se mete el fetch de las preguntas que están en un JSON
    // https://opentdb.com/api.php?amount=20&category=/selector/&difficulty=/SELECTOR/&type=multiple

    fetch(`https://opentdb.com/api.php?amount=20&category=${category}&difficulty=${level}&type=multiple`)

        .then(res => res.json())
        .then(data => {

            // Pillar las preguntas con map
            data.results.map(c => question.push(c.question));

            // Pillar las respuestas correctas con map
            data.results.map(b => valid.push(b.correct_answer));
            // console.log(valid);
            // Pillar array de las respuestas incorrectas con map
            data.results.map(a => invalid.push(a.incorrect_answers));


            //Aqui se mecla la magia y se hace un arrya con las respuestas
            for (i = 0; i < valid.length; i++) {
                invalid[i].splice(caos(0, 3), 0, valid[i]); //splice(posicion, insertar/modificar , texto)
            }

            //LA CAJA donde se mete la pregunta y respuestas
            var contInicio = document.createElement("div");
            contInicio.setAttribute("class", "seccion");
            contInicio.setAttribute("id", "quiz");
            insertCaja("#principal", contInicio);

            // La pregunta         

            insertCaja("#quiz", crearEtiqSin("p", changeWord(question[0])));
            var contP = document.getElementsByTagName("p")[0];
            contP.setAttribute("id", "pQuestion");

            // Los botones de la respesta CORRECTA
            var respuesta1 = document.createElement("input");
            respuesta1.setAttribute("class", "respuestas");
            respuesta1.setAttribute("id", "1");
            respuesta1.setAttribute("type", "button");
            //THiS.VALUE se lleva el valor de ese SITIO (txt de la pregunta)
            respuesta1.setAttribute("onclick", "fx(this.value)");
            respuesta1.setAttribute("value", changeWord(invalid[0][0]));
            // Meterlo en el DOM
            insertCaja("#quiz", respuesta1);


            // Los botones de laS respuestas INCORRECTAS
            var respuesta1 = document.createElement("input");
            respuesta1.setAttribute("class", "respuestas");
            respuesta1.setAttribute("id", "2");
            respuesta1.setAttribute("type", "button");
            respuesta1.setAttribute("onclick", "fx(this.value)");
            respuesta1.setAttribute("value", changeWord(invalid[0][1]));
            // Meterlo en el DOM
            insertCaja("#quiz", respuesta1);

            // Los botones de laS respuestas INCORRECTAS
            var respuesta1 = document.createElement("input");
            respuesta1.setAttribute("class", "respuestas");
            respuesta1.setAttribute("id", "3");
            respuesta1.setAttribute("type", "button");
            respuesta1.setAttribute("onclick", "fx(this.value)");
            respuesta1.setAttribute("value", changeWord(invalid[0][2]));
            // Meterlo en el DOM
            insertCaja("#quiz", respuesta1);

            // Los botones de laS respuestas INCORRECTAS
            var respuesta1 = document.createElement("input");
            respuesta1.setAttribute("class", "respuestas");
            respuesta1.setAttribute("id", "4");
            respuesta1.setAttribute("type", "button");
            respuesta1.setAttribute("onclick", "fx(this.value)");
            respuesta1.setAttribute("value", changeWord(invalid[0][3]));
            // Meterlo en el DOM
            insertCaja("#quiz", respuesta1);
        });
}

// generar números aleatorios con mínimo y máximo
function caos(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// FUNCION QUE CAMBIA Y AÑADE LAS RESPUESTAS CUANDO SE CLICKE LA PREGUNTA.

function fx(value) {

    console.log(value);

    // Condicion para comparar los resultados clickeados con las respuestas validas.

    if (value == valid[j - 1]) {
        ptos++;
        var musiCorrect = new Audio('multiMedia/correct.mp3');
        musiCorrect.play();
        console.log("acierto");
    } else {
        var musiWrong = new Audio('multiMedia/wrong.mp3');
        musiWrong.play();
    }

    if (j < question.length) {

        // VA MODIFICANDO LA PREGUNTA Y LAS RESPUESTAS

        //<P> ¿Que dia nacio Jesus? </P>  
        //seleccionaParrafo.innerText = question[1];  ->  question[1] = ¿Quien hizo la imprenta?
        //<P> ¿Que dia nacio Jesus? </P>  ------>     <P> ¿Quien hizo la imprenta? </P>  

        document.getElementsByTagName("p")[0].innerText = changeWord(question[j]);
        //Mismo proceso pero con input buttons se cambia con value.

        document.querySelectorAll(".respuestas")[0].value = changeWord(invalid[j][0]);
        document.querySelectorAll(".respuestas")[0].setAttribute("onclick", "fx(this.value)");

        document.querySelectorAll(".respuestas")[1].value = changeWord(invalid[j][1]);
        document.querySelectorAll(".respuestas")[1].setAttribute("onclick", "fx(this.value)");

        document.querySelectorAll(".respuestas")[2].value = changeWord(invalid[j][2]);
        document.querySelectorAll(".respuestas")[2].setAttribute("onclick", "fx(this.value)");

        document.querySelectorAll(".respuestas")[3].value = changeWord(invalid[j][3]);
        document.querySelectorAll(".respuestas")[3].setAttribute("onclick", "fx(this.value)");

        j++;
        console.log(j);
    } else {
        resultado();
    }
}


/*Cambia de formato todo aquello con &...; */
function changeWord(frase) {
    var comillasD = /&quote;/gi;
    var comillasS = /&quot;|&#039;|&ldquo;|&rsquo;/gi;
    var aT = /&aacute;/gi;
    var eT = /&eacute;/gi;
    var iT = /&iacute;/gi;
    var oT = /&oacute;/gi;
    var uT = /&uacute;/gi;
    var AT = /&Aacute;/gi;
    var ET = /&Eacute;/gi;
    var IT = /&Iacute;/gi;
    var OT = /&Oacute;/gi;
    var UT = /&Uacute;/gi;
    var apostrofo = /&/gi;
    var amper = /'amp;/gi;

    var newFrase = frase.replace(comillasD, '"');
    var newFrase = newFrase.replace(comillasS, "'");
    var newFrase = newFrase.replace(aT, 'á');
    var newFrase = newFrase.replace(eT, 'é');
    var newFrase = newFrase.replace(iT, 'í');
    var newFrase = newFrase.replace(oT, 'ó');
    var newFrase = newFrase.replace(uT, 'ú');
    var newFrase = newFrase.replace(AT, 'Á');
    var newFrase = newFrase.replace(ET, 'É');
    var newFrase = newFrase.replace(IT, 'Í');
    var newFrase = newFrase.replace(OT, 'Ó');
    var newFrase = newFrase.replace(UT, 'Ú');    
    var newFrase = newFrase.replace(apostrofo, "´");
    var newFrase = newFrase.replace(amper, "&");

    return newFrase;
}
