import MainScene from "./MainScene.js";

const config = {
    width:512,
    height:512,
    backgroundColor: '#333333',
    type : Phaser.AUTO, 
    parent: 'survival-game', //id of the root div,
    scene: [MainScene] ,
    scale : {
        zoom:2
    },
    physics: {
        default: 'matter',
        matter :{
            debug : true,
            gravity : {y:0}
        }
    },
    plugins : {
        scene : [
            {
                plugin: PhaserMatterCollisionPlugin, // The plugin class
                key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
                mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
              }
        ]
    }
}

new Phaser.Game(config);