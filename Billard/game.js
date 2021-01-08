import  Ball from './ball.js';
import calculateForce from './forceCalculation.js';
import InputHandler from './input.js';
import detectCollision from './collisionDetection.js';
import {setupLevel} from '/level.js';

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
        this.whiteBall = new Ball(this.gameWidth /2-300, this.gameHeight/2, 40, 'white', {x: 0, y: 0}, this);
        this. balls = [];
        this.gameState = GAME_STATE.MENU;
        this.currentLevel = 1;
        new InputHandler(this); 
    };

    start() {
        if (this.gameState !== GAME_STATE.MENU) {return};

        //setup music
        collisionSound = document.createElement("audio");
        collisionSound.src="/assets/sounds/hit.mp3";
        backgroundMusic.play();

        //ball placement
        let otherBalls = setupLevel(this.currentLevel, 40, this);
        this.balls = [this.whiteBall, ...otherBalls];
        console.log(this.balls);
        
    }
    togglePause() {
        this.gameState === GAME_STATE.START ? backgroundMusic.pause() : backgroundMusic.play();
        this.gameState === GAME_STATE.START ? this.gameState = GAME_STATE.PAUSED : this.gameState = GAME_STATE.START;
    }

    showMenu() {
        if (this.gameState !== GAME_STATE.MENU) {
            this.gameState = GAME_STATE.MENU;
        }
    }

    draw(ctx) {
        this. balls.forEach( e => e.draw(ctx));

        //PAUSE display
        if (this.gameState === GAME_STATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(10, 10, 10, 0.3)";
            ctx.fill();
            
            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText('Paused, press spacebar to continue', this.gameWidth/2, this.gameHeight/2);
        }   
        //Menu display
        if (this.gameState === GAME_STATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fill();
            
            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText('Game level 1', this.gameWidth/2, this.gameHeight/2);
            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText('Press spacebar to start and to pause', this.gameWidth/2, this.gameHeight/2+ 50);
        }   
    }
    
    update() {
        if (this.gameState === GAME_STATE.PAUSED ||
            this.gameState === GAME_STATE.MENU) {return};

        this. balls.forEach((e)=> {
            let otherBalls =  this. balls.filter(ball => ball !== e);
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
                        collisionSound.volume = Math.min(Math.abs((forceVector.x + forceVector.y)/10), 1);
                        collisionSound.play();
                    }
                }
            });
            e.update(); 
        });
        // this. balls.forEach((e)=> {
            
        //     let otherBalls =  this. balls.filter(ball => ball !== e);
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