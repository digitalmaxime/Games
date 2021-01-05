export default class Projectile {
    constructor(x, y, radius, color, velocity, game) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        //this.speed = 3;
        this.game = game;

    }
    draw(ctx){
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle= this.color;
        ctx.fill();
    }
    update() {
        //check collision with walls
        if (this.x+this.radius >= this.game.gameWidth || this.x-this.radius <= 0) {
            this.velocity.x *= -1;
        }  
        if (this.y - this.radius <= 0 || this.y + this.radius >= this.game.gameHeight) {
            this.velocity.y *= -1;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // downward vertical acceleration 
        // if ((this.y + this.radius) < this.game.gameHeight
        //     && this.y - this.radius > 0) 
        //     {this.velocity.y += 0.2;}

        //friction
        this.velocity.y *= 0.99;
        this.velocity.x *= 0.99;

        //stop ball
        if (Math.abs(this.velocity.x) < 0.25) this.velocity.x = 0;
        if (Math.abs(this.velocity.y) < 0.25) this.velocity.y = 0;
              
    }
}