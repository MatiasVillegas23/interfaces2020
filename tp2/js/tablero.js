class Tablero {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.matTablero;
        this.cargarTablero();
    }

    cargarTablero() {
        this.matTablero = new Array(7);
        for (let i = 0; i < this.matTablero.length; i++) {
            this.matTablero[i] = new Array(6);
            for (let j = 0; j < this.matTablero[i].length; j++) {
                //console.log('[' + i + ', ' + j + ']');
                this.matTablero[i][j] = null;
            }
        }
    }

    getMatTablero() {
        return this.matTablero;
    }

    agregarfichaBis(ficha, x, arrFichas) {
        for (let i = 0; i < 7; i++) {
            if (x < (this.posX + (80 * (i + 1)))) {
                for (let j = this.matTablero[i].length - 1; j >= 0; j--) {
                    if (this.matTablero[i][j] == null) {
                        this.matTablero[i][j] = ficha;
                        ficha.setEnTablero(true);
                        break;
                    }
                }
                break;
            }
        }
        this.eliminarFicha(arrFichas);
    }

    /*agregarFicha(ficha, x, arrFichas) { //agrega la ficha al tablero
        if (x < (this.posX + 80)) {
            for (let index = this.matTablero[0].length - 1; index >= 0; index--) {
                if (this.matTablero[0][index] == null) {
                    this.matTablero[0][index] = ficha;
                    ficha.setEnTablero(true);
                    break;
                }
            }
        } else if (x < (this.posX + 80 * 2)) {
            for (let index = this.matTablero[1].length - 1; index >= 0; index--) {
                if (this.matTablero[1][index] == null) {
                    this.matTablero[1][index] = ficha;
                    ficha.setEnTablero(true);
                    break;
                }
            }
        } else if (x < (this.posX + 80 * 3)) {
            for (let index = this.matTablero[2].length - 1; index >= 0; index--) {
                if (this.matTablero[2][index] == null) {
                    this.matTablero[2][index] = ficha;
                    ficha.setEnTablero(true);
                    break;
                }
            }
        } else if (x < (this.posX + 80 * 4)) {
            for (let index = this.matTablero[3].length - 1; index >= 0; index--) {
                if (this.matTablero[3][index] == null) {
                    this.matTablero[3][index] = ficha;
                    ficha.setEnTablero(true);
                    break;
                }
            }
        } else if (x < (this.posX + 80 * 5)) {
            for (let index = this.matTablero[4].length - 1; index >= 0; index--) {
                if (this.matTablero[4][index] == null) {
                    this.matTablero[4][index] = ficha;
                    ficha.setEnTablero(true);
                    break;
                }
            }
        } else if (x < (this.posX + 80 * 6)) {
            for (let index = this.matTablero[5].length - 1; index >= 0; index--) {
                if (this.matTablero[5][index] == null) {
                    this.matTablero[5][index] = ficha;
                    ficha.setEnTablero(true);
                    break;
                }
            }
        } else if (x < (this.posX + 80 * 7)) {
            for (let index = this.matTablero[6].length - 1; index >= 0; index--) {
                if (this.matTablero[6][index] == null) {
                    this.matTablero[6][index] = ficha;
                    ficha.setEnTablero(true);
                    break;
                }
            }
        }
        this.eliminarFicha(arrFichas);
    }*/

    eliminarFicha(arrFichas) {
        for (let i = 0; i < arrFichas.length; i++) {
            if (arrFichas[i].getEnTablero()) {
                arrFichas.splice(i, 1);
                break;
            }
        }
    }

    enDropZone(x, y) {
        if ((x > this.posX && x < (this.posX + 80 * 7)) && (y > this.posY - 80 && y < this.posY)) {
            return true;
        } else {
            return false;
        }
    }

    drawTablero(ctx, size) { //dibuja el tablero
        //ctx.strokeRect(this.posX, this.posY - size, size * 7, size);
        let x, y;
        for (let i = 0; i < 7; i++) {
            x = this.posX + (size * i);
            for (let j = 0; j < 6; j++) {
                y = this.posY + (size * j);
                if (this.matTablero[i][j] != null) {
                    ctx.fillStyle = this.matTablero[i][j].getColor();
                    ctx.beginPath();
                    //console.log("la casilla llena en x: " + (x + 40) + " y: " + (y + 40));
                    ctx.arc((x + 40), (y + 40), 30, 0, 2 * Math.PI);
                    ctx.fill();
                }
                ctx.strokeRect(x, y, size, size);
            }
        }
    }
}