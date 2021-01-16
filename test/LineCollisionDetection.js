import calculateForce from '/forceCalculation.js';

function addForceToBall (ball, angle, linePosition) {
    const velocity = calculateForce(ball, angle, linePosition);
    ball.velocity.x += 2*velocity.x;
    ball.velocity.y += 2*velocity.y;
}

export default function detectLineCollision(ball, angle, xorigin, yorigin, linePosition) {    
    const cos = Math.cos(angle);
    if (angle < 0) {
        switch(linePosition) {
            case 0: //topLeft
                if (          
                    cos*ball.radius + yorigin - ball.x  > (ball.y - cos*ball.radius - xorigin)
                ){
                    addForceToBall(ball, angle, linePosition);
                }  else {
                    return;
                }
                break;
            case 3: //bottom right 
            if ( (ball.y + cos*ball.radius) > ( yorigin + xorigin - (ball.x + cos*ball.radius)) )  
            {
                addForceToBall(ball, angle, linePosition);
            }  else {
                return;
            }
                break;
        }
        
    } else { //angle > 0
        switch(linePosition) {
   
            case 1: //topRight
              if (
                Math.abs(Math.round( ( (cos * ball.radius) + ball.x - xorigin) / ( -cos * ball.radius + ball.y - yorigin) * 100 )) >= 100  
                ) {
                    const velocity = calculateForce(ball, angle, linePosition);
                    ball.velocity.x += 2*velocity.x;
                    ball.velocity.y += 2*velocity.y;
                }  else {
                    return;
                }
              break;

            case 2: //bottomLeft
              if (
                Math.abs(Math.round( ( -(cos * ball.radius) + ball.x - xorigin) / ( cos * ball.radius + ball.y - yorigin) * 100 )) <= 100  
                ) {
                    const velocity = calculateForce(ball, angle, linePosition);
                    ball.velocity.x += 2*velocity.x;
                    ball.velocity.y += 2*velocity.y;
                }  else {
                    return;
                }
              break;

            default:
              // code block
        }
    }
}