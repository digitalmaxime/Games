import Ball from './ball.js';

export function setupLevel(level, radius, game) {
    let startingPointX = game.gameWidth/2;
    let startingPointY = game.gameHeight/2;
    //  game = game;
    let angle = Math.atan(0.5);
    let distanceX = Math.floor(Math.cos( angle) * (2* radius));
    let array = [];

    for (let i=0; i<level; i++) {
        if (i%2 === 0) {
            for (let j=-i/2; j<=i/2; j++) {
                array.push(new Ball(startingPointX+(2*i/2)*distanceX, startingPointY + (2*j)*radius, radius, 'orange', {x: 0, y: 0},  game));
            }
        } else {
            for (let j=-i/2; j<=i/2; j++) {
                array.push(new Ball(startingPointX+(2*i/2)*distanceX, startingPointY + (2*j)*radius, radius, 'orange', {x: 0, y: 0},  game));
            }
        }
    }

    
    return  array;
}