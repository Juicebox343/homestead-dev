const createBatAnims = (anims) => {
    const batRate = 12;

    anims.create({
        key: 'bat-front',
        frames: anims.generateFrameNames('bat', {
          prefix: 'bat-',
          start: 6,
          end: 8,
          suffix: '.png'
        }),
        frameRate: batRate,
        yoyo: true,
        repeat: -1
      });
  
      anims.create({
        key: 'bat-back',
        frames: anims.generateFrameNames('bat', {
          prefix: 'bat-',
          start: 0,
          end: 2,
          suffix: '.png'
        }),
        frameRate: batRate,
        yoyo: true,
        repeat: -1
      });
  
      anims.create({
        key: 'bat-left',
        frames: anims.generateFrameNames('bat', {
          prefix: 'bat-',
          start: 3,
          end: 5,
          suffix: '.png'
        }),
        frameRate: batRate,
        yoyo: true,
        repeat: -1
      });
  
    anims.create({
      key: 'bat-right',
      frames: anims.generateFrameNames('bat', {
        prefix: 'bat-',
        start: 9,
        end: 11,
        suffix: '.png'
      }),
      frameRate: batRate,
      yoyo: true,
      repeat: -1
    });
  }

  export {
    createBatAnims
  }