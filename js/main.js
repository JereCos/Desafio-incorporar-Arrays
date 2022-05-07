/*JS que simula la creación de usuario, login y posterior compra. Si el permiso que se le otorga al usuario es TOTAL tendrá mejores descuentos.*/

//Declaración de variables globales
let limitRetry = 3;
let flagLogueo = true;
let precioTotal = 0;
let opcion;
let compra;
let compraFinalizada = true;
let cantidadProductos = 0;
let nombreUsuario;
let passwordUsuario;
let permisosUsuario;
let passwordCorrecto = true;
let permisoCorrecto = true;

//clase constructora de usuario
class usuario{
    constructor(nombre, password, permisos){
        this.nombre = nombre.toUpperCase();
        this.password = password;
        this.permisos = permisos;
    }
    saludar(){
        this.saludar = alert("Hola " + this.nombre);
    }
}

//función compra producto
const comprarProducto = (nombreProducto, precio, descuento) => {
    precioTotal += precio*descuento;
    console.log("El parcial es " + precioTotal);
    return (nombreProducto + " comprado/a");
}

//función para compra
function comprar (descuento){
    do{
        opcion = prompt("Seleccione un producto:\n\n1- Carpintería\n2- Almacen\n3- Bazar\n4- Farmacia\n5- Ferretería\no escriba CANCELAR para cancelar la compra. Escriba FINALIZAR para finalizar la compra")
        if(opcion == "CANCELAR"){
            alert ("Compra cancelada")
            console.log("Compra cancelada");
            compraFinalizada = false;
        }else{  
            switch (opcion){
                case "1":
                    console.log(comprarProducto("Madera", 100, descuento));
                    compraFinalizada = true;
                break;
                case "2":
                    console.log(comprarProducto("Arroz", 10, descuento));
                    compraFinalizada = true;
                break;
                case "3":
                    console.log(comprarProducto("Sillón", 1000, descuento));
                    compraFinalizada = true;
                break;
                case "4":
                    console.log(comprarProducto("Migral", 150, descuento));
                    compraFinalizada = true;
                break;
                case "5":
                    console.log(comprarProducto("Foco", 50, descuento));
                    compraFinalizada = true;
                break;
                case "FINALIZAR":
                    compraFinalizada = false;
                break;
                default:
                break;
            }cantidadProductos += 1;
        } 
    }while(compraFinalizada);
}

//-----------------------------------------------------COMIENZO DE MAIN-----------------------------------------------------//

//Generación de usuario
nombreUsuario = prompt("Por favor ingrese nuevo nombre de usuario");
do{
    passwordUsuario = parseInt(prompt("Por favor ingrese nueva clave numérica para usuario"));
    passwordCorrecto = isNaN(passwordUsuario);
}while(passwordCorrecto)
do{
    permisosUsuario = prompt("Ingrese los permisos que va a tener este usuario\n - TOTAL\n - PARCIAL")
    if(permisosUsuario == "TOTAL"){
        permisoCorrecto = false;
    }else if(permisosUsuario == "PARCIAL"){
        permisoCorrecto = false;
    }else{
        permisoCorrecto = true;
    }
}while(permisoCorrecto)

const usuarioMaster = new usuario(nombreUsuario, passwordUsuario, permisosUsuario);

//Login de usuario creado
for (let i = 0; i < limitRetry; i++) {
    let usuarioName = prompt("Ingrese usuario").toUpperCase();
    let contrasenia = parseInt(prompt("Ingrese contraseña"));
    
    if (usuarioName == usuarioMaster.nombre && contrasenia == usuarioMaster.password){
        usuarioMaster.saludar();
        i = 10;
        flagLogueo = true;
    }else{
        alert ("Usuario incorrecto");
        flagLogueo = false;
    }
}

//Control de login
if (flagLogueo == true){
    alert("Login exitoso")
    console.log("Login exitoso");
    //Compra de producto con permisos TOTAL o PARCIAL
    if(permisosUsuario == "TOTAL"){
        comprar(0.5);
    }else{
        comprar(1.00);
    }
    //Finalizar compra por FINALIZAR o por CANCELAR
    if (opcion != "CANCELAR"){
        alert("El total de la compra es $" + precioTotal + " por la compra de " + cantidadProductos + " productos.");
        console.log("El total de la compra es $" + precioTotal + " por la compra de " + cantidadProductos + " productos.");  
    }else{
        alert("La compra fue cancelada.");
        console.error("La compra fue cancelada.");
    }    
}else{
    alert("Falla en el login");
    console.error("Falla en el login");
}