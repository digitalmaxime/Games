import Game from './game.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-20;
const ctx = canvas.getContext('2d');

const game = new Game(canvas.width, canvas.height);
game.start();


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.beginPath();
    ctx.fillStyle = 'rgba(50, 200, 50, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
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