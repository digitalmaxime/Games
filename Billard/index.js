import Game from './game.js';


// const  canvas1 = document.getElementById('gameBorder');
const  canvas2 = document.getElementById('gamePlaymat');

// const fullHeight = window.innerHeight;
// const fullWidth = 2*fullHeight; //respect sizing of actual pool table
const fullWidth = window.innerWidth; //respect sizing of actual pool table
const fullHeight = fullWidth/2; //respect sizing of actual pool table

// canvas1.width = fullWidth;
// canvas1.height = fullHeight;

canvas2.width = fullWidth-fullWidth/5;
canvas2.height = fullHeight-fullHeight/5;

// const ctx1 =  canvas1.getContext('2d', { alpha: false });
const ctx2 =  canvas2.getContext('2d', { alpha: false });

const game = new Game( canvas2.width,  canvas2.height);

// ctx1.fillStyle = 'rgb(240, 0, 0)';
// ctx1.fillRect(0, 0,  canvas1.width,  canvas1.height);//backgroung border

function animate() {
    ctx2.clearRect(0, 0,  canvas2.width,  canvas2.height); // TODO
    
    //ctx.beginPath();
    ctx2.fillStyle = 'rgb(45, 195, 45)';
    ctx2.fillRect(0, 0,  canvas2.width,  canvas2.height);
    // ctx2.fillStyle = 'rgba(50, 200, 50, 0.5)';
    // ctx2.fillRect(25, 25,  canvas2.width,  canvas2.height);
    
    game.update();
    game.draw(ctx2);
    
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