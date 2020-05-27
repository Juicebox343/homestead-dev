import {CST} from "../CST.js";
import {debugDraw} from './debug.js'
import {createBatAnims} from './EnemyAnims.js'
import {createCharacterAnims } from "./CharacterAnims.js";
import {Bat} from './Enemies.js';
import '../characters/Hero.js';

import {sceneEvents} from '../events/EventCenter.js';

let hit = 0;

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
    this.scene.run(CST.SCENES.GAME_UI);
    // this.sound.play(CST.AUDIO.WORLD_MUSIC, {
    //   volume: 0.35,
    //   loop: true
    // })

    createCharacterAnims(this.anims);
    createBatAnims(this.anims);
    

    const map = this.make.tilemap({key: "world"});
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    const watergrass = map.addTilesetImage('watergrass', CST.SPRITE.WATER_GRASS.KEY_NAME);
    const grass = map.addTilesetImage('grass', CST.SPRITE.GRASS.KEY_NAME);
    
    const groundLayer = map.createStaticLayer("ground1", grass, 0, 0);
    const waterLayer = map.createStaticLayer("water1", watergrass, 0, 0);

    waterLayer.setCollisionByProperty({ collides: true });


    this.hero = this.add.hero(128, 128, CST.CHARACTERS.HERO.KEY_NAME)

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
    this.physics.add.collider(bats, this.hero, this.handlePlayerEnemyCollision, undefined, this)

    //debugDraw(waterLayer, this, '#FBBC5A')
   
  }

  handlePlayerEnemyCollision(object1, object2){
    const enemy = object2;
    const directionX = this.hero.x - enemy.x;
    const directionY = this.hero.y - enemy.y;
    let direction = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(300);
  
    this.hero.handleDamage(direction)

    sceneEvents.emit('player-health-changed', this.hero.health )
  }
  
  update(time, delta){
      this.hero.update(this.keyboard)
  }

}
