
export default  class InputHandler {
    constructor(game) {
        document.addEventListener("keydown", (event)=> {
            switch(event.keyCode) {
                
                case 27: // esc 
                    game.togglePause();
                    break;

                case 32: //space bar
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