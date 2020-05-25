export const debugDraw = (layer, scene, color) =>{
     ///DEBUG
     const debugGraphics = scene.add.graphics().setAlpha(0.50);
     layer.renderDebug(debugGraphics, {
       tileColor: null, // Color of non-colliding tiles
       collidingTileColor: new Phaser.Display.Color.HexStringToColor(color) // Color of colliding tiles
     });
}