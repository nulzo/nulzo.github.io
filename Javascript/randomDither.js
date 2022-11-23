let image, canvas, context, time;
let white = 255;
let black = 0;
let mynum;

const threshold = () => {
    console.log(`X: ${image.width}, Y: ${image.height}, Image: ${image}`);

    // Set canvas width and height
    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, 0, 0, image.width, image.height);

    const frame = context.getImageData(0, 0, image.width, image.height);

    // measure time

    for (let i = 0; i < frame.data.length; i += 4) {
        mynum = (Math.random() * 255);
        const r = frame.data[i + 0]; // r
        const g = frame.data[i + 1]; // g
        const b = frame.data[i + 2]; // b

        const avg = Math.floor((r + g + b) / 3);

        if(mynum < avg){
            frame.data[i] = white; // r
            frame.data[i + 1] = white; // g
            frame.data[i + 2] = white; // b
        }
        else{
            frame.data[i] = black; // r
            frame.data[i + 1] = black; // g
            frame.data[i + 2] = black; // b
        }
    }

    context.putImageData(frame, 0, 0);
}

window.onload = refreshBlock;

function refreshBlock()
{
    time = document.getElementById('time');
    image = document.getElementById('input');
    canvas = document.getElementById('output');
    context = canvas.getContext('2d');
    image.onload = threshold();
    //setInterval("refreshBlock();",10);
}