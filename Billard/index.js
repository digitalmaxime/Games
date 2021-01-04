import Game from './game.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-20;
const ctx = canvas.getContext('2d');
const game = new Game(canvas.width, canvas.height);

game.start();


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
}

// window.addEventListener('click', (event) => {
//     const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width/2);
//     const x = Math.cos(angle);
//     const y = Math.sin(angle);
//     let velocity = new Velocity(x, y);
//     const projectile = new Projectile(player.x+1.5*x*player.radius, player.y+1.5*y*player.radius, 30, 'red', velocity);
//     projectiles.push(projectile);
    
// })

animate();