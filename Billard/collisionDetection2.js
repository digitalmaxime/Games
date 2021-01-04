export default function detectCollision(ball, object) {
    if (ball === object) return {x: 0, y:0};

    const angle = Math.atan2((ball.y-object.y), (ball.x-object.x));
    let ballEdgeX = ball.radius * Math.abs(Math.cos(angle));
    let ballEdgeY = ball.radius * Math.abs(Math.sin(angle));
    let objectEdgeX = object.radius * Math.abs(Math.cos(angle));
    let objectEdgeY = object.radius * Math.abs(Math.sin(angle));

    if (ball.x + ballEdgeX >= object.x - objectEdgeX && ball.x - ballEdgeX <= object.x + objectEdgeX &&
        ball.y + ballEdgeY >= object.y - objectEdgeY && ball.y - ballEdgeY <= object.y + objectEdgeY) {
        
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
        const forceVector = {
            x : radiusVector.x * Math.abs(dotProduct), 
            y: radiusVector.y * Math.abs(dotProduct)
        };
        
        let resultVector = {
            x : ball.velocity.x + forceVector.x, 
            y : ball.velocity.y + forceVector.y
        };

        console.log('velocity x : ' + ball.velocity.x);
        console.log('radiusVector x : ' + radiusVector.x);
        console.log('   forceVector x : ' + forceVector.x);
        console.log('   dotProduct, (force * objVelocity : )' + dotProduct);
        console.log('   resultV . x : ' + resultVector.x);
        //return resultVector;
        return forceVector;
    }  

    //else return ball.velocity;
    else return {x: 0, y:0};
}