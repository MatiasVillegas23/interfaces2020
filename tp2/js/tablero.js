class Tablero {
    constructor(arreglo) {
        this.arrFiguras = [];
        this.agregarCirculos(arreglo);
        this.centro;
    }

    getFigura() {
        return this.arrFiguras;
    }

    getCentroFigura() {
        return this.centro;
    }

    agregarCirculos(arreglo) { //agrega los circulos a la figura
        for (let i = 0; i < arreglo.length; i++) {
            this.arrFiguras[i] = arreglo[i];
        }
    }

    getCentro(poligono) { //devuelve las coordenadas del centro de una figura
        let centroid = {
            x: 0,
            y: 0
        };
        for (let i = 0; i < poligono.length; i++) {
            let point = poligono[i];
            centroid.x += poligono[i].getX();
            centroid.y += poligono[i].getY();
        }
        centroid.x /= poligono.length;
        centroid.y /= poligono.length;
        return centroid;
    }

    drawCentro(ctx, x, y) { //dibuja centro de la figura
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawFigura(ctx) { //dibuja la figura
        let poligono = this.getFigura();
        for (let i = 0; i < poligono.length; i++) {
            if (i > 0) {
                ctx.lineWidth = 3;
                ctx.strokeStyle = "#ffff00";
                ctx.beginPath();
                ctx.moveTo(poligono[i - 1].getX(), poligono[i - 1].getY());
                ctx.lineTo(poligono[i].getX(), poligono[i].getY());
                ctx.stroke();
            }
            poligono[i].drawCirculo(ctx);
        }
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ffff00";
        ctx.beginPath();
        ctx.moveTo(poligono[0].getX(), poligono[0].getY());
        ctx.lineTo(poligono[poligono.length - 1].getX(), poligono[poligono.length - 1].getY());
        ctx.stroke();
        let centro = this.getCentro(poligono);
        this.centro = new Circulo(centro.x, centro.y, 7, '#00ff00');
        this.centro.drawCirculo(ctx);
    }

}