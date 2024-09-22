import { PowerBase } from './PowerBase.js';

export class LargePlatformPower extends PowerBase {
  constructor (game, diamonds) {
    super(game, diamonds, 'reddiamond');
  }

  givePower () {
    this.game.setPlatformBig();
  }
}
