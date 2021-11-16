import detectLineCollision from './LineCollisionDetection.js';

export default function detectCornerCollision(ball, corner) {
    if (corner === 0) { //topleft
        detectLineCollision(ball, Math.PI/4, 48, 0, 1); // with line 1 topright
        detectLineCollision(ball, Math.PI/4, 0, 48, 2); //with line 2 bottomleft
    }
    
}
