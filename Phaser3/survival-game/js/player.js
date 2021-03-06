export default class Player extends Phaser.Physics.Matter.Sprite {
     constructor(data) {
         let {scene, x, y, texture, frame} = data;
         super(scene.matter.world, x, y, texture, frame);
         this.scene.add.existing(this);
     }

     static preload(scene) {
        scene.load.atlas('female_character', 'assets/images/female_character.png', 'assets/images/female_character_atlas.json');
        scene.load.animation('female_anim', 'assets/images/female_character_anim.json ');
     }

     update() {
        this.anims.play('female_walk', true);
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }else if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        }
        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        }else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed); 
        this.setVelocity(playerVelocity.x, playerVelocity.y);
    }
}