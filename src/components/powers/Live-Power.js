import { PowerBase } from './PowerBase.js';

export class LivePower extends PowerBase {
  constructor (game, diamonds) {
    super(game, diamonds, 'bluediamond');
  }

  givePower () {
    // Esto está en **LiveCounter.js**
    this.game.addLives(1);
  }
}
