export default function calculateForce(ball, angle, linePosition) {    
    //declare the force Vector to be applied on the ball
    let forceVector = {x:0, y: 0};
    let radiusVector = {x:0, y: 0};
    
    if (angle > 0) {
        if (linePosition === 2) {
            radiusVector = {x: Math.sin(angle), y:  -(Math.cos(angle))};
        } else if (linePosition === 1) {
            radiusVector = {x: -Math.sin(angle), y:  (Math.cos(angle))};
        }
    } else { // angle < 0
        if (linePosition === 0) {
            radiusVector = {x: -Math.sin(angle), y:  (Math.cos(angle))};
        } else if (linePosition === 3) {
            radiusVector = {x: Math.sin(angle), y:  -(Math.cos(angle))};
        }
    }

    const dotProduct = (radiusVector.x * ball.velocity.x ) + ( radiusVector.y * ball.velocity.y);
    
    //force Appliquee sur la balle (transferee du mur a la balle)
    forceVector.x = (radiusVector.x * Math.abs(dotProduct));
    forceVector.y = (radiusVector.y * Math.abs(dotProduct));

    return forceVector;
}


