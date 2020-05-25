import {CST} from "../CST.js";
import {debugDraw} from './debug.js'
import {createBatAnims} from './EnemyAnims.js'
import {createCharacterAnims } from "./CharacterAnims.js";
import {Bat} from './Enemies.js';

export class WorldScene extends Phaser.Scene{
  constructor(){
    super({
        key: CST.SCENES.WORLD
    })
  }

  preload(){
    this.load.tilemapTiledJSON("world", "./assets/sprites/starter.json");
    this.keyboard = this.input.keyboard.addKeys('W, A, S, D, SPACE');   
  }
  
  create(){
    // this.sound.play(CST.AUDIO.WORLD_MUSIC, {
    //   volume: 0.35,
    //   loop: true
    // })

    createCharacterAnims(this.anims);
    createBatAnims(this.anims);
    

    const map = this.make.tilemap({key: "world"});
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    const watergrass = map.addTilesetImage('watergrass', CST.SPRITE.WATER_GRASS);
    const grass = map.addTilesetImage('grass', CST.SPRITE.GRASS);
    
    const groundLayer = map.createStaticLayer("ground1", grass, 0, 0);
    const waterLayer = map.createStaticLayer("water1", watergrass, 0, 0);

    waterLayer.setCollisionByProperty({ collides: true });

    
    this.hero = this.physics.add.sprite(200,200,'hero', 'hero-27');
    this.hero.body.setSize(this.hero.width * 0.5, this.hero.height * 0.75)
    this.hero.body.collideWorldBounds = true;
    this.hero.setOffset(16, 15)
    this.hero.direction = 'down';
    

    const camera = this.cameras.main;
    camera.startFollow(this.hero, true);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    const bats = this.physics.add.group({
      classType: Bat,
      createCallback: (gameObject) =>{
        gameObject.body.onCollide = true;
      }
    })

    bats.get(256,128,'bat')

    this.physics.add.collider(this.hero, waterLayer);
    this.physics.add.collider(bats, waterLayer);

    debugDraw(waterLayer, this, '#FBBC5A')
   
  }
  
  update(time, delta){
      
      const speed = 200;
      this.hero.setVelocity(0,0)

      //if no keys are down, play the idle frame according to direction.
      if (!(this.keyboard.W.isDown || this.keyboard.A.isDown || this.keyboard.S.isDown || this.keyboard.D.isDown)) {
        this.hero.anims.play(`${this.hero.direction}-idle`, true);
      } else {
        //if a key is down, set velocity according to speed, set direction
        if(this.keyboard.W.isDown){
          this.hero.setVelocityY(-speed);
          this.hero.direction = 'up';
        } else if(this.keyboard.S.isDown){
          this.hero.setVelocityY(speed);
          this.hero.direction = 'down';
        }
  
        if(this.keyboard.A.isDown){
          this.hero.setVelocityX(-speed);
          this.hero.direction = 'left';
        } else if(this.keyboard.D.isDown){
          this.hero.setVelocityX(speed);
          this.hero.direction = 'right';
        }

        //play appropirate animation as dictated by direction from above
        this.hero.anims.play(`${this.hero.direction}-walk`, true);
      }

      this.hero.body.velocity.normalize().scale(speed);
  }

}
