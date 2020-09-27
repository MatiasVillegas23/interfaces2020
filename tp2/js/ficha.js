class Ficha {
    constructor(posX, posY, radio, color, jugador) {
        this.posX = posX;
        this.posY = posY;
        this.radio = radio;
        this.color = color;
        this.enTablero = false;
        this.jugador = jugador;
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

    drawFicha(ctx) { //dibuja la ficha
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.getX(), this.getY(), this.getRadio(), 0, 2 * Math.PI);
        ctx.fill();
    }
}