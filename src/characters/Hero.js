import {CST} from '../CST.js'

const HealthState = {IDLE: 1, DAMAGE: 2, DEAD: 3}

export default class Hero extends Phaser.Physics.Arcade.Sprite{
    
    healthState = HealthState.IDLE;
    damageTime = 0;

    _health = 3;

    get health(){
      return this._health;
    }
    
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame)
    }

    setArrows(arrows){
      this.arrows = arrows;
    }

    handleDamage(direction){
        if (this._health <= 0){
          return
        }

        if(this.healthState === HealthState.DAMAGE){
            return
        }

        this.setVelocity(direction.x, direction.y)
        this.setTint(0xff3737);

        this.healthState = HealthState.DAMAGE;
        this.damageTime = 0;

        --this._health;

        if(this._health <= 0){
          this.healthState = HealthState.DEAD;
        }
        console.log('triggered')
    }

    arrowAnimation(){
     
      this.shootArrow()
    }

    shootArrow(){
      let firingDirection = this.direction;
      const arrowVec = new Phaser.Math.Vector2(0,0); 
      
      switch (firingDirection){
        case 'up':
          arrowVec.y = -1
          break;
        case 'down':
          arrowVec.y = 1
          break;
        case 'left':
          arrowVec.x = -1
          break;
        case 'right':
          arrowVec.x = 1
          break;
        default:

      }

      const angle = arrowVec.angle();
      const arrow = this.arrows.get(this.x, this.y, CST.SPRITE.PLAIN_ARROW.KEY_NAME)
      arrow.setRotation(angle)
      arrow.setVelocity(arrowVec.x * 500, arrowVec.y * 500)

      arrow.x += arrowVec.x * 8;
      arrow.y +- arrowVec.y * 8;

      arrow.setActive(true);
      arrow.setVisible(true);
    }


    preUpdate(time, delta){
        super.preUpdate(time, delta)

        switch(this.healthState){
            case HealthState.IDLE:
                break;
            case HealthState.DAMAGE:
                this.damageTime += delta;
                if (this.damageTime >= 100){
                    this.healthState = HealthState.IDLE;
                    this.setTint(0xffffff);
                    this.damageTime = 0;
                }
              break;
            case HealthState.DEAD:
              this.anims.play('up-idle')
              this.setVelocity(0,0)
              this.setTint(0x000000);
            break; 
        }
    }

    update(keyboard){
    
        if(this.healthState === HealthState.DAMAGE || this.healthState === HealthState.DEAD){
            return
        }
        
        const speed = 200;
        this.setVelocity(0,0)

        //if no keys are down, play the idle frame according to direction.
        if (!(keyboard.W.isDown || keyboard.A.isDown || keyboard.S.isDown || keyboard.D.isDown || keyboard.SPACE.isDown)) {
          this.anims.play(`${this.direction}-idle`, true);
          
        } else if(Phaser.Input.Keyboard.JustDown(keyboard.SPACE)){
            this.setVelocity(0,0)
            this.anims.play(`${this.direction}-shoot`, true); 
            this.once('animationcomplete', this.shootArrow, this);
            return
          } else if(!keyboard.SPACE.isDown) {
          //if a key is down, set velocity according to speed, set direction
          if(keyboard.W.isDown){
            this.setVelocityY(-speed);          
            this.direction = 'up';
          } else if(keyboard.S.isDown){
            this.setVelocityY(speed);
            this.direction = 'down';
          }
    
          if(keyboard.A.isDown){
            this.setVelocityX(-speed);
            this.direction = 'left';
          } else if(keyboard.D.isDown){
            this.setVelocityX(speed);
            this.direction = 'right';
          }


  
          //play appropirate animation as dictated by direction from above
          if(!keyboard.SPACE.isDown){
            this.anims.play(`${this.direction}-walk`, true);
          }
        }
  
        this.body.velocity.normalize().scale(speed);
    }
}

Phaser.GameObjects.GameObjectFactory.register('hero', function(x, y, texture, frame){
    let sprite = new Hero(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
    sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.75)
    sprite.setOffset(16, 15)
    sprite.body.collideWorldBounds = true;
    return sprite;
})