import  Ball from './ball.js';
// import calculateForce from './forceCalculation.js';
import detectLineCollision from './LineCollisionDetection.js';

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
        this.whiteBall = new Ball(300, 300, 40, 'white', {x: 0, y: 0}, this);
        this. balls = [this.whiteBall];
        this.currentLevel = 1;
    };

    draw(ctx) {
        this. balls.forEach( (e)=> {
            e.draw(ctx)
        });
    }
    
    update() {

        this. balls.forEach((e)=> {
            //detectLineCollision(e, Math.PI/4, -20, 0, LINE_POSITION.BOTTOMLEFT); //with line 1
            //detectLineCollision(e, Math.PI/4, 200, 0, LINE_POSITION.TOPRIGHT); // with line 2
            detectLineCollision(e, -Math.PI/4, 0, 470, LINE_POSITION.TOPLEFT); //with line 1
            detectLineCollision(e, -Math.PI/4, 200, 470, LINE_POSITION.BOTTOMRIGHT); // with line 2
            
            e.update(); 
        });
    };

    hit (forceVector) {
        this.whiteBall.velocity.x += forceVector.x;
        this.whiteBall.velocity.y += forceVector.y;

    }
}