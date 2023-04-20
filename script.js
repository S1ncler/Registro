//funciones jquery en tiempo real
$(function () {
    //funcion para habilitar y deshabilitar el campo de otro cargo si se selecciona otro
    $("#cargo").change(function () {
        if ($(this).val() !== "otro") {
            $("#inputOtro").prop("hidden", true);
        } else {
            $("#inputOtro").prop("hidden", false);
        }
    });
    // funcion para cambiar el color del boton segun el genero
    $("#genero").change(function () {
        if ($(this).val() == "femenino") {
            $("#boton").removeClass("azul");
            $("#boton").addClass("rosado");
        } else {
            $("#boton").removeClass("rosado");
            $("#boton").addClass("azul");
        }
    });

});
// funcion para regstrar los campos y guardarlos cuando se le de al boton
function registrar() {
    //
    if ($("#nombre").val() !== "" &&
        $("#aspiracion").val() !== "" &&
        $("#email").val() !== "") {
        if ($("#inputOtro").prop("disable")) {
            guardar(
                {
                    nombre: $("#nombre").val(),
                    aspiracion: $("#aspiracion").val(),
                    email: $("#email").val(),
                    genero: $("#genero").val(),
                    cargo: $("#cargo").val()
                }
            )
        }
        else {
            guardar(
                {
                    nombre: $("#nombre").val(),
                    aspiracion: $("#aspiracion").val(),
                    email: $("#email").val(),
                    genero: $("#genero").val(),
                    cargo: $("#inputOtro").val()
                }
            )
        }
        return alert("Se registro con exito")
    }
    else {
        return alert("Por favor rellene todos los campos")

    }
};
// esta funcion guarda el nuevo registro e imprime la lista actualizada de registros
function guardar(newJson = {}) {
    // Leer la lista actual de JSON del almacenamiento local y convertirla a un objeto JavaScript
    const listaJSON = localStorage.getItem('lista');
    const lista = listaJSON ? JSON.parse(listaJSON) : [];
    //guardo el nuevo json en la lista
    lista.push(newJson);
    //imprimo la lista
    alert(JSON.stringify(lista))
    // Convertir la lista actualizada a una cadena JSON y guardarla en el almacenamiento local
    localStorage.setItem('lista', JSON.stringify(lista));
}