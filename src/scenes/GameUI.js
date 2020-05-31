import {CST} from "../CST.js";
import {sceneEvents} from "../events/EventCenter.js";

export class GameUI extends Phaser.Scene{
 
    
    constructor(){
        super({
            key: CST.SCENES.GAME_UI
        })

        this.hearts;
    }

    create(){

        this.hearts = this.add.group({})
        this.coinsLabel = this.add.text(5, 40, '0');

        this.hearts.createMultiple({
            key: CST.SPRITE.UI_HEART.KEY,
            setXY:{
                x: 16,
                y: 16,
                stepX: 16
            },
            frame: 0,
            quantity: 3
        })

        sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this);
        sceneEvents.on('player-coins-changed', coins =>{
            this.coinsLabel.text = coins.toLocaleString()
        })
        
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('player-health-changed', this.handlePlayerHealthChanged, this)
            sceneEvents.off('player-coins-changed')
        })
    }

    handlePlayerHealthChanged(health){
        this.hearts.children.each((gameObject, index) =>{
            const heart = gameObject;
            
            if (index < health){
                heart.setTexture(CST.SPRITE.UI_HEART.KEY, 0)
                console.log(index)
            } else {
                heart.setTexture(CST.SPRITE.UI_HEART.KEY, 4)
                console.log(index)
            }
        })

    }
}