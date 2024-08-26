import Phaser from 'phaser';
import { RestartButton } from '../components/RestartButton';

/* Se exporta la clase a usar de la Escena */
export class GameOverScene extends Phaser.Scene {
  constructor () {
    super({ key: 'scene-game-over' });

    // Instancio el RestartButton
    this.restartButton = new RestartButton(this);
    this.gameover = null;
  }

  preload () {
    // Lo moví de **GameScene.js**
    this.load.image('gameover',
      './assets/images/gameover.png');
    // llamo el método `preload` de `RestartButton`
    this.restartButton.preload();
    // Precargamos el audio de `gameover`
    this.load.audio('gameover',
      './assets/sounds/gameover.ogg');
  }

  create () {
    // La imagen de fondo, sino sale un fondo negro
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    // Debe ser lo último en crearse para q parezca encima de todo
    this.gameover =
        this.add.image(400, 250, 'gameover');
    // Llamada al botón de reinicio
    this.restartButton.create();
    // Cargamos el sonido y lo reporoducimos
    this.sound.add('gameover').play();
  }

  update () {}
}
