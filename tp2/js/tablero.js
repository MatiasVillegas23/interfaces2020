class Tablero {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.matTablero;
        this.cargarTablero(this.matTablero);
    }

    cargarTablero(f) {
        f = new Array(7);
        for (let i = 0; i < f.length; i++) {
            f[i] = new Array(6);
            for (let j = 0; j < f[i].length; j++) {
                //console.log('[' + i + ', ' + j + ']');
                f[i][j] = "";
            }
        }
    }

    getMatTablero() {
        return this.matTablero;
    }

    agregarFicha(x) { //agrega la ficha al tablero

    }

    enDropZone(x, y) {
        if ((x > this.posX && x < (this.posX + 80 * 7)) && (y > this.posY - 80 && y < this.posY)) {
            console.log("dentro");
            return true;
        } else {
            console.log("afu");
            return false;
        }
    }

    drawTablero(ctx, size) { //dibuja el tablero
        //ctx.beginPath();
        //ctx.strokeRect(this.posX, this.posY - size, size * 7, size);
        let x, y;
        for (let i = 0; i < 7; i++) {
            x = this.posX + (size * i);
            for (let j = 0; j < 6; j++) {
                y = this.posY + (size * j);
                ctx.strokeRect(x, y, size, size);
            }
        }
    }

}