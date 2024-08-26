import Phaser from 'phaser';
import { RestartButton } from '../components/RestartButton';

/* Se exporta la clase a usar de la Escena */
export class CongratulationsScene extends Phaser.Scene {
  constructor () {
    super({ key: 'scene-congratulations' });

    // Instancio el RestartButton
    this.restartButton = new RestartButton(this);
    this.congratulations = null;
  }

  preload () {
    // Lo moví de **GameScene.js**
    this.load
      .image('congratulations', './assets/congratulations.png');
    // llamo el método `preload` de `RestartButton`
    this.restartButton.preload();
  }

  create () {
    // La imagen de fondo, sino sale un fondo negro
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    // Debe ser lo último en crearse para q parezca encima de todo
    // Similar al gameover, va al final
    this.congratulations =
      this.add.image(400, 250, 'congratulations');
    // Llamada al botón de reinicio
    this.restartButton.create();
  }

  update () {}
}
