import Game from "./game.js";

export default  class InputHandler {
    constructor(game) {
        document.addEventListener("keydown", (event)=> {
            switch(event.keyCode) {
                // case 37: 
                //     paddle.moveleft();
                //     break;

                // case 39:
                //     paddle.moveright();
                //     break;
                
                case 27:
                    game.togglePause();
                    break;

                case 32:
                    game.start();
                    break;
            }
        });

        // document.addEventListener("keyup", (event)=> {
        //     switch(event.keyCode) {
        //         case 37: 
        //             paddle.stop();
        //             break;

        //         case 39:
        //             paddle.stop();
        //             break;
        //     }
        // });
    }
}