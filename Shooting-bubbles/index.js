import detectCollision from './collisionDetection.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-20;
const scoreEl = document.getElementById('scoreEl');
const startBtn = document.getElementById('startGameBtn');
const modalEl = document.getElementsByClassName('modal')[0];
const endScore = document.getElementById('endScore');

const c = canvas.getContext('2d');

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
        this.draw();
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }
}


class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.speed = 1;
        
    }
    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle= this.color;
        c.fill();
    }
    update() {
        this.draw();
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }
}

function spawnEnemies() {
    setInterval(
        ()=>{
            const radius = Math.random() * (40 - 10) + 10;
            let x;
            let y;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
                y = Math.random() * canvas.height;
            } else {
                x = Math.random()* canvas.width;
                y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
            }
            const angle = Math.atan2(player.y-y, player.x-x);
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
            const color = `rgb(${Math.random()*(250-50)+50}, ${Math.random()*(250-50)+50}, ${Math.random()*(250-50)+50})`
            enemies.push(new Enemy(x, y, radius, color, velocity))}, 
        1000
    );
}

const x = canvas.width /2;
const y = canvas.height/2;

let player = new Player(x, y, 20, 'white');
let projectiles = [];
let enemies = [];

function init() {
    player = new Player(x, y, 20, 'white');
    projectiles = [];
    enemies = [];
    score = 0;
    scoreEl.innerHTML = score;
    endScore.innerHTML = score;
}

let animationId;
let score = 0;
function animate() {
    animationId = requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.4)';
    c.fillRect(0, 0, canvas.width, canvas.height); 
    player.draw();
    projectiles.forEach((projectile, index)=> {
        projectile.update(); 
        if (
            // delete projectile from array once its out of the screen 
            // to optimize calculation
            projectile.x < 0 ||
            projectile.x > canvas.width ||
            projectile.y < 0 ||
            projectile.y > canvas.height
            ) {
            projectiles.splice(index, 1);
        }
    })
    enemies.forEach((enemy, eIdx)=> {
        enemy.update(); 
        
        //check collision with player game end
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId);
            endScore.innerHTML = score;
            modalEl.style.display = 'block'
        }
            //check collision between projectile and enemies
        projectiles.forEach( (projectile, pIdx) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (dist - projectile.radius - enemy.radius < 1) {
                if (enemy.radius - 20 > 10) {
                    gsap.to(enemy, {
                        radius: enemy.radius -= 20,
                    })
                    setTimeout(()=> {
                        projectiles.splice(pIdx, 1);
                    }, 0)
                } else {
                    setTimeout(()=> {
                        enemies.splice(eIdx, 1);
                        projectiles.splice(pIdx, 1);
                    }, 0)
                    score += 1;
                    scoreEl.innerHTML = score;

                }
                
            }
        })

    })
}

window.addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width/2);
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    let velocity = new Velocity(x, y);
    const projectile = new Projectile(canvas.width/2, canvas.height/2, 10, 'white', velocity);
    projectiles.push(projectile);
    console.log(projectiles)
})

startBtn.addEventListener('click', (event)=> {
    score = 0;
    init();
    console.log("yea");
    modalEl.style.display=  'none'
    animate();
    spawnEnemies();
})


