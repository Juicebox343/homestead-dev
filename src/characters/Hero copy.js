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
            case HealthState.DEATH:
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
        if (!(keyboard.W.isDown || keyboard.A.isDown || keyboard.S.isDown || keyboard.D.isDown)) {
          this.anims.play('idle', true);
          
        } else {
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
            this.flipX = true;
            this.setOffset(12, 10)
          } else if(keyboard.D.isDown){
            this.setVelocityX(speed);
            this.direction = 'right';
            this.setOffset(5, 10)
            this.flipX = false;
          }
  
          //play appropirate animation as dictated by direction from above
          this.anims.play('walk', true);
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
    sprite.setOffset(5, 10)
    sprite.body.collideWorldBounds = true;
    sprite.setScale(2, 2)
    return sprite;
})