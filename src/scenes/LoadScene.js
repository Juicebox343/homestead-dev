import {CST} from "../CST.js";

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(){

    }

    loadImages(){
        this.load.setPath("./assets/images");
        for(let prop in CST.IMAGE){
            this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
        }
    }

    // loadAudio(){
    //     this.load.setPath("./assets/audio");
    //     for(let prop in CST.AUDIO){
    //         this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
    //     }
    // }

    loadSprites(frameConfig){
        this.load.setPath("./assets/sprites");
        for(let prop in CST.SPRITE){
            this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig);
        }
    }

    loadCharacters(){
        this.load.setPath("./assets/sprites");
        for(let prop in CST.CHARACTERS){
            this.load.atlas(CST.CHARACTERS[prop].KEY_NAME, CST.CHARACTERS[prop].SPRITES, CST.CHARACTERS[prop].ATLAS);
        }   
    }
    preload(){

        this.loadImages();
        // this.loadAudio();
        this.loadSprites({
            frameHeight: 32,
            frameWidth: 32
        });
        this.loadCharacters();
        //loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        //loading events

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 25);            
            // console.log(`loading: ${percent * 100}%`);
        })

        this.load.on('complete', ()=>{
            // this.scene.start(CST.SCENES.MENU);
        })

        this.load.on("load", (file) =>{
            console.log(file.src);
        })


    }
    create(){
        this.scene.start(CST.SCENES.MENU);
    }
}