let image, canvas, context, time;
let white = 255;
let mynum;

const threshold = () => {

    // Set canvas width and height
    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, 0, 0, image.width, image.height);

    const frame = context.getImageData(0, 0, image.width, image.height);

    // measure time

    for (let i = 0; i < frame.data.length; i += 4) {
        mynum = (Math.random() * 255);
        const r = frame.data[i]; // r
        const g = frame.data[i + 1]; // g
        const b = frame.data[i + 2]; // b

        const avg = Math.floor((r + g + b) / 3);

        let iR = 255 - r;
        let iG = 255 - g;
        let iB = 255 - b;

        if(mynum > avg){
            frame.data[i] = white; // r
            frame.data[i + 1] = white; // g
            frame.data[i + 2] = white; // b
        }
        else{
            frame.data[i] = iR;
            frame.data[i + 1] = iG;
            frame.data[i + 2] = iB;
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