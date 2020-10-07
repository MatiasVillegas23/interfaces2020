class Ficha {
    constructor(posX, posY, radio, jugador, img, imgW, imgS, color) {
        this.posX = posX;
        this.posY = posY;
        this.radio = radio;
        this.color = color;
        this.enTablero = false;
        this.ganadora = false;
        this.jugador = jugador;
        this.img = img;
        this.imgW = imgW;
        this.imgS = imgS;
        this.seleccionada = false;
    }

    getX() {
        return this.posX;
    }

    setX(x) {
        this.posX = x;
    }

    getY() {
        return this.posY;
    }

    setY(y) {
        this.posY = y;
    }

    getJugador() {
        return this.jugador;
    }

    setJugador(j) {
        this.jugador = j;
    }

    getRadio() {
        return this.radio;
    }

    getEnTablero() {
        return this.enTablero;
    }

    setEnTablero(b) {
        this.enTablero = b;
    }

    getColor() {
        return this.color;
    }

    getGanadora() {
        return this.ganadora;
    }

    setGanadora(b) {
        this.ganadora = b;
    }

    getSeleccionada() {
        return this.seleccionada;
    }

    setSeleccionada(seleccionada) {
        this.seleccionada = seleccionada;
    }

    clickInside(x, y) { //devuelve si se hizo click dentro de la ficha
        let dx = Math.abs(x - this.getX());
        let dy = Math.abs(y - this.getY());
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (distance <= this.radio) {
            return true;
        } else {
            return false;
        }
    }

    /*drawFicha(ctx) { //dibuja la ficha
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.getX(), this.getY(), this.getRadio(), 0, 2 * Math.PI);
        ctx.fill();
    }

    drawFichaEn(ctx, x, y, color) { //dibuja la ficha en la pos indicada
        if (this.getGanadora()) {
            ctx.strokeStyle = "#39D211";
            ctx.fillStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, this.getRadio(), 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        } else {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, this.getRadio(), 0, 2 * Math.PI);
            ctx.fill();
        }
    }*/

    drawFicha(ctx) { //dibuja la ficha
        //console.log(this.img);
        if (this.getSeleccionada()) {
            ctx.drawImage(this.imgS, this.posX - this.radio, this.posY - this.radio);
        } else {
            ctx.drawImage(this.img, this.posX - this.radio, this.posY - this.radio);
        }
    }

    drawFichaEn(ctx, x, y) { //dibuja la ficha en la pos indicada
        if (this.getGanadora()) {
            ctx.drawImage(this.imgW, x - this.radio, y - this.radio);
        } else {
            ctx.drawImage(this.img, x - this.radio, y - this.radio);
        }
    }
}