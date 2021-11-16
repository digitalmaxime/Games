import Game from './game.js';

const  canvas1 = document.getElementById('background-layer');
const  canvas2 = document.getElementById('gamePlaymat');
const BORDER = 35;
// const ctx1 =  canvas1.getContext('2d', { alpha: false });
const ctx1 =  canvas1.getContext('2d');
const ctx2 =  canvas2.getContext('2d');

const game = new Game( canvas2.width,  canvas2.height);

ctx1.fillStyle = 'rgb(100, 10, 20)';
ctx1.fillRect(0, 0,  canvas1.width,  canvas1.height); //backgroung-layer

function animate() {
    ctx2.clearRect(BORDER, BORDER,  canvas2.width-(2*BORDER),  canvas2.height-(2*BORDER)); // TODO
    
    
    
    ctx2.fillStyle = 'rgb(20, 150, 20)';
    ctx2.fillRect(0, 0,  canvas2.width,  canvas2.height); //playmat
    
    //45 degree line //topleft
    ctx2.beginPath();
    ctx2.moveTo(0,48);
    ctx2.lineTo(30,78);
    ctx2.stroke();
    //another 45 degree line
    ctx2.beginPath();
    ctx2.moveTo(48,0);
    ctx2.lineTo(78, 30);
    ctx2.stroke();

    //-45 degree line //bottom left
    ctx2.beginPath();
    ctx2.moveTo(0,canvas2.height-48);
    ctx2.lineTo(30, canvas2.height-78);
    ctx2.stroke();
    //-45 degree line
    ctx2.beginPath();
    ctx2.moveTo(48,canvas2.height);
    ctx2.lineTo(78, canvas2.height-30);
    ctx2.stroke();
    
    //45 degree line //top right
    ctx2.beginPath();
    ctx2.moveTo(canvas2.width - 48, 0);
    ctx2.lineTo(canvas2.height - 48, canvas2.height);
    ctx2.stroke();
    //another 45 degree line
    ctx2.beginPath();
    ctx2.moveTo(canvas2.width, 48);
    ctx2.lineTo(canvas2.height, canvas2.height + 48);
    ctx2.stroke();

    //-45 degree line //bottom right
    ctx2.beginPath();
    ctx2.moveTo(canvas2.width - 48, canvas2.height);
    ctx2.lineTo(canvas2.height - 48, 0);
    ctx2.stroke();
    //-45 degree line
    ctx2.beginPath();
    ctx2.moveTo(canvas2.width,canvas2.height - 48);
    ctx2.lineTo(canvas2.height, -48);
    ctx2.stroke();

    game.update();
    game.draw(ctx2);
    
    requestAnimationFrame(animate);
}

const rect = canvas2.getBoundingClientRect();
window.addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - rect.top - game.whiteBall.y, event.clientX - rect.left - game.whiteBall.x);
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    const speed = 7;
    let forceVector = {x: speed*x, y: speed*y};
    game.hit(forceVector);    
    console.log(game.balls);
})

window.requestAnimationFrame(animate);