$(document).ready(function() {
    "use strict";

    let botonEnviar = $("#formEnviar");

    botonEnviar.on("click", function(event) {
        event.preventDefault();
        $("#formEnviar").hide(1000);
        $("#formEnviar").show(1000);
        setTimeout(function() {
            document.querySelector("#formEnviar").innerHTML = "Enviado!";
        }, 500)
    });



});