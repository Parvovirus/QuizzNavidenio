//! ARRANQUE DEL DOM REGISTER

// CREA UN DIV seccion dentro de #principal (esta en Html)
var divPrincipal = document.querySelector("#principal");

var seccion = document.createElement("div");
seccion.setAttribute("class", "seccion");
divPrincipal.appendChild(seccion);

//CREA el DIV REGISTER
cajaLR("register");
// Argumentos ("etiqueta", "Texto")
insertCaja("#register", crearEtiqSin("p", "REGISTRO"));
insertCaja("#register", crearEtiqSin("label", "Usuario"));
//Argumentos (etiqueta, texto, name, id, tipo, valor = "", fx)
insertCaja("#register", crearEtiqCon("input", "Nuevo Usuario", "nameReg", "nameReg", "text"));
// Span -> Para insertarla info de valido o no invalido formato
insertCaja("#register", crearEtiqSin("span", ""));
insertCaja("#register", crearEtiqSin("label", "Contraseña"));
insertCaja("#register", crearEtiqCon("input", "Password", "passReg", "passReg1", "password"));
insertCaja("#register", crearEtiqSin("span", ""));
insertCaja("#register", crearEtiqSin("label", "Confirmar Contraseña"));
insertCaja("#register", crearEtiqCon("input", "Confirmar Password", "passReg", "passReg2", "password"));
insertCaja("#register", crearEtiqSin("span", ""));
insertCaja("#register", crearEtiqSin("span", ""));
insertCaja("#register", crearEtiqCon("input", "Password", "passLog", "passLog", "button", "Registar", "registrar()"));

//CREA el DIV LOGIN
cajaLR("login");
// Argumentos ("etiqueta", "Texto")
insertCaja("#login", crearEtiqSin("p", "LOGIN"));
insertCaja("#login", crearEtiqSin("label", "Usuario"));
//Argumentos ("etiqueta","placeholder", "name" , "id", "tipo", "values","onclick")
insertCaja("#login", crearEtiqCon("input", "Usuario", "nameLog", "nameLog", "text"));
insertCaja("#login", crearEtiqSin("span", ""));
insertCaja("#login", crearEtiqSin("label", "Contraseña"));
insertCaja("#login", crearEtiqCon("input", "Password", "passLog", "passLog", "password"));
insertCaja("#login", crearEtiqSin("span", ""));
insertCaja("#login", crearEtiqCon("input", "Password", "buttonLog", "buttonLog", "button", "Loguear", "loguear()"));


//FUNCION CREA etiquetas SIN atributos (div, p, labels, span) mete texto y devuelve su contenedor etiqueta
function crearEtiqSin(etiqueta, texto) {
    var contP = document.createElement(etiqueta);
    var txtP = document.createTextNode(texto);
    contP.appendChild(txtP);
    return contP;
}

//FUNCION CREA etiquetas CON atributos (inputs) mete texto y devuleve su contenedor etiqueta
function crearEtiqCon(etiqueta, texto, name, id, tipo, valor = "", fx) {
    var contP = document.createElement(etiqueta);
    contP.setAttribute("type", tipo);
    contP.setAttribute("id", id);
    contP.setAttribute("name", name);
    contP.setAttribute("value", valor);
    contP.setAttribute("placeholder", texto);
    if (contP.type == "button") {
        contP.setAttribute("onclick", fx);
    }
    return contP;
}


// FUNCIÓN para meter cada elemento dentro de su caja (login o register)
function insertCaja(padre, hijo) {
    document.querySelector(padre).appendChild(hijo);
}
// FUNCIÓN crear Caja Login y registro
function cajaLR(nombreId) {
    var contSeccion = document.createElement("div");
    contSeccion.setAttribute("id", nombreId);
    contSeccion.setAttribute("class", "cont-flex");
    seccion.appendChild(contSeccion);
}


//FUNCION QUE DA ALERTA EN DOM DE LA VALIDACION
function crearAlert(Texto, num, colore = "red") {
    var spanInvalid = document.getElementsByTagName("span")[num];
    var textToAdd = document.createTextNode(Texto);
    spanInvalid.style.color = colore;
    spanInvalid.appendChild(textToAdd);
}
//FUNCION QUE BORRA EL CONTENIDO DEL SPAN ASI NO SE INCREMENTA SPANS.
function borrarAlert() {
    var spans = document.getElementsByTagName("span");
    for (i = 0; i < spans.length; i++) {
        spans[i].innerHTML = "";
    }
}


//! SI REFRESCA LA PAGINA YA LOGUEADO
if (sessionStorage.getItem('user')) { inicio(); }

