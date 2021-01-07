export default function detectCollision(ball, object) {    
    //angle between the ball and the object
    const angle = Math.atan2((ball.y-object.y), (ball.x-object.x));
    let ballEdgeX = ball.radius * Math.abs(Math.cos(angle));
    let ballEdgeY = ball.radius * Math.abs(Math.sin(angle));
    let objectEdgeX = object.radius * Math.abs(Math.cos(angle));
    let objectEdgeY = object.radius * Math.abs(Math.sin(angle));

    //if collision
    if (ball.x + ballEdgeX >= object.x - objectEdgeX && ball.x - ballEdgeX <= object.x + objectEdgeX &&
        ball.y + ballEdgeY >= object.y - objectEdgeY && ball.y - ballEdgeY <= object.y + objectEdgeY 
        ) {
            return true;
    }  else {
        return false;
    }
}