$(document).ready(function() {
    "use strict";

    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let fichaActual = null;
    let arrFichas = [];
    let fichasTotales = 42;
    let tablero = new Tablero(320, 120);
    let turno = 1;

    iniciar(fichasTotales);

    function iniciar(fichasTotales) {
        cleanCanvas();

        let posX, posY, color, jugador;
        for (let index = 0; index < fichasTotales; index++) {
            if (index % 2 == 0) {
                posX = 90;
                posY = 530;
                color = '#CF0C27';
                jugador = 1;
            } else {
                posX = 1110;
                posY = 530;
                color = '#11093E';
                jugador = 2;
            }
            let ficha = new Ficha(posX, posY, 30, color, jugador);
            arrFichas.push(ficha);
        }
        drawAll();
    }

    function drawAll() {
        tablero.drawTablero(ctx, 80);
        for (let index = 0; index < fichasTotales; index++) {
            arrFichas[index].drawFicha(ctx);
        }
    }

    function cleanCanvas() { //setea el canvas en blanco
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function actualizar() { //funcion q refresca el canvas en cada evento
        cleanCanvas();
        tablero.drawTablero(ctx, 80);
        for (let index = 0; index < arrFichas.length; index++) {
            arrFichas[index].drawFicha(ctx);
        }
        ctx.closePath();
    }

    function getMousePos(canvas, event) { //devuelve la posicion del click en el canvas
        let rect = canvas.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    canvas.onmouseup = function(event) {
        let pos = getMousePos(canvas, event);
        if (tablero.enDropZone(pos.x, pos.y) && (fichaActual != null)) {
            turno = tablero.agregarficha(fichaActual, pos.x, arrFichas, turno);
            actualizar();
        }
        //actualizar();
        fichaActual = null;
    }

    canvas.onmousedown = function(event) { //verifica si se hizo click en una ficha
        let pos = getMousePos(canvas, event);

        for (let i = 0; i < arrFichas.length; i++) {
            if (arrFichas[i].clickInside(pos.x, pos.y) && (!arrFichas[i].getEnTablero()) && (arrFichas[i].getJugador() == turno)) {
                fichaActual = arrFichas[i];
                break;
            }
        }
    }

    canvas.onmousemove = function(event) { //mueve el punto en el canvas o la figura
        let pos = getMousePos(canvas, event);

        if (fichaActual != null) {
            fichaActual.setX(pos.x);
            fichaActual.setY(pos.y);
            actualizar();
        }
    }

    document.querySelector('#reinicio').addEventListener('click', function() {
        cleanCanvas();
        arrFichas.splice(0, arrFichas.length);
        tablero = new Tablero(320, 120);
        turno = 1;
        iniciar(fichasTotales);
    });
});