let image, canvas, context, time;

const threshold = () => {

    // Set canvas width and height
    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, 0, 0, image.width, image.height);

    const frame = context.getImageData(0, 0, image.width, image.height);
    let w = image.width
    let mynum;
    let white = 255;

    for (let i = 0; i < frame.data.length; i += 4) {
        const r = frame.data[i]; // r
        const g = frame.data[i + 1]; // g
        const b = frame.data[i + 2]; // b

        const avg = Math.floor((r + g + b) / 3);


        let newPixel = avg < 100 ? 0 : 255;
        let err = Math.floor((frame[i] - newPixel) / 23);
        frame.data[i] = newPixel;
        frame.data[i + 4] += err * 7;
        frame.data[i + 4 * w - 4] += err * 3;
        frame.data[i + 4 * w] += err * 5;
        frame.data[i + 4 * w + 4] += err;
        // Set g and b values equal to r (effectively greyscales the image fully)
        //frame.data[i + 1] = frame.data[i + 2] = frame.data[i];

    }
    for (let i = 0; i < frame.data.length; i += 4) {
        mynum = (Math.random() * 255);
        const r = frame.data[i + 0]; // r
        const g = frame.data[i + 1]; // g
        const b = frame.data[i + 2]; // b

        const avg = Math.floor((r + g + b) / 3);

        if(mynum < avg - 50){
            frame.data[i] = white; // r
            frame.data[i + 1] = white; // g
            frame.data[i + 2] = white; // b
        }
    }
    context.putImageData(frame, 0, 0);
}

window.addEventListener('load', () => {
    time = document.getElementById('time');
    image = document.getElementById('input');
    canvas = document.getElementById('output');

    // Create canvas context
    context = canvas.getContext('2d');

    image.onload = threshold();
});