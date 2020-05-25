const Direction = {UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4}

const randomDirection = (exclude)=>{
    let newDirection = Phaser.Math.Between(1, 4);
    while (newDirection === exclude){
        newDirection = Phaser.Math.Between(1, 4);
    }
    return newDirection
}

export class Bat extends Phaser.Physics.Arcade.Sprite{

    direction = Direction.RIGHT;
    moveEvent = null;
    
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
       

        this.anims.play('bat-front')

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this);

        this.moveEvent = scene.time.addEvent({
            delay: 2000,
            callback: () =>{
                this.direction = randomDirection(this.direction);
            },
            loop: true
           
        })
    }

    handleTileCollision(gameObject, tile){
        if (gameObject !== this)
        {
            return
        }
        this.direction = randomDirection(this.direction);
    }


    preUpdate(time, delta){
        super.preUpdate(time, delta)
        const speed = 50;

        switch(this.direction){
            case Direction.UP:
                this.setVelocity(0, -speed)
                break;
            case Direction.DOWN:
                this.setVelocity(0, speed)
                break;
            case Direction.LEFT:
                this.setVelocity(-speed, 0)
                break;
            case Direction.RIGHT:
                this.setVelocity(speed, 0)
                break;
            default:
                this.setVelocity(0,0)
        }
    }

    destroy(fromScene){
        this.moveEvent.destroy()
        
        super.destroy(fromScene)
    }
}