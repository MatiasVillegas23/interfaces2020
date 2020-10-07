class Tablero {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.matTablero;
        this.img;
        this.cargarTablero();
    }

    getImg() {
        return this.img;
    }

    setImg(img) {
        this.img = img;
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

    agregarficha(ficha, x, arrFichas, turno) {
        for (let i = 0; i < 7; i++) {
            if (x < (this.posX + (80 * (i + 1)))) {
                for (let j = this.matTablero[i].length - 1; j >= 0; j--) {
                    if (this.matTablero[i][j] == null) {
                        this.matTablero[i][j] = ficha;
                        ficha.setEnTablero(true);
                        if (turno == 1) {
                            this.eliminarFicha(arrFichas);
                            return 2;
                        } else {
                            this.eliminarFicha(arrFichas);
                            return 1;
                        }
                    }
                }
                break;
            }
        }
        this.eliminarFicha(arrFichas);
    }

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

    drawTablero(ctx, size) {
        let x, y;
        ctx.drawImage(this.img, this.posX, this.posY);
        for (let i = 0; i < 7; i++) {
            x = this.posX + (size * i);
            for (let j = 0; j < 6; j++) {
                y = this.posY + (size * j);
                if (this.matTablero[i][j] != null) {
                    this.matTablero[i][j].drawFichaEn(ctx, (x + 40), (y + 40));
                }
                //ctx.strokeStyle = "#000000";
                //ctx.strokeRect(x, y, size, size);
            }
        }
    }

    /*drawTablero(ctx, size) { //dibuja el tablero
        //ctx.strokeRect(this.posX, this.posY - size, size * 7, size);
        let x, y;
        for (let i = 0; i < 7; i++) {
            x = this.posX + (size * i);
            for (let j = 0; j < 6; j++) {
                y = this.posY + (size * j);
                if (this.matTablero[i][j] != null) {
                    this.matTablero[i][j].drawFichaEn(ctx, (x + 40), (y + 40) /*, this.matTablero[i][j].getColor() AGERGAR ACA UN CIERRE DE COMEN);
                }
                ctx.strokeStyle = "#000000";
                ctx.strokeRect(x, y, size, size);
            }
        }
    }*/
}