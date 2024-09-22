import { PowerBase } from './PowerBase.js';

export class GluePower extends PowerBase {
  constructor (game, diamonds) {
    super(game, diamonds, 'greendiamond');
  }

  givePower () {
    // Esto está en **GameScene.js**
    this.game.setGluePower();
  }
}
