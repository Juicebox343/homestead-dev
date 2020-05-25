import {LoadScene} from "./scenes/LoadScene.js";
import {MenuScene} from "./scenes/MenuScene.js";
import {WorldScene} from "./scenes/WorldScene.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: { 
            gravity: { y: 0},
            debug: true
        }
    },
    zoom: 2,
    scene: [LoadScene, MenuScene, WorldScene],
    render: {
        pixelArt: true
    }
}

let game = new Phaser.Game(config);

