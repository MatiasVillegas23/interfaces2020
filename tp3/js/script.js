$(document).ready(function() {
    "use strict";

    let menu = document.querySelector('.hamburger');
    let opciones = document.querySelectorAll('#opciones');

    // method
    function toggleMenu(event) {
        this.classList.toggle('is-active');
        document.querySelector(".menuppal").classList.toggle("is_active");
        event.preventDefault();
    }

    // event
    menu.addEventListener('click', toggleMenu, false);

    for (let i = 0; i < opciones.length; i++) {
        opciones[i].addEventListener("click", function() {
            menu.classList.toggle('is-active');
            document.querySelector(".menuppal").classList.toggle("is_active");
            //event.preventDefault();
        });
    }

    // Set the date we're counting down to
    let countDownDate = new Date("Jan 8, 2021 21:00:00").getTime();

    // Update the count down every 1 second
    let x = setInterval(function() {

        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.querySelector(".countdown").innerHTML = days + "d " + hours + "h " +
            minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);

    setTimeout(function() {
        let header = document.querySelector(".header");
        let contenedor = document.querySelector(".contenedor");
        let footer = document.querySelector("footer");
        let cuerpo = document.querySelector(".cuerpo");
        header.hidden = false;
        contenedor.hidden = true;
        footer.hidden = false;
        cuerpo.hidden = false;
    }, 3000);

    let acordeon = document.querySelectorAll(".acordeon");

    for (let i = 0; i < acordeon.length; i++) {
        acordeon[i].addEventListener("click", function() {
            this.classList.toggle("activa");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    let johnny = document.querySelector(".johnny");
    let daniel = document.querySelector(".daniel");
    window.addEventListener("scroll", function() {
        //console.log(document.documentElement.scrollTop);
        if (document.documentElement.scrollTop > 2000 && document.documentElement.scrollTop < 2130) {
            daniel.hidden = false;
            //console.log("entre");
            //console.log(window.pageYOffset);
            //daniel.hidden = false;
            johnny.style.left = window.pageYOffset - 1991 + "px";
            daniel.style.left = -window.pageYOffset + 3240 + "px";
        }
    });

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