let image, canvas, context, time;

const threshold = () => {

    // Set canvas width and height
    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, 0, 0, image.width, image.height);

    const frame = context.getImageData(0, 0, image.width, image.height);
    let w = image.width

    for (let i = 0; i < frame.data.length; i += 4) {
        const r = frame.data[i]; // r
        const g = frame.data[i + 1]; // g
        const b = frame.data[i + 2]; // b

        const avg = Math.floor((r + g + b) / 3);

        frame.data[i] = 0; // r
        frame.data[i + 1] = 0; // g
        frame.data[i + 2] = 0; // b

        let oldPixel = frame.data[i];
        let newPixel = avg < 120 ? 0 : 255;
        let err = oldPixel - newPixel;

        frame.data[i] = newPixel;
        frame.data[i + 4] += err * (7/16);
        frame.data[i + 4 * w + 4] += err * (3/16);
        frame.data[i + 4 * w] += err * (5/16);
        frame.data[i + 4 * w - 4] += err * (1/16);
        //
        frame.data[i + 1] = 5;
        frame.data[i + 2] = 150;


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