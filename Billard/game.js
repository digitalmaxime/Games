import Projectile from './projectile.js';
import detectCollision from './collisionDetection2.js';
import InputHandler from './input.js';

const GAME_STATE = {
    START: 1,
    PAUSED: 2
}
const BALL = {
    RADIUS : 40
}

export default class Game {
    constructor(width, height){
        this.gameWidth = width;
        this.gameHeight = height;
        this.midPointX = this.gameWidth /2;
        this.midPointY = this.gameHeight/2;
        this.whiteBall = new Projectile(this.midPointX-300, this.midPointY, 40, 'white', {x: 0, y: 0}, this);
        this.projectiles = [this.whiteBall];
        this.gameState = GAME_STATE.START;
        new InputHandler(this); 
    };

    start() {
        //ball placement
        const angle = Math.atan(0.5);
        console.log('Angle : ' + angle);
        const distanceX = Math.floor(Math.cos(angle) * (2*BALL.RADIUS));
        console.log('distance : ' + distanceX);
        let test1 = new Projectile(this.midPointX, this.midPointY, 40, 'orange', {x: 0, y: 0}, this);
        let test2 = new Projectile(this.midPointX+distanceX, this.midPointY+40, 40, 'orange', {x: 0, y: 0}, this);
        let test3 = new Projectile(this.midPointX+distanceX, this.midPointY-40, 40, 'orange', {x: 0, y: 0}, this);
        let test4 = new Projectile(this.midPointX+2*distanceX, this.midPointY, 40, 'orange', {x: 0, y: 0}, this);
        let test5 = new Projectile(this.midPointX+2*distanceX, this.midPointY+80, 40, 'orange', {x: 0, y: 0}, this);
        let test6 = new Projectile(this.midPointX+2*distanceX, this.midPointY-80, 40, 'orange', {x: 0, y: 0}, this);
        let test7 = new Projectile(this.midPointX+3*distanceX, this.midPointY, 40, 'orange', {x: 0, y: 0}, this);
        
        
        this.projectiles.push(test1);
        this.projectiles.push(test2);
        this.projectiles.push(test3);
        this.projectiles.push(test4);
        this.projectiles.push(test5);
        this.projectiles.push(test6);
        this.projectiles.push(test7);
        
    }
    togglePause() {
        this.gameState = this.gameState === GAME_STATE.PAUSED ? this.gameState = GAME_STATE.START : this.gameState = GAME_STATE.PAUSED;
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
    }
    
    update() {
        if (this.gameState === GAME_STATE.PAUSED) {return};

        this.projectiles.forEach((e)=> {
            
            let otherBalls =  this.projectiles.filter(ball => ball !== e);
            otherBalls.forEach( other => {
                const forceVector = detectCollision(e, other);
                e.velocity.x += forceVector.x;
                e.velocity.y += forceVector.y;
                other.velocity.x -= forceVector.x;
                other.velocity.y -= forceVector.y;    
                //console.log(forceVector.y);
            });
            e.update(); 
        });
    };

    hit (forceVector) {
        this.whiteBall.velocity.x += forceVector.x;
        this.whiteBall.velocity.y += forceVector.y;
    }
}