//! PAGINA DEL HOME

// SI REFRESCA LA PAGINA Y ESTAS LOGUEADO GO -->HOME
if (sessionStorage.getItem('user')) { inicio(); }
sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");
//var para poner una indicacion que usuario está activo.

function inicio() {
    sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");
    var es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (es_firefox) {
        var nomSesion = sessionStorage.key(1);
    } else {
        var nomSesion = sessionStorage.key(0);
    }


    //Quita el div seccion del registro Login
    document.querySelector('.seccion').remove();

    //Para saber si está o no el div de iconos (grafica o perfil).
    var noExistIcon = document.querySelector("#icons") == null;
    if (noExistIcon) {
        //Creamos el Boton para ir a gráfica  
        var imgPerfil = document.createElement("img");
        imgPerfil.setAttribute("name", "icon");
        imgPerfil.setAttribute("id", "icons");
        imgPerfil.setAttribute("title", "Perfil");
        imgPerfil.src = "multiMedia/graph.jpg";
        imgPerfil.setAttribute("onclick", "perfil()")
        nav.appendChild(imgPerfil);
    } else {
        //Lo modifica donde está el hueco de icons ya creado
        var icon = document.querySelector("#icons");
        icon.setAttribute("title", "Perfil");
        icon.setAttribute("onclick", "perfil()");
        icon.src = "multiMedia/graph.jpg";
    }

    //Boton para crear cerrar sesion
    var noExistIcon = document.querySelector("#cerrarS") == null;
    if (noExistIcon) {
        var close = document.createElement("input");
        close.setAttribute("id", "cerrarS");
        close.setAttribute("type", "button");
        close.setAttribute("title", "Cerrar");
        close.setAttribute("value", `Cerrar sesión: ${nomSesion}`);
        close.setAttribute("onclick", "registroLogueo()");
        nav.appendChild(close);
    } else {
        var close = document.querySelector("#cerrarS");
        close.setAttribute("title", "Cerrar");
        close.setAttribute("value", `Cerrar sesión: ${nomSesion}`);
        close.setAttribute("onclick", "registroLogueo()");
    }
    //Creo el div en el que estará el texto de bienvenida y boton en EMPEZAR
    var contInicio = document.createElement("div");
    contInicio.setAttribute("class", "seccion");
    contInicio.setAttribute("id", "inicio");
    insertCaja("#principal", contInicio);

    //Primer Párrafo de bienvenida
    insertCaja("#inicio", crearEtiqSin("p", "Bienvenidos a QUIZ CoLySe, es una página donde tendrás que acertar una serie de cuestiones y donde podrás guardar tus logros, ver tu evolución y las mejores puntuaciones de otros usuarios."));
    var contP = document.getElementsByTagName("p")[0];
    contP.setAttribute("class", "pInicio");

    //Segundo párrafo del recuadro de bienvenida 
    insertCaja("#inicio", crearEtiqSin("p", "Una vez que inicies el Quiz si te sales de la página, no se guardarán tus avances, ¡Mucha suerte y ánimo!"));
    var contP = document.getElementsByTagName("p")[1];
    contP.setAttribute("class", "pInicio");

    //Crea el selector de dificultad
    var contSel = document.createElement("select");
    contSel.setAttribute("id", "dificultad");
    contSel.appendChild(crearOption("easy"));
    contSel.appendChild(crearOption("medium"));
    contSel.appendChild(crearOption("hard"));

    insertCaja("#inicio", contSel);

    //Se crean las categorías a elegir por el usuario
    var categorias = ["General", "Libros", "Películas", "Música", "Musicales & Teatro", "Televisión", "Video juegos", "Juegos de mesa", "Ciencia y Naturaleza", "Computadoras", "Matemáticas", "Mitología", "Deportes", "Geografía", "Historia"];
    //Se crea el selector de categoría
    var contSel = document.createElement("select");
    contSel.setAttribute("id", "categorias");

    let j = 9;
    for (i = 0; i < categorias.length; i++) {
        contSel.appendChild(crearOptionCategory(categorias[i], j, j));
        j++;
    }
    insertCaja("#inicio", contSel);

    //Botono de EMPEZAR Quiz
    insertCaja("#inicio", (crearEtiqCon("input", "Empezar", "start", "start", "button", "Empezar", "quiz()")));

    // Este es el audio que suena cada vez que se pulsa el botón de empezar,
    start.addEventListener("click", () => {
        let etiquetaAudio = document.createElement("audio");
        etiquetaAudio.setAttribute("src", "multiMedia/iniciotribal.mp3");
        etiquetaAudio.play();
    });
}


//FUNCIÓN QUE CREA EL TEXTO QUE SE UTILIZA EN EL SELECTOR DE NIVEL DE DIFICULTAD
function crearOption(texto) {
    var contOption = document.createElement("option"); 
    var txtP = document.createTextNode(texto);
    contOption.appendChild(txtP);
    return contOption;
}
//FUNCIÓN QUE CREA EL TEXTO QUE SE UTILIZA EN EL SELECTOR DE CATEGORIAS
function crearOptionCategory(texto, clase, id) {
    var contOption = document.createElement("option");
    contOption.setAttribute("class", clase);
    contOption.setAttribute("id", id);
    var txtOption = document.createTextNode(texto);
    contOption.appendChild(txtOption);
    return contOption;
}
