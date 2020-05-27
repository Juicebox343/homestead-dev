const createCharacterAnims = (anims) => {

    const heroRate = 10;

    anims.create({
      key: 'idle',
      frames: anims.generateFrameNames('hero_alt', {
        prefix: 'Adventurer Female Sprite Sheet-', 
        start: 0, 
        end: 5
      }),
      frameRate: heroRate,
      repeat: -1
    });

    anims.create({
      key: 'walk',
      frames: anims.generateFrameNames('hero_alt', {
        prefix: 'Adventurer Female Sprite Sheet-', 
        start: 6, 
        end: 13
      }),
      frameRate: heroRate,
      repeat: -1
    });
  
}
export {
    createCharacterAnims
}