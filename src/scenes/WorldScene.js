import {CST} from "../CST.js";
import {createBatAnims} from './EnemyAnims.js'
import {createCharacterAnims } from "./CharacterAnims.js";
import {Bat} from './Enemies.js';
import '../characters/Hero.js';
import {sceneEvents} from '../events/EventCenter.js';
import {createChestAnims} from '../anims/chestAnims.js';
import Chest from '../items/Chest.js';

import {debugDraw} from './debug.js'

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
    createChestAnims(this.anims);

    const map = this.make.tilemap({key: "world"});
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    const watergrass = map.addTilesetImage('watergrass', CST.SPRITE.WATER_GRASS.KEY);
    const grass = map.addTilesetImage('grass', CST.SPRITE.GRASS.KEY);
    
    const groundLayer = map.createStaticLayer("ground1", grass, 0, 0);
    const waterLayer = map.createStaticLayer("water1", watergrass, 0, 0);

    const chests = this.physics.add.staticGroup({
      classType: Chest
    });

    const chestLayer = map.getObjectLayer('chests');
    chestLayer.objects.forEach(chestObject =>{
      chests.get(chestObject.x + chestObject.width/2, chestObject.y - chestObject.height/2, CST.ATLAS_SPRITES.CHESTS.KEY)
    })

    waterLayer.setCollisionByProperty({ collides: true });

    this.arrows = this.physics.add.group({
      maxSize: 3
    })

    this.hero = this.add.hero(128, 128, CST.ATLAS_SPRITES.HERO.KEY)
    this.hero.setArrows(this.arrows)

    this.hero.direction = 'down';
    
    this.camera = this.cameras.main;
    this.camera.startFollow(this.hero, true);
    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    this.bats = this.physics.add.group({
      classType: Bat,
      createCallback: (gameObject) =>{
        gameObject.body.onCollide = true;
      }
    })

    this.bats.get(256,128,'bat')
    
    this.physics.add.collider(this.hero, waterLayer);
    this.physics.add.collider(this.bats, waterLayer);
    this.physics.add.collider(this.hero, chests, this.handlePlayerChestCollision, undefined, this)
    this.arrowEnemyCollider = this.physics.add.collider(this.arrows, this.bats, this.handleArrowEnemyCollision, undefined, this)
    this.playerEnemyCollider = this.physics.add.collider(this.bats, this.hero, this.handlePlayerEnemyCollision, undefined, this)

    //debugDraw(waterLayer, this, '#FBBC5A')
   
  }

  handlePlayerChestCollision(object1, object2){
     const chest = object2;
     this.hero.setChest(chest)
  }

  handleArrowEnemyCollision(object1, object2){
    this.arrows.killAndHide(object1)
    this.bats.killAndHide(object2)
    this.arrowEnemyCollider.destroy()
    this.playerEnemyCollider.destroy()
  }


  handlePlayerEnemyCollision(object1, object2){
    const enemy = object2;
    const directionX = this.hero.x - enemy.x;
    const directionY = this.hero.y - enemy.y;
    let direction = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(300);
    this.camera.shake(100, 0.01)
    this.hero.handleDamage(direction)

    sceneEvents.emit('player-health-changed', this.hero.health )

    if (this.hero.health <=0){
      this.playerEnemyCollider.destroy()
    }
  }
  
  update(time, delta){
      this.hero.update(this.keyboard)
  }

}
