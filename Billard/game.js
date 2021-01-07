import Projectile from './projectile.js';
import calculateForce from './forceCalculation.js';
import InputHandler from './input.js';
import sound from './sound.js';
import detectCollision from './collisionDetection.js';

const GAME_STATE = {
    MENU: 0,
    START: 1,
    PAUSED: 2
}
const BALL = {
    RADIUS : 40
}

var collisionSound;
var backgroundMusic = document.createElement("audio");
backgroundMusic.src = "/assets/sounds/broadway.mp3"


export default class Game {
    constructor(width, height){
        this.gameWidth = width;
        this.gameHeight = height;
        this.midPointX = this.gameWidth /2;
        this.midPointY = this.gameHeight/2;
        this.whiteBall = new Projectile(this.midPointX-300, this.midPointY, 40, 'white', {x: 0, y: 0}, this);
        this.projectiles = [this.whiteBall];
        this.gameState = GAME_STATE.MENU;
        new InputHandler(this); 
    };

    start() {
        if (this.gameState === GAME_STATE.START) return;

        this.gameState = GAME_STATE.START;
        collisionSound = document.createElement("audio");
        collisionSound.src="/assets/sounds/hit.mp3";
        backgroundMusic.play();

        // //ball placement
        const angle = Math.atan(0.5);
        const distanceX = Math.floor(Math.cos(angle) * (2*BALL.RADIUS));
        let test1 = new Projectile(this.midPointX, this.midPointY, 40, 'orange', {x: 0, y: 0}, this);
        let test2 = new Projectile(this.midPointX+distanceX, this.midPointY+40, 40, 'orange', {x: 0, y: 0}, this);
        let test3 = new Projectile(this.midPointX+distanceX, this.midPointY-40, 40, 'orange', {x: 0, y: 0}, this);
        let test4 = new Projectile(this.midPointX+2*distanceX, this.midPointY, 40, 'orange', {x: 0, y: 0}, this);
        let test5 = new Projectile(this.midPointX+2*distanceX, this.midPointY+80, 40, 'orange', {x: 0, y: 0}, this);
        let test6 = new Projectile(this.midPointX+2*distanceX, this.midPointY-80, 40, 'orange', {x: 0, y: 0}, this);
        let test8 = new Projectile(this.midPointX+3*distanceX, this.midPointY+40, 40, 'orange', {x: 0, y: 0}, this);
        let test9 = new Projectile(this.midPointX+3*distanceX, this.midPointY-40, 40, 'orange', {x: 0, y: 0}, this);
        let test7 = new Projectile(this.midPointX+4*distanceX, this.midPointY, 40, 'orange', {x: 0, y: 0}, this);
        
        
        this.projectiles.push(test1);
        this.projectiles.push(test2);
        this.projectiles.push(test3);
        this.projectiles.push(test4);
        this.projectiles.push(test5);
        this.projectiles.push(test6);
        this.projectiles.push(test7);
        this.projectiles.push(test8);
        this.projectiles.push(test9);
        
    }
    togglePause() {
        if (this.gameState !== GAME_STATE.MENU) {
            this.gameState === GAME_STATE.PAUSED ? backgroundMusic.play() : backgroundMusic.pause();
            this.gameState = this.gameState === GAME_STATE.PAUSED ? this.gameState = GAME_STATE.START : this.gameState = GAME_STATE.PAUSED;
        }
        
    }

    draw(ctx) {
        this.projectiles.forEach( e => e.draw(ctx));

        //PAUSE display
        if (this.gameState === GAME_STATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fill();
            
            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText('Paused', this.gameWidth/2, this.gameHeight/2);
        }   
        //Menu display
        if (this.gameState === GAME_STATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fill();
            
            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText('Press spacebar to start', this.gameWidth/2, this.gameHeight/2);
            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText('Press esc to pause', this.gameWidth/2, this.gameHeight/2+50);
        }   
    }
    
    update() {
        if (this.gameState === GAME_STATE.PAUSED) {return};

        this.projectiles.forEach((e)=> {
            let otherBalls =  this.projectiles.filter(ball => ball !== e);
            otherBalls.forEach( other => {
                if (detectCollision(e, other) === true) {
                    const forceVector = calculateForce(e, other);
                    e.velocity.x += forceVector.x;
                    e.velocity.y += forceVector.y;
                    other.velocity.x -= forceVector.x;
                    other.velocity.y -= forceVector.y;    
                    //console.log(forceVector.y);
                    if (Math.abs(forceVector.x) > 0 || Math.abs(forceVector.x) > 0) 
                    {
                        collisionSound.volume = Math.min(Math.abs((forceVector.x + forceVector.y)/12), 1);
                        collisionSound.play();
                    }
                }
            });
            e.update(); 
        });
        // this.projectiles.forEach((e)=> {
            
        //     let otherBalls =  this.projectiles.filter(ball => ball !== e);
        //     otherBalls.forEach( other => {
        //         const forceVector = detectCollision(e, other);
        //         e.velocity.x += forceVector.x;
        //         e.velocity.y += forceVector.y;
        //         other.velocity.x -= forceVector.x;
        //         other.velocity.y -= forceVector.y;    
        //         //console.log(forceVector.y);
   
        //     });
        //     e.update(); 
        // });
    };

    hit (forceVector) {
        this.whiteBall.velocity.x += forceVector.x;
        this.whiteBall.velocity.y += forceVector.y;

    }
}