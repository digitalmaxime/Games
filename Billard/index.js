import Game from './game.js';

//const  canvas1 = document.getElementById('background-layer');
const  canvas2 = document.getElementById('gamePlaymat');

// const fullHeight = window.innerHeight;
// const fullWidth = 2*fullHeight; //respect sizing of actual pool table
// const fullWidth = window.innerWidth; //respect sizing of actual pool table
// const fullHeight = fullWidth/2; //respect sizing of actual pool table

// canvas2.width = fullWidth-fullWidth/5;
// canvas2.height = fullHeight-fullHeight/5;

// const ctx1 =  canvas1.getContext('2d', { alpha: false });
// const ctx1 =  canvas1.getContext('2d');
const ctx2 =  canvas2.getContext('2d');

const game = new Game( canvas2.width,  canvas2.height);

// ctx1.fillStyle = 'rgb(100, 100, 0)';
// ctx1.fillRect(0, 0,  canvas1.width,  canvas1.height); //backgroung-layer

function animate() {
    ctx2.clearRect(0, 0,  canvas2.width,  canvas2.height); // TODO
    
    ctx2.fillStyle = 'rgb(10, 200, 10)';
    ctx2.fillRect(0, 0,  canvas2.width,  canvas2.height);
    
    //drawing the holes
    // ctx2.beginPath();
    // ctx2.arc(75, 75, 50, 0, Math.PI*2, false);
    // ctx2.fillStyle= 'rgb(50, 200, 50)';
    // ctx2.fill();

    game.update();
    game.draw(ctx2);
    
    requestAnimationFrame(animate);
}

const rect = canvas2.getBoundingClientRect();
window.addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - rect.top - game.whiteBall.y, event.clientX - rect.left - game.whiteBall.x);
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    const speed = 10;
    let forceVector = {x: speed*x, y: speed*y};
    game.hit(forceVector);    
})

window.requestAnimationFrame(animate);