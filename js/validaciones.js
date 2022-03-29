//! PAGINA DE VALIDACIONES
class User {
    constructor(nombre, pass, puntuaciones, best) {
        this.nombre = nombre;
        this.pass = pass;
        this.puntuaciones = puntuaciones;
        this.best = best;
    }
}


//RECOGE LA INFORMACIÓN PARA REGISTRARSE 
function registrar() {
    //Recoge en un array los inputs
    var info = document.getElementsByTagName("input");
    var nombre = info[0].value;
    var pass = info[1].value;
    var pass2 = info[2].value;
    var puntuaciones = [0];
    var best = 0;
    //Pone "" los spans
    borrarAlert();

    //Zona de validaciones
    var nameOk = validationNameAll(nombre);
    var passOk = validationPassword(pass);
    var pass2Ok = validationPassword(pass2);
    var mismoPass = pass == pass2;
    var ok = nameOk && passOk && pass2Ok && mismoPass;
    if (ok) {
        //Comprueba si el nombre de usuario ingresado ya está elegido
        var nombreExist = false;
        let i = 0;
        while (i < localStorage.length && !nombreExist) {
            nombreExist = nombreExist || info[0].value == localStorage.key(i);
            i++;
        }
        if (nombreExist) {
            crearAlert("Usuario ya elegido", 2);
        } else {
            var user = new User(nombre, pass, puntuaciones, best);
            var userCadena = JSON.stringify(user);
            localStorage.setItem(user.nombre, userCadena);
            alert(`Registro correcto ${user.nombre}`);
        }
    } else {
        !nameOk ? crearAlert("Nombre no válido", 0) : crearAlert("Válido", 0, "green");
        !passOk ? crearAlert("Min 1 número y 1 caracter especial", 1) : crearAlert("Válido", 1, "green");
        !pass2Ok ? crearAlert("Pasword no válido", 2) : crearAlert("Válido", 2, "green");
        !mismoPass ? crearAlert(" Passwords no son iguales", 3) : crearAlert("Passwords iguales", 3, "green");
    }
}


// SI SE LOGUEA CORRECTAMENTE CREA USUARIO Y ACTIVA DOM INICIO
function loguear() {
    // Validacion
    var info = document.getElementsByTagName("input");
    var nombre = info[4].value;
    var pass = info[5].value;
    borrarAlert();

    var nameOk = validationNameAll(nombre);
    var passOk = validationPassword(pass);
    var ok = nameOk && passOk;

    if (ok) {
        // Busca si existe ese usuario
        var correoExist = false;
        var i = 0;
        while (i < localStorage.length && !correoExist) {
            //Encuentra la key del correo        
            var correoExist = correoExist || info[4].value == localStorage.key(i);
            i++;
        }
        if (correoExist) { //compueba el nombre y el pass
            var extraer = JSON.parse(localStorage.getItem(info[4].value)); // Extrae info para ver su pass
            var passCorrect = info[5].value == extraer.pass; //Compara las pass introducida por la guardada. 
            if (passCorrect) {
                crearAlert("Bienvenido", 4, "green");
                var extraerJson = JSON.stringify(extraer);
                // console.log(extraerJson);    
                //Metemos            
                sessionStorage.setItem(extraer.nombre, extraerJson);
                sessionStorage.setItem("user", true);
                alert("Hola " + extraer.nombre);
                inicio();
            } else {
                crearAlert("¿Has olvidado la contraseña?", 4);
            }
        } else {
            crearAlert("Usuario no existe, Registrese", 4);
        }
    } else {
        !nameOk ? crearAlert("Nombre no válido", 4) : crearAlert("Válido", 4, "green");
        !passOk ? crearAlert("Pass no válido", 5) : crearAlert("Válido", 5, "green");
    }
}

//!     ZONA DE VALIDACIONES    

function validationNameAll(nombre) {
    return (
        tieneCaracter(nombre, "A", "Z") ||
        tieneCaracter(nombre, "a", "z")
    );
}
function tieneCaracter(nombre, cInicio, cFinal) {
    var i = 0;
    var encontrado = false;
    while (!encontrado && i < nombre.length) {
        // pass.charCodeAt(0) >= 48 => [] arroja cero por ser la posición en la tabla ASCII
        encontrado =
            encontrado ||
            (nombre.charCodeAt(i) >= cInicio.charCodeAt(0) && nombre.charCodeAt(i) <= cFinal.codePointAt(0));
        i++;
    }
    return encontrado;
}

function tamValido(pass) { return pass.length >= 5 && pass.length <= 8; }

function validationPassword(pass) {
    return (
        tamValido(pass) &&
        tieneCaracter(pass, "0", "9") &&
        tieneCaracter(pass, "!", "/")
    );
}
