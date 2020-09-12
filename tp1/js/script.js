$(document).ready(function() {
    "use strict";

    //get component references
    let canvas = document.querySelector('#canvas');
    let input = document.querySelector('.input1');
    let globalImage = "";
    let filtroActual = "";
    //paint references
    let downFlag = false;
    let color = document.querySelector('#color');
    document.querySelector('#goma').onclick = setGoma;
    document.querySelector('#clean').onclick = cleanCanvas;
    //filters references
    document.querySelector("#original").onclick = original;
    document.querySelector("#gris").onclick = filtroGris;
    document.querySelector("#bn").onclick = filtroBN;
    document.querySelector("#negativo").onclick = filtroNegativo;
    document.querySelector("#sepia").onclick = filtroSepia;
    let brightness = document.querySelector("#brillo");
    brightness.addEventListener("change", filtroBrillo, false);
    let saturation = document.querySelector("#saturacion");
    saturation.addEventListener("change", filtroSaturacion, false);

    // clear canvas
    let context = canvas.getContext('2d');
    context.fillStyle = "#024359"; // canvas background color
    context.fillRect(0, 0, canvas.width, canvas.height);

    // when click OK in the File Dialog
    input.onchange = e => {

        // getting a hold of the file reference
        let file = e.target.files[0];

        // setting up the reader
        let reader = new FileReader();
        reader.readAsDataURL(file); // this is reading as data url

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            let content = readerEvent.target.result; // this is the content!

            let image = new Image();

            image.src = content;

            image.onload = function() {

                let imageAspectRatio = (1.0 * this.height) / this.width;
                let imageScaledWidth = canvas.width;
                let imageScaledHeight = canvas.width * imageAspectRatio;
                let maxWidth = canvas.width;
                let maxHeight = canvas.height;

                if (this.width > maxWidth) {
                    imageAspectRatio = (1.0 * maxWidth) / this.width;
                    imageScaledWidth = maxWidth;
                    imageScaledHeight = this.height * imageAspectRatio;
                }
                if (this.height > maxHeight) {
                    imageAspectRatio = (1.0 * maxHeight) / this.height;
                    imageScaledWidth = this.width * imageAspectRatio;
                    imageScaledHeight = maxHeight;
                }

                // draw image on canvas
                cleanCanvas();
                context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
                globalImage = context.getImageData(0, 0, canvas.width, canvas.height);
            }
        }
    }

    function original() {
        if ((!!globalImage) && (filtroActual != "original")) {
            filtroActual = "original";
            let imageData = Object.assign(globalImage);
            for (let x = 0; x < globalImage.width; x++) {
                for (let y = 0; y < globalImage.height; y++) {
                    let r = getRed(globalImage, x, y);
                    //console.log(r);
                    let g = getGreen(globalImage, x, y);
                    //console.log(g);
                    let b = getBlue(globalImage, x, y);
                    //console.log(b);
                    let a = 255;
                    setPixel(globalImage, x, y, r, g, b, a);
                }
            }
            context.putImageData(globalImage, 0, 0);
        }
    }

    function filtroGris() {
        if ((!!globalImage) && (filtroActual != "gris")) {
            filtroActual = "gris";
            let imageData = copyImageData(context, globalImage);
            for (let x = 0; x < globalImage.width; x++) {
                for (let y = 0; y < globalImage.height; y++) {
                    let r = getRed(imageData, x, y);
                    //console.log(r);
                    let g = getGreen(imageData, x, y);
                    //console.log(g);
                    let b = getBlue(imageData, x, y);
                    //console.log(b);
                    let a = 255;
                    let c = (r + g + b) / 3;
                    setPixel(imageData, x, y, c, c, c, a);
                }
            }
            context.putImageData(imageData, 0, 0);
        }
    }

    function filtroBN() {
        if ((!!globalImage) && (filtroActual != "bn")) {
            filtroActual = "bn";
            let imageData = copyImageData(context, globalImage);
            for (let x = 0; x < globalImage.width; x++) {
                for (let y = 0; y < globalImage.height; y++) {

                    let r = getRed(imageData, x, y);
                    let g = getGreen(imageData, x, y);
                    let b = getBlue(imageData, x, y);
                    let a = 255;
                    if ((r + g + b) / 3 < 128) {
                        r = 0;
                        g = 0;
                        b = 0;
                    } else {
                        r = 255;
                        g = 255;
                        b = 255;
                    }

                    setPixel(imageData, x, y, r, g, b, a);
                }
            }
            context.putImageData(imageData, 0, 0);
        }
    }

    function filtroNegativo() {
        if ((!!globalImage) && (filtroActual != "negativo")) {
            filtroActual = "negativo";
            let imageData = copyImageData(context, globalImage);
            for (let x = 0; x < globalImage.width; x++) {
                for (let y = 0; y < globalImage.height; y++) {

                    let r = getRed(imageData, x, y);
                    let g = getGreen(imageData, x, y);
                    let b = getBlue(imageData, x, y);
                    let a = 255;
                    let r2 = 255 - r;
                    let g2 = 255 - g;
                    let b2 = 255 - b;

                    setPixel(imageData, x, y, r2, g2, b2, a);
                }
            }
            context.putImageData(imageData, 0, 0);
        }
    }

    function filtroSepia() {
        if ((!!globalImage) && (filtroActual != "sepia")) {
            filtroActual = "sepia";
            let imageData = copyImageData(context, globalImage);
            for (let x = 0; x < globalImage.width; x++) {
                for (let y = 0; y < globalImage.height; y++) {

                    let r = getRed(imageData, x, y);
                    let g = getGreen(imageData, x, y);
                    let b = getBlue(imageData, x, y);
                    let a = 255;
                    let r2 = 0.393 * r + 0.769 * g + 0.189 + b;
                    let g2 = 0.349 * r + 0.686 * g + 0.168 + b;
                    let b2 = 0.272 * r + 0.534 * g + 0.131 + b;
                    if (r2 > 255) r2 = 255;
                    if (g2 > 255) g2 = 255;
                    if (b2 > 255) b2 = 255;

                    setPixel(imageData, x, y, r2, g2, b2, a);
                }
            }
            context.putImageData(imageData, 0, 0);
        }
    }

    function filtroBrillo() {
        if ((!!globalImage)) {
            filtroActual = "brillo";
            let imageData = copyImageData(context, globalImage);
            let value = brightness.value * 1.0 * 256 - 128;
            for (let x = 0; x < globalImage.width; x++) {
                for (let y = 0; y < globalImage.height; y++) {

                    let r = getRed(imageData, x, y);
                    let g = getGreen(imageData, x, y);
                    let b = getBlue(imageData, x, y);
                    let a = 255;

                    let r3 = trunc(value + r);
                    let g3 = trunc(value + g);
                    let b3 = trunc(value + b);

                    setPixel(imageData, x, y, r3, g3, b3, a);
                }
            }
            context.putImageData(imageData, 0, 0);
        }
    }

    function filtroSaturacion() {
        if ((!!globalImage)) {
            filtroActual = "saturacion";
            let imageData = copyImageData(context, globalImage);
            let value = saturation.value;
            for (let x = 0; x < globalImage.width; x++) {
                for (let y = 0; y < globalImage.height; y++) {

                    let r = getRed(imageData, x, y);
                    let g = getGreen(imageData, x, y);
                    let b = getBlue(imageData, x, y);
                    let a = 255;

                    let hsv = rgb2hsv(r, g, b);
                    hsv.s = value;
                    if (hsv.s > 100) hsv.s = 100;
                    let rgb = HSVtoRGB(hsv.h, hsv.s, hsv.v);

                    let r3 = rgb.r;
                    let g3 = rgb.g;
                    let b3 = rgb.b;

                    setPixel(imageData, x, y, r3, g3, b3, a);
                }
            }
            context.putImageData(imageData, 0, 0);
        }
    }

    function rgb2hsv(r, g, b) {
        let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
        rabs = r / 255;
        gabs = g / 255;
        babs = b / 255;
        v = Math.max(rabs, gabs, babs),
            diff = v - Math.min(rabs, gabs, babs);
        diffc = c => (v - c) / 6 / diff + 1 / 2;
        percentRoundFn = num => Math.round(num * 100) / 100;
        if (diff == 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(rabs);
            gg = diffc(gabs);
            bb = diffc(babs);

            if (rabs === v) {
                h = bb - gg;
            } else if (gabs === v) {
                h = (1 / 3) + rr - bb;
            } else if (babs === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            } else if (h > 1) {
                h -= 1;
            }
        }
        return {
            h: Math.round(h * 360),
            s: percentRoundFn(s * 100),
            v: percentRoundFn(v * 100)
        };
    }

    function HSVtoRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    function copyImageData(ctx, src) {
        let dst = ctx.createImageData(src.width, src.height);
        dst.data.set(src.data);
        return dst;
    }

    function setPixel(imageData, x, y, r, g, b, a) {

        let index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }

    function getRed(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 0];
    }

    function getGreen(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 1];
    }

    function getBlue(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 2];
    }

    function trunc(value) {
        if (value < 0)
            return 0;
        if (value > 255)
            return 255;
        else return value;
    }

    function cleanCanvas() { //setea el canvas en color por defecto
        context.fillStyle = '#024359';
        context.fillRect(0, 0, canvas.width, canvas.height);
        filtroActual = "";
    }

    //todo lo del paint

    function setGoma() {
        color.value = "#ffffff";
    }

    color.addEventListener("change", watchColorPicker, false);

    function watchColorPicker(event) {
        color = event.target;
    }

    function getMousePos(canvas, event) { //devuelve la posicion del click en el canvas
        let rect = canvas.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    canvas.onmousedown = function() {
        downFlag = true;
    }

    canvas.onmouseup = function() {
        downFlag = false;
    }

    canvas.onmousemove = function(event) { //verifica si se hizo click en un punto o crea uno nuevo
        let pos = getMousePos(canvas, event)
        if (downFlag) {
            //console.log("Posicion x: " + Math.floor(pos.x));
            //console.log("Posicion y: " + Math.floor(pos.y));
            context.fillStyle = color.value;
            context.beginPath();
            context.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
            context.fill();
        }
    }

    let descargar = document.querySelector('#descargar');
    descargar.addEventListener("click", function() {
        // Crear un elemento <a>
        let enlace = document.createElement('a');
        // El título
        enlace.download = "imagen.png";
        // Convertir la imagen a Base64 y ponerlo en el enlace
        enlace.href = canvas.toDataURL();
        // Hacer click en él
        enlace.click();
    }, false);

});