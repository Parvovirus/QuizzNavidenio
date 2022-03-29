//! PAGINA DEL LOGUEO / REGISTRO


function registroLogueo() {
    //Borra los Dom anteriores
    document.querySelector('#cerrarS').remove();
    document.querySelector('.seccion').remove();
    document.querySelector("#icons").remove();
    
   
    //Cierra Sesion
    sessionStorage.clear();

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
    //Argumentos ("etiqueta","placeholder", "name" , "id", "tipo", "values")
    insertCaja("#register", crearEtiqCon("input", "Nuevo Usuario", "nameReg", "nameReg", "text"));
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

    //FUNCION CREA etiquetas sin atributos(div, p, labels, span) mete texto y devuleve su contenedor etiqueta.
    function crearEtiqSin(etiqueta, texto) {
        var contP = document.createElement(etiqueta);
        var txtP = document.createTextNode(texto);
        contP.appendChild(txtP);
        return contP;
    }

    //FUNCION CREA etiquetas con atributos (inputs) mete texto y devuleve su contenedor etiqueta
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
    // Funcion para meter cada elemento dentro de su caja (login o register)
    function insertCaja(padre, hijo) {
        document.querySelector(padre).appendChild(hijo);
    }
    // funcion crear Caja Login y registro
    function cajaLR(nombreId) {
        var contseccion = document.createElement("div");
        contseccion.setAttribute("id", nombreId);
        contseccion.setAttribute("class", "cont-flex");
        seccion.appendChild(contseccion);
    }

}
//! SI REFRESCA LA PAGINA YA LOGUEADO
if (sessionStorage.getItem('user')){inicio();}
