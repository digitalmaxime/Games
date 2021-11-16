import Game from './game.js';

const  canvas1 = document.getElementById('background-layer');
const  canvas2 = document.getElementById('gamePlaymat');

// const ctx1 =  canvas1.getContext('2d', { alpha: false });
const ctx1 =  canvas1.getContext('2d');
const ctx2 =  canvas2.getContext('2d');

const game = new Game( canvas2.width,  canvas2.height);

ctx1.fillStyle = 'rgb(100, 10, 20)';
ctx1.fillRect(0, 0,  canvas1.width,  canvas1.height); //backgroung-layer

//drawing the holes
ctx1.beginPath();
ctx1.arc(75, 75, 40, 0, Math.PI*2, false);
ctx1.fillStyle= 'rgb(20, 20, 20)';
ctx1.fill();
ctx1.beginPath();
ctx1.arc(canvas1.width - 75, 75, 40, 0, Math.PI*2, false);
ctx1.fillStyle= 'rgb(20, 20, 20)';
ctx1.fill();
ctx1.beginPath();
ctx1.arc(75, canvas1.height - 75, 40, 0, Math.PI*2, false);
ctx1.fillStyle= 'rgb(20, 20, 20)';
ctx1.fill();
ctx1.beginPath();
ctx1.arc(canvas1.width - 75, canvas1.height - 75, 40, 0, Math.PI*2, false);
ctx1.fillStyle= 'rgb(20, 20, 20)';
ctx1.fill();



function animate() {
    ctx2.clearRect(35, 35,  canvas2.width-70,  canvas2.height-70); // TODO
    
    
    
    // ctx2.fillStyle = 'rgb(10, 100, 20)';
    // ctx2.fillRect(0, 0, canvas1.width-130, canvas1.height-130); //borders
    //ctx2.fillStyle = 'rgb(10, 200, 10)';
    //ctx2.fillRect(35, 35,  canvas2.width-70,  canvas2.height-70); //playmate
    
    ctx2.fillStyle = 'rgb(20, 150, 20)';
    ctx2.fillRect(0, 0,  canvas2.width,  canvas2.height); //playmate
    
    //drawing 1/4 holes
    ctx2.beginPath();
    ctx2.arc(10, 10, 40, 0, Math.PI*2, false);
    ctx2.fillStyle= 'rgb(20, 20, 20)';
    ctx2.fill();
    ctx2.closePath();

    
    //drawing trapazoid
    ctx2.beginPath();
    ctx2.moveTo(0, 48);
    ctx2.save()
    ctx2.shadowBlur = 6;
    ctx2.shadowOffsetX = 6;
    ctx2.shadowOffsetY = 6;
    ctx2.shadowColor = 'rgb(21, 81, 21)';
    ctx2.lineTo(30,78);
    ctx2.lineTo(30,canvas2.height-78);
    ctx2.lineTo(0,canvas2.height-48);
    //ctx2.stroke();
    //ctx2.lineTo(0,45);
    //ctx2.closePath();
    //ctx2.stroke();
    ctx2.fillStyle = 'rgb(40, 130, 40)';
    ctx2.fill();
    ctx2.restore();

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
    console.log(game.balls);
})

window.requestAnimationFrame(animate);