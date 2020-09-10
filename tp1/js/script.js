$(document).ready(function() {

    //get component references
    let canvas = document.querySelector('#canvas');
    let input = document.querySelector('.input1');
    //paint references
    let downFlag = false;
    let color = document.querySelector('#color');
    //filters references
    document.querySelector('#gris').click(filtroGris);

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
            //image.crossOrigin = 'Anonymous';

            image.src = content;

            image.onload = function() {

                let imageAspectRatio = (1.0 * this.height) / this.width;
                let imageScaledWidth = canvas.width;
                let imageScaledHeight = canvas.width * imageAspectRatio;
                let maxWidth = canvas.width;
                let maxHeight = canvas.height;

                /* if (this.width > maxWidth) {
                     AspectRatio = (1.0 * maxWidth) / this.width;
                     imageScaledWidth = maxWidth;
                     imageScaledHeight = this.height * AspectRatio;
                 }
                 if (this.height > maxHeight) {
                     AspectRatio = (1.0 * maxHeight) / this.height;
                     imageScaledWidth = this.width * AspectRatio;
                     imageScaledHeight = maxHeight;
                 }*/

                // draw image on canvas
                context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

                // get imageData from content of canvas
                let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

                // modify imageData
                for (let j = 0; j < imageData.height; j++) {
                    for (let i = 0; i < imageData.width; i++) {
                        if (i % 2 == 0) {
                            let index = (i + imageData.width * j) * 4;
                            imageData.data[index + 0] = 0;
                            imageData.data[index + 1] = 0;
                            imageData.data[index + 2] = 0;
                        }
                    }
                }

                // draw the modified image
                context.putImageData(imageData, 0, 0);
            }
        }
    }

    function filtroGris() {
        let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
        for (let x = 0; x < image.width; x++) {
            for (let y = 0; y < image.height; y++) {
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

    //todo lo del paint

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