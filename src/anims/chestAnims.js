import {CST} from '../CST.js';

export const createChestAnims = (anims) =>{
    anims.create({
        key: 'chest-open',
        frames: [{key: CST.ATLAS_SPRITES.CHESTS.KEY, frame: 'treasure_chests_32x32-30'}],
    }),
    anims.create({
        key: 'chest-closed',
        frames: [{key: CST.ATLAS_SPRITES.CHESTS.KEY, frame: 'treasure_chests_32x32-20'}],
    })
}