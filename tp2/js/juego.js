$(document).ready(function() {
    "use strict";

    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let boton = document.querySelector('#reinicio');
    let indicador = document.querySelector('.indicador');
    let fichaActual = null;
    let arrFichas = [];
    let arrImgs = [];
    let fichasTotales = 42;
    let tablero = new Tablero(320, 120);
    let turno = 1;
    let ganador = false;
    let xI = 0;
    let yI = 0;

    setTimeout(iniciar, 1000);
    cargarImgs();

    function iniciar() {
        cleanCanvas();
        boton.innerHTML = 'Reiniciar';
        boton.disabled = false;
        indicador.innerHTML = "Turno Jugador Rojo";

        let posX, posY, color, jugador, img, imgW, imgS;
        for (let index = 0; index < fichasTotales; index++) {
            if (index % 2 == 0) {
                posX = 90;
                posY = 560 - (13 * index + 1);
                color = "Rojo";
                img = arrImgs[0];
                imgW = arrImgs[2];
                imgS = arrImgs[4];
                jugador = 1;
            } else {
                posX = 1100;
                posY = 575 - (13 * index + 1);
                color = "Azul";
                img = arrImgs[1];
                imgW = arrImgs[3];
                imgS = arrImgs[5];
                jugador = 2;
            }
            let ficha = new Ficha(posX, posY, 30, jugador, img, imgW, imgS, color);
            //console.log(ficha);
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

    function numeroRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function getMousePos(canvas, event) { //devuelve la posicion del click en el canvas
        let rect = canvas.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    canvas.onmouseup = function(event) {
        let pos = getMousePos(canvas, event);
        if (fichaActual != null) {
            fichaActual.setSeleccionada(false);
            actualizar();
        }

        if (tablero.enDropZone(pos.x, pos.y) && (fichaActual != null) && (!ganador)) {
            turno = tablero.agregarficha(fichaActual, pos.x, arrFichas, turno);
            if (fichaActual.getColor() == "Rojo") {
                indicador.innerHTML = "Turno Jugador Azul";
            } else {
                indicador.innerHTML = "Turno Jugador Rojo";
            }
            if (hayGanador()) {
                indicador.innerHTML = "Gano Jugador " + fichaActual.getColor() + "!";
                ganador = true;
            }
            actualizar();
        } else if (fichaActual != null) {
            fichaActual.setX(xI);
            fichaActual.setY(yI);
            actualizar();
        }
        fichaActual = null;
    }

    canvas.onmousedown = function(event) { //verifica si se hizo click en una ficha
        let pos = getMousePos(canvas, event);

        for (let i = 0; i < arrFichas.length; i++) {
            if (arrFichas[i].clickInside(pos.x, pos.y) && (!arrFichas[i].getEnTablero()) && (arrFichas[i].getJugador() == turno) && (!ganador)) {
                fichaActual = arrFichas[i];
                xI = fichaActual.getX();
                yI = fichaActual.getY();
                fichaActual.setSeleccionada(true);
                actualizar();
                break;
            }
        }
    }

    canvas.onmousemove = function(event) { //mueve el punto en el canvas o la figura
        let pos = getMousePos(canvas, event);

        if (fichaActual != null) {
            fichaActual.drawFicha(ctx);
            fichaActual.setX(pos.x);
            fichaActual.setY(pos.y);
            actualizar();
        }
    }

    document.querySelector('#reinicio').addEventListener('click', function() {
        cleanCanvas();
        xI = 0;
        yI = 0;
        indicador.innerHTML = "Turno Jugador Rojo";
        arrFichas.splice(0, arrFichas.length);
        tablero = new Tablero(320, 120);
        tablero.setImg(arrImgs[6]);
        turno = 1;
        ganador = false;
        iniciar(fichasTotales);
    });

    function hayGanador() {
        let matriz = tablero.getMatTablero();
        let largo = matriz.length;
        let alto = matriz[0].length;
        let jugador;
        let ganador = false;

        for (let i = 0; i < largo; i++) {
            for (let j = 0; j < alto; j++) {
                if (matriz[i][j] != null) {
                    jugador = matriz[i][j].getJugador();
                    ganador = evaluar(jugador, matriz, i, j, largo, alto);
                    if (ganador.length != 0) {
                        matriz[i][j].setGanadora(true);
                        for (let index = 0; index < ganador.length; index++) {
                            ganador[index].setGanadora(true);
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function evaluar(jugador, matriz, i, j, largo, alto) {
        let pos = 1;
        let win = false;
        let arr = [];

        if (!win) {
            for (let index = 0; index < 4; index++) { //vertical
                let x = i;
                let y = j - (index + 1);
                if (x < largo && x > -1 && y < alto && y > -1 && matriz[x][y] != null && matriz[x][y].getJugador() == jugador) {
                    pos++;
                    arr.push(matriz[x][y]);
                } else {
                    if (pos < 4) {
                        arr = [];
                        pos = 1;
                        break;
                    }
                }
            }
            if (pos == 4) {
                return arr;
            }
            for (let index = 0; index < 4; index++) { //horizontal
                let x = i - (index + 1);
                let y = j;
                if (x < largo && x > -1 && y < alto && y > -1 && matriz[x][y] != null && matriz[x][y].getJugador() == jugador) {
                    pos++;
                    arr.push(matriz[x][y]);
                } else {
                    if (pos < 4) {
                        arr = [];
                        pos = 1;
                        break;
                    }
                }
            }
            if (pos == 4) {
                return arr;
            }
            for (let index = 0; index < 4; index++) { //diag izq
                let x = i - (index + 1);
                let y = j - (index + 1);
                if (x < largo && x > -1 && y < alto && y > -1 && matriz[x][y] != null && matriz[x][y].getJugador() == jugador) {
                    pos++;
                    arr.push(matriz[x][y]);
                } else {
                    if (pos < 4) {
                        arr = [];
                        pos = 1;
                        break;
                    }
                }
            }
            if (pos == 4) {
                return arr;
            }
            for (let index = 0; index < 4; index++) { //diag der
                let x = i + (index + 1);
                let y = j - (index + 1);
                if (x < largo && x > -1 && y < alto && y > -1 && matriz[x][y] != null && matriz[x][y].getJugador() == jugador) {
                    pos++;
                    arr.push(matriz[x][y]);
                } else {
                    if (pos < 4) {
                        arr = [];
                        pos = 1;
                        break;
                    }
                }
            }
            if (pos == 4) {
                return arr;
            }
        }
        return [];
    }

    function cargarImgs() {
        let fichaRoja = new Image();
        fichaRoja.src = "img/roja.png";
        fichaRoja.onload = function() {
            arrImgs.push(fichaRoja);
            let fichaAzul = new Image();
            fichaAzul.src = "img/azul.png";
            fichaAzul.onload = function() {
                arrImgs.push(fichaAzul);
                let fichaRojaW = new Image();
                fichaRojaW.src = "img/rojaW.png";
                fichaRojaW.onload = function() {
                    arrImgs.push(fichaRojaW);
                    let fichaAzulW = new Image();
                    fichaAzulW.src = "img/azulW.png";
                    fichaAzulW.onload = function() {
                        arrImgs.push(fichaAzulW);
                        let fichaRojaS = new Image();
                        fichaRojaS.src = "img/rojaS.png";
                        fichaRojaS.onload = function() {
                            arrImgs.push(fichaRojaS);
                            let fichaAzulS = new Image();
                            fichaAzulS.src = "img/azulS.png";
                            fichaAzulS.onload = function() {
                                arrImgs.push(fichaAzulS);
                                let tableroImg = new Image();
                                tableroImg.src = "img/tablero.png";
                                tableroImg.onload = function() {
                                    arrImgs.push(tableroImg);
                                    tablero.setImg(arrImgs[6]);
                                    //console.table("dentro de cargar " + arrImgs);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});