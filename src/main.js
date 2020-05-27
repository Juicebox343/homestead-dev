import {LoadScene} from "./scenes/LoadScene.js";
import {MenuScene} from "./scenes/MenuScene.js";
import {WorldScene} from "./scenes/WorldScene.js";
import {GameUI} from "./scenes/GameUI.js";

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
    scene: [LoadScene, MenuScene, WorldScene, GameUI],
    render: {
        pixelArt: true
    }
}

let game = new Phaser.Game(config);

