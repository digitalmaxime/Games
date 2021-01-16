const HOLESIZE = 60;
const BORDER = 35;
export default class Ball {
    constructor(x, y, radius, color, velocity, game) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.game = game;
        this.isRemoved = false;
        this.isisRollingIn = false;

    }
    markForDeletion() {
        this.isRemoved = true;
        console.log("marked!");
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle= this.color;
        ctx.fill();
    }
    update() {
        //check if ball is aligned to sink
        if (((this.y < HOLESIZE || this.y > this.game.gameHeight - HOLESIZE) &&
            (this.x < HOLESIZE || this.x > this.game.gameWidth - HOLESIZE))) 
        {
            this.isisRollingIn = true;
        }

        if (!this.isisRollingIn) {
            //check collision with right and left walls
            if (
                (Math.round(this.x+this.radius - this.game.gameWidth + BORDER)*10 >= 10  || 
                Math.round(this.x-this.radius - BORDER)*10 <= 10 )
                ) {
                this.velocity.x *= -1;
            }  
            //   collision with top and bottom walls
            else if (
                (Math.round(this.y - this.radius - BORDER)*10 <= 10 ) || 
                Math.round(this.y + this.radius - (this.game.gameHeight - BORDER))*10 >= 0 ){
                
                this.velocity.y *= -1;
            }
            // if ball is on its way to sunk
        } else {
            //check if ball if finished
            if (this.y < 0 || this.y - this.game.gameHeight > 0  &&
                this.x < 0 || this.x - this.game.gameWidth > 0 ) 
            {
                this.markForDeletion();
                return;
            }
        }
        
        //move
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        //friction
        this.velocity.y *= 0.99;
        this.velocity.x *= 0.99;
        

        //stop ball
        if (Math.abs(this.velocity.x) < 0.25) this.velocity.x = 0;
        if (Math.abs(this.velocity.y) < 0.25) this.velocity.y = 0;
              
    }
}