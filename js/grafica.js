//! PAGINA DE LA GRAFICA

function perfil() {
    var es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (es_firefox) {
        var nomSesion = sessionStorage.key(1);
    } else {
        var nomSesion = sessionStorage.key(0);
    }
    document.querySelector(".seccion").remove();
    document.querySelector("#cerrarS").remove();

    var close = document.createElement("input");
    close.setAttribute("id", "cerrarS");
    close.setAttribute("type", "button");
    close.setAttribute("title", "Cerrar");
    close.setAttribute("value", `Cerrar sesión: ${nomSesion}`);
    close.setAttribute("onclick", "registroLogueo()");
    nav.appendChild(close);

    var icon = document.querySelector("#icons");
    icon.src = "multiMedia/home.png";
    icon.setAttribute("title", "Inicio");
    icon.setAttribute("onclick", "inicio()");

    var divPrincipal = document.querySelector("#principal");

    var divGraf = document.createElement("div");
    divGraf.setAttribute("class", "seccion");
    divGraf.setAttribute("id", "graficas")
    divPrincipal.appendChild(divGraf);


    var contEvo = document.createElement("div");
    contEvo.setAttribute("class", "ct-chart ct-major-twelft");
    contEvo.setAttribute("id", "evaluation");
    divGraf.appendChild(contEvo);

    var conP = document.createElement("p");
    var textNode = document.createTextNode("Evolución");
    conP.appendChild(textNode);
    contEvo.appendChild(conP);

    var contTop3 = document.createElement("div");
    contTop3.setAttribute("id", "top3");
    contTop3.setAttribute("class", "ct-chart2 ");
    divGraf.appendChild(contTop3);

    var conP2 = document.createElement("p");
    var textNode2 = document.createTextNode("Top 3");
    conP2.appendChild(textNode2);
    contTop3.appendChild(conP2);

    //Recoge la info del usuario sus puntaciones para ponerselas a su grafica
    var es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (es_firefox) {
        var userGraf = JSON.parse(localStorage.getItem(sessionStorage.key(1)));
    } else {
        var userGraf = JSON.parse(localStorage.getItem(sessionStorage.key(0)));
    }

    // Labels de intentos eje X
    var intentos = [];
    if (userGraf.puntuaciones.length > 1) {
        // shift quita el primer elemento. [0, 4 , 5]
        userGraf.puntuaciones.shift();
        for (l = 1; l <= userGraf.puntuaciones.length; l++) {
            intentos.push(l);
        }
    } else {
        intentos = ["No iniciado"];
    }

    //SAcamos la informacion de todos los usuarios
    var allUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
        allUsers.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    console.log(allUsers);

    //var records = [[nombre, puntuaciones],[...],[...]]
    var records = [];
    //var bestAll = [bestcoke, best lydia, ...]; 
    var bestAll = [];
    //var top = [best lydia, best coke, best sergio , best guillem ] ... los best ordenados > a <.
    var top = [];

    allUsers.map(usuario => {
        //Array con nombre y mejor puntuacion
        records.push([usuario.nombre, usuario.best]); // [ [sergio,12], [lydia,11], [guillem,16], [coke,16] ]
        //Array con mejores puntuaciones
        bestAll.push(usuario.best);  // [12,11,16,16]
    });
    //Ordena mayor a menor
    bestAll.sort((a, b) => b - a); // [16,16,12,11]

    //Recorre y busca la puntuacion con su nombre de usuario
    for (let j = 0; j < 3; j++) {
        //Busca en array nombre-best
        for (let i = 0; i < records.length; i++) {
            //Si es igual a la mejor puntuacion pushea su nombre.
            if (bestAll[j] == records[i][1]) {
                top.push(records[i][0]);
                // Borra en records dichos valores para no repetirlos.
                records.splice(i, 1);
            }
        }
    }
    var top3 = [];
    for (let k = 0; k < 3; k++) {
        top3.push(bestAll[k]);
    }
    console.log(top);


    // datos numericos -> useGraf.puntuaciones ->series
    // labels -> intentos


    new Chartist.Line('.ct-chart', {
        labels: intentos,
        series: [
            userGraf.puntuaciones
        ]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40
        }
    });



    //*SEGUNDA GRÁFICA
    new Chartist.Bar('.ct-chart2', {
        labels: top,
        series: top3
    }, {
        
        distributeSeries: true
    });

}
