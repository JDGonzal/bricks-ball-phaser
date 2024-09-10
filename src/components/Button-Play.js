import { ButtonBase } from './ButtonBase.js';

export class PlayButton extends ButtonBase {
  constructor (game) {
    super(game, 'button-play', 400, 400);
  }

  doClick () {
    this.game.sound.add('play-game').play();
    this.game.scene.start('scene-game');
  }
}
