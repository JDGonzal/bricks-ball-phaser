import { ButtonBase } from './ButtonBase.js';

export class RestartButton extends ButtonBase {
  constructor (game) {
    super(game, 'button-play', 400, 350);
  }

  doClick () {
    this.game.sound.add('start-game').play();
    this.game.scene.start('scene-game');
  }
}
