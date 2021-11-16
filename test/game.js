import  Ball from './ball.js';
// import calculateForce from './forceCalculation.js';
import detectLineCollision from './LineCollisionDetection.js';
import detectCornerCollision from './CornerCollisionDetection.js';

const BALL = {
    RADIUS : 40
}
const LINE_POSITION = {
    TOPLEFT : 0,
    TOPRIGHT : 1,
    BOTTOMLEFT : 2,
    BOTTOMRIGHT : 3
}

export default class Game {
    constructor(width, height){
        this.gameWidth = width;
        this.gameHeight = height;
        this.whiteBall = new Ball(300, 300, 30, 'white', {x: 0, y: 0}, this);
        this. balls = [this.whiteBall];
        this.currentLevel = 1;
    };

    draw(ctx) {
        this. balls.forEach( (e)=> {
            e.draw(ctx)
        });
    }
    
    update() {
        this.balls.forEach((ball)=> {
            if (ball.isRemoved) {
                this.balls.splice(ball, 1);
            }
            if (ball.isRollingIn) {
                detectCornerCollision(ball, ball.corner);
                // detectLineCollision(e, Math.PI/4, 48, 0, LINE_POSITION.TOPRIGHT); // with line 1
                // detectLineCollision(e, Math.PI/4, 0, 48, LINE_POSITION.BOTTOMLEFT); //with line 2
            }
            // detectLineCollision(e, -Math.PI/4, 0, 470, LINE_POSITION.TOPLEFT); //with line 3
            // detectLineCollision(e, -Math.PI/4, 200, 470, LINE_POSITION.BOTTOMRIGHT); // with line 4
            
            ball.update(); 
        });
    };

    hit (forceVector) {
        this.whiteBall.velocity.x += forceVector.x;
        this.whiteBall.velocity.y += forceVector.y;
    }
}