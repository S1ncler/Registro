//funciones jquery en tiempo real

//funcion para habilitar y deshabilitar el campo de otro cargo si se selecciona otro
document.querySelector("[data-field-cargo]").addEventListener('change', function () {
    if (this.value !== "otro") document.querySelector("[data-field-inpotro]").setAttribute("hidden", "")
    else document.querySelector("[data-field-inpotro]").removeAttribute("hidden", "")
});
// funcion para cambiar el color del boton segun el genero
document.querySelector("[data-field-genero]").addEventListener('change', function () {
    if (this.value !== "femenino") document.querySelector("[data-submit]").classList.replace("rosado", "azul")
    else document.querySelector("[data-submit]").classList.replace("azul", "rosado")
});

// funcion para regstrar los campos y guardarlos cuando se le de al boton
document.querySelector("[data-form]").addEventListener('submit', function (event) {
    //se previene que el submit recargue la pagina
    event.preventDefault()
    // Se obtienen los valores del formulario en una lista
    let $form = document.querySelector("[data-form]")
    //se verifica que los campos no esten vacios
    if (document.querySelector("[data-field-nombres]").value !== "" &&
        document.querySelector("[data-field-aspiracion]").value !== "" &&
        document.querySelector("[data-field-email]").value !== "") {
        // si el input de otro esta oculto
        if (document.querySelector("[data-field-inpotro]").hasAttribute("hidden")) {
            // se crea el json recorriendo los inputs del form
            let json = {};
            for (let i = 0; i < $form.length - 2; i++) json[$form[i].getAttribute("name")] = $form[i].value;
            guardar(json);
        }
        // si el input de otro no esta oculto
        else {
            // se crea el json recorriendo los inputs del form
            let json = {};
            for (let i = 0; i < $form.length - 1; i++) if (i !== $form.length - 3) json[$form[i].getAttribute("name")] = $form[i].value;
            guardar(json);
        }
        // Se limpian todos los campos del form
        for (let i = 0; i < $form.length - 1; i++) {
            if (i === $form.length - 4) $form[i].value = "masculino";
            if (i === $form.length - 3) $form[i].value = "desarrollador";
            if (i !== $form.length - 4 && i !== $form.length - 3) $form[i].value = "";
        };
        // Se retorna mensaje de exito
        return alert("Se registro con exito");
    }
    else {
        // Se retorna mensaje de rellenar los campos
        return alert("Por favor rellene todos los campos");
    }
});

// esta funcion guarda el nuevo registro e imprime la lista actualizada de registros
function guardar(newJson = {}) {
    // Leer la lista actual de JSON del almacenamiento local y convertirla a un objeto JavaScript
    let lista = localStorage.getItem('lista') ? JSON.parse(localStorage.getItem('lista')) : [];
    //guardo el nuevo json en la lista
    lista = [...lista, newJson];          // Spread
    //imprimo la lista
    console.log(JSON.stringify(lista));
    // Convertir la lista actualizada a una cadena JSON y guardarla en el almacenamiento local
    localStorage.setItem('lista', JSON.stringify(lista));
}