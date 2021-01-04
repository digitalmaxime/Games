export default function detectCollision(ball, context) {

    let rightWall = context.width; 
    let leftWall = 0;
    let topWall = 0;
    let bottomWall = context.height;
    
    if (ball.x >= rightWall || ball.x <= leftWall) {
        return 'horizontal';
    }  
    if (ball.y <= topWall || ball.y>=bottomWall) {
        return 'vertical';
    }  

    else return false;
}