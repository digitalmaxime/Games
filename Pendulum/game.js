import Projectile from './projectile.js';
import detectCollision from './collisionDetection.js';
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
        this.projectiles = [];
        this.gameState = GAME_STATE.START;
        new InputHandler(this); 
    };

    start() {
        //ball placement
        let test1 = new Projectile(this.gameWidth/2, this.gameHeight/2, 40, 'orange', {x: 0, y: 0}, {x:100, y:100}, 1.4, 0.05, this);
        let test2 = new Projectile(this.gameWidth/2, this.gameHeight/2, 40, 'orange', {x: 0, y: 0}, {x:250, y:250}, 1.4, 0.02, this);
        let test3 = new Projectile(this.gameWidth/2, this.gameHeight/2, 40, 'orange', {x: 0, y: 0}, {x:350, y:100}, 1.4, 0.02, this);
        //let test2 = new Projectile(this.midPointX-300, this.midPointY+40, 40, 'orange', {x: 1, y: 1}, this);
       
        this.projectiles.push(test1);
        this.projectiles.push(test2);
        this.projectiles.push(test3);
        
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
                if(detectCollision(e, other)) {
                    e.orientationClockWise = !e.orientationClockWise;
                }
            });
            e.update(); 
        });
    };
}