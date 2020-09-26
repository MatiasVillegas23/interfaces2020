$(document).ready(function() {
    "use strict";

    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let fichaActual = null;
    let arrFichas = [];
    let fichasTotales = 42;

    iniciar(fichasTotales);

    function iniciar(fichasTotales) {
        let posX, posY, color;
        for (let index = 0; index < fichasTotales; index++) {
            if (index % 2 == 0) {
                posX = 90;
                posY = 530;
                color = '#ff0000';
            } else {
                posX = 1110;
                posY = 530;
                color = '#0000ff';
            }
            let ficha = new Ficha(posX, posY, 10, color);
            arrFichas.push(ficha);
        }
        drawAll();
    }

    function drawAll() {
        for (let index = 0; index < fichasTotales; index++) {
            arrFichas[index].drawFicha(ctx);
        }
        //dibujar tablero
    }

    function cleanCanvas() { //setea el canvas en blanco
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function getMousePos(canvas, event) { //devuelve la posicion del click en el canvas
        let rect = canvas.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    canvas.onmouseup = function(event) {
        fichaActual = null;
    }

    canvas.onmousedown = function(event) { //verifica si se hizo click en una ficha
        let pos = getMousePos(canvas, event)

        for (let i = 0; i < arrFichas.length; i++) {
            if (arrFichas[i].clickInside(pos.x, pos.y)) {
                //console.log("Posicion x: " + Math.floor(pos.x));
                //console.log("Posicion y: " + Math.floor(pos.y));
                fichaActual = arrFichas[i];
                break;
            }
        }
        /*if (objetoActual == null) {
            let pos = getMousePos(canvas, event);
            //console.log("Posicion x: " + Math.floor(pos.x));
            //console.log("Posicion y: " + Math.floor(pos.y));
            let circulo = new Circulo(pos.x, pos.y, 10, '#ff0000');
            circulos.push(circulo);
            actualizar();
        }*/
    }

    canvas.onmousemove = function(event) { //mueve el punto en el canvas o la figura
        let pos = getMousePos(canvas, event);

        if (fichaActual != null) {
            //console.log("Posicion x: " + Math.floor(pos.x));
            //console.log("Posicion y: " + Math.floor(pos.y));
            fichaActual.setX(pos.x);
            fichaActual.setY(pos.y);
            actualizar();
        }
    }

    function actualizar() { //funcion q refresca el canvas en cada evento
        cleanCanvas();
        for (let index = 0; index < arrFichas.length; index++) {
            arrFichas[index].drawFicha(ctx);
        }
        ctx.closePath();
    }
});