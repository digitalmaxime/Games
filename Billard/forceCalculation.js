export default function calculateForce(ball, object) {    
    //declare de force Vector to be applied to the ball
    const forceVector = {x: 0, y:0};

    //angle between the ball and the object
    const angle = Math.atan2((ball.y-object.y), (ball.x-object.x));
    let ballEdgeX = ball.radius * Math.abs(Math.cos(angle));
    let ballEdgeY = ball.radius * Math.abs(Math.sin(angle));
    let objectEdgeX = object.radius * Math.abs(Math.cos(angle));
    let objectEdgeY = object.radius * Math.abs(Math.sin(angle));
        
    //masse pour conservation qm
    const massProportion = object.radius / (ball.radius + object.radius);
    
    //vecteur pointant de l'objet vers la ball
    let radiusVector = {x: (ball.x - object.x), y: (ball.y - object.y)};
    const radiusMagnitude = Math.sqrt(radiusVector.x**2 + radiusVector.y**2);
    //normalize that vector
    radiusVector = {
        x: radiusMagnitude === 0 ? 0 : radiusVector.x/radiusMagnitude,
        y: radiusMagnitude === 0 ? 0 : radiusVector.y/radiusMagnitude
    };
    
    //produit scalaire entre velocite de l'object et le vecteur radial
    const dotProduct = (radiusVector.x * object.velocity.x ) + ( radiusVector.y * object.velocity.y);
    
    //force Appliquee sur la balle (transferee de l'objet a la balle)
    forceVector.x = radiusVector.x * Math.abs(dotProduct);
    forceVector.y = radiusVector.y * Math.abs(dotProduct);
    return forceVector;

}