import Game from './game.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-20;
const ctx = canvas.getContext('2d');

const game = new Game(canvas.width, canvas.height);
game.start();

let aime = document.getElementById("aime");

function drawImageRot(img,x,y,width,height,deg){
    // Store the current context state (i.e. rotation, translation etc..)
    ctx.save()

    //Convert degrees to radian 
    var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    // Restore canvas state as saved from above
    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.beginPath();
    ctx.fillStyle = 'rgba(50, 200, 50, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);

    //experimentation avec rotation
    //ctx.drawImage(aime, 100, 100);
    //drawImageRot(aime, 100, 100, 70, 70, 20);
    
    requestAnimationFrame(animate);
}

window.addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - game.whiteBall.y, event.clientX - game.whiteBall.x);
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    const speed = 10;
    let forceVector = {x: speed*x, y: speed*y};
    game.hit(forceVector);    
})

window.requestAnimationFrame(animate);