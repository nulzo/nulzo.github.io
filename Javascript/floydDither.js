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

        // frame.data[i] = avg; // r
        // frame.data[i + 1] = avg; // g
        // frame.data[i + 2] = avg; // b

        let oldPixel = frame.data[i];
        let newPixel = avg < 90 ? 0 : 255;
        let err = oldPixel - newPixel;
        frame.data[i] = newPixel;
        frame.data[i + 4] += err * (7/16);
        frame.data[i + 4 * w + 4] += err * (3/16);
        frame.data[i + 4 * w] += err * (5/16);
        frame.data[i + 4 * w - 4] += err * (1/16);
        // Set g and b values equal to r (effectively greyscales the image fully)
        frame.data[i + 1] = frame.data[i + 2] = frame.data[i];

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