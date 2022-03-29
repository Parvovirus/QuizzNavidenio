//! PAGINA DE RESULTADOS

var intentos = [];

function resultado() {
    var es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (es_firefox) {
        var userStorage = JSON.parse(localStorage.getItem(sessionStorage.key(1)));
    } else {
        var userStorage = JSON.parse(localStorage.getItem(sessionStorage.key(0)));
    }
    //ptos a la espera de pusherarlo en el array puntuaciones
    //sessionStorage.key(1) -> coke


    // Cogemos la ultima posicion puntuaciones[userStorage.puntuaciones.length-1] -> [0]
    var ulPto = userStorage.puntuaciones[userStorage.puntuaciones.length - 1];

    if (ptos > ulPto) {
        //Meter array demejor puntuacion
        userStorage.best = ptos;
    }
    //Meter los puntos del nuevo juego a su localstorage
    userStorage.puntuaciones.push(ptos);

    localStorage.setItem(userStorage.nombre, JSON.stringify(userStorage));


    document.querySelector('#quiz').remove();


    //LA CAJA donde se mete la pregunta y respuestas
    var contInicio = document.createElement("div");
    contInicio.setAttribute("class", "seccion");
    contInicio.setAttribute("id", "resultado");
    insertCaja("#principal", contInicio);

    // el botón donde te sale la puntuación y supuestamente tiene que devolver a la

    insertCaja("#resultado", crearEtiqSin("p", `Tu resultado es: ${ptos} / 20`));



    // botón para llevar a inicio y volver a jugar 
    insertCaja("#resultado", crearEtiqCon("input", "Volver a jugar", "volverInicio", "begin", "button", "Volver a jugar", "quiz()"));
    console.log(mix);
    // botón para llevar a la gráfica y verla 

    insertCaja("#resultado", crearEtiqCon("input", "Grafica", "grafica", "botonResul", "button", "Gráfica", "perfil()"));


    //Los sonidos según salga la puntuación
    var music = new Audio('multiMedia/sub.mp3');
    var music1 = new Audio('multiMedia/1a5.mp3');
    var music2 = new Audio('multiMedia/6a10.mp3');
    var music3 = new Audio('multiMedia/11a15.mp3');
    var music4 = new Audio('multiMedia/20.mp3');

    if (ptos == 0) { music.play(); }
    if (ptos > 0 && ptos < 6) { music1.play(); }
    if (ptos >= 6 && ptos <= 10) { music2.play(); }
    if (ptos >= 11 && ptos <= 19) { music3.play(); }
    if (ptos == 20) { music4.play(); }
}


