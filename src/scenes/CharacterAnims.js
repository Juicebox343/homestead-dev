const createCharacterAnims = (anims) => {

    const heroRate = 10;

    anims.create({
      key: 'up-idle',
      frames: [{key: 'hero', frame: 'hero-13'}]
    });

    anims.create({
      key: 'right-idle',
      frames: [{key: 'hero', frame: 'hero-20'}]
    });

    anims.create({
      key: 'down-idle',
      frames: [{key: 'hero', frame: 'hero-27'}]
    });

    anims.create({
      key: 'left-idle',
      frames: [{key: 'hero', frame: 'hero-6'}]
    });

    anims.create({
      key: 'up-walk',
      frames: anims.generateFrameNames('hero', {
        prefix: 'hero-', 
        start: 7, 
        end: 12
      }),
      frameRate: heroRate,
      repeat: -1
    });

    anims.create({
      key: 'right-walk',
      frames: anims.generateFrameNames('hero', {
        prefix: 'hero-', 
        start: 14, 
        end: 19
      }),
      frameRate: heroRate,
      repeat: -1
    });

    anims.create({
      key: 'down-walk',
      frames: anims.generateFrameNames('hero', {
        prefix: 'hero-', 
        start: 21, 
        end: 26
      }),
      frameRate: heroRate,
      repeat: -1
    });

    anims.create({
      key: 'left-walk',
      frames: anims.generateFrameNames('hero', {
        prefix: 'hero-', 
        start: 0, 
        end: 5
      }),
      frameRate: heroRate,
      repeat: -1
    });

    //

    anims.create({
      key: 'up-hack',
      frames: anims.generateFrameNames('hero', {
        prefix: 'hero-', 
        start: 32, 
        end: 31
      }),
      frameRate: heroRate,
      repeat: 0
    });

    anims.create({
      key: 'right-hack',
      frames: anims.generateFrameNames('hero', {
        prefix: 'hero-', 
        start: 35, 
        end: 34
      }),
      frameRate: heroRate,
      repeat: 0
    });   

    anims.create({
      key: 'down-hack',
      frames: anims.generateFrameNames('hero', {
        prefix: 'hero-', 
        start: 38, 
        end: 37
      }),
      frameRate: heroRate,
      repeat: 0
    });

    anims.create({
      key: 'left-hack',
      frames: anims.generateFrameNames('hero', {
        prefix: 'hero-', 
        start: 29, 
        end: 28
      }),
      frameRate: heroRate,
      repeat: 0
    });
   
}

export {
    createCharacterAnims
}