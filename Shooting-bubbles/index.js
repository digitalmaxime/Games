import detectCollision from './collisionDetection.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-20;


const c = canvas.getContext('2d');
console.log(c);

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle= this.color;
        c.fill();
    }
}
class Velocity {  
    constructor(x, y) {
        this.x = x,
        this.y = y;
    }
}
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.speed = 10;
        
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle= this.color;
        c.fill();
    }
    update() {
        if (detectCollision(this, canvas) === 'horizontal') {
            this.velocity.x *= -1;
        } else if (detectCollision(this, canvas) === 'vertical') {
            this.velocity.y *= -1;
        }
        this.draw();
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }
}

const x = canvas.width /2;
const y = canvas.height/2;
const player = new Player(x, y, 50, 'blue');

const projectiles = [];

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height); 
    player.draw();
    projectiles.forEach((e)=> {
        e.update(); 
    })
    requestAnimationFrame(animate);
}

window.addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width/2);
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    let velocity = new Velocity(x, y);
    const projectile = new Projectile(canvas.width/2, canvas.height/2, 10, 'red', velocity);
    projectiles.push(projectile);
    
})

animate();