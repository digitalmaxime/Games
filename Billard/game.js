import Velocity from './velocity.js';
import Projectile from './projectile.js';
import detectCollision from './collisionDetection2.js';
import InputHandler from './input.js';

const GAME_STATE = {
    START: 1,
    PAUSED: 2
}

export default class Game {
    constructor(width, height){
        this.gameWidth = width;
        this.gameHeight = height;
        this.midPointX = this.gameWidth /2;
        this.midPointY = this.gameHeight/2;
        this.projectiles = [];
        this.gameState = GAME_STATE.START;
        new InputHandler(this); 
    };

    start() {
        let test = new Projectile(this.midPointX, 50, 40, 'orange', new Velocity(-0.5, 2), this);
        // let test2 = new Projectile(this.midPointX+150, this.midPointY, 40, 'orange', new Velocity(1, 0), this);
        // let test3 = new Projectile(this.midPointX+50, this.midPointY, 40, 'orange', new Velocity(0, 0), this);
        let test4 = new Projectile(this.midPointX, 300, 40, 'orange', new Velocity(0.5, -3), this);
        this.projectiles.push(test);
        // this.projectiles.push(test2);
        // this.projectiles.push(test3);
        this.projectiles.push(test4);
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
                //e.velocity = detectCollision(e, other);
                const forceVector = detectCollision(e, other);
                e.velocity.x += forceVector.x;
                e.velocity.y += forceVector.y;
                other.velocity.x -= forceVector.x;
                other.velocity.y -= forceVector.y;
                
            });
            e.update(); 
        });
        
    };



}