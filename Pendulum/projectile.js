export default class Projectile {
    constructor(
        x, y, radius, color, velocity, rotationCenter, angle, angleSpeed, game
        ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.angleSpeed = angleSpeed;
        this.game = game;
        this.rotationCenter = rotationCenter;
        this.angle = angle;
        this.orientationClockWise = true;
    }
    draw(ctx){
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle= this.color;
        ctx.fill();

        // Create gradient
        var grd = ctx.createRadialGradient(this.x, this.y, this.radius-30, this.x, this.y, this.radius);
        grd.addColorStop(0, this.color);
        grd.addColorStop(1, "white");

        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.moveTo(this.rotationCenter.x, this.rotationCenter.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
    update() {

         //check collision with walls
         if (this.x+this.radius >= this.game.gameWidth || this.x-this.radius <= 0) {
            this.orientationClockWise = !this.orientationClockWise;
        }  
        if (this.y - this.radius <= 0 || this.y + this.radius >= this.game.gameHeight) {
            this.orientationClockWise = !this.orientationClockWise;
        }
        
        if (this.orientationClockWise){
            this.angle += this.angleSpeed;
        } else {
            this.angle -= this.angleSpeed;
        }

        this.x = this.rotationCenter.x +  100 * Math.cos(this.angle);
        this.y = this.rotationCenter.y +  100 * Math.sin(this.angle);
        //console.log(Math.sqrt((this.x-this.rotationCenter.x)**2 + (this.y - this.rotationCenter.y)**2));
        console.log(this.angle);


        //this.x += this.velocity.x;
        //this.y += this.velocity.y;

        // downward vertical acceleration 
        // if ((this.y + this.radius) < this.game.gameHeight
        //     && this.y - this.radius > 0) 
        //     {this.velocity.y += 0.2;}

        //friction
        // this.velocity.y *= 0.99;
        // this.velocity.x *= 0.99;

        //stop ball
        // if (Math.abs(this.velocity.x) < 0.25) this.velocity.x = 0;
        // if (Math.abs(this.velocity.y) < 0.25) this.velocity.y = 0;
              
    }
}