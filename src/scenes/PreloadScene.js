import Phaser from 'phaser';
import assetsJson from '../assets.json';
import { preloadFromJson /*, createFromJson */ } from
  '../components/jsonUtils.js';

export class PreloadScene extends Phaser.Scene {
  constructor () {
    super({ key: 'scene-preload' });
  }

  preload () {
    /* -*-*-*-*-*-*-*-*-*-*-*
    >> >>>>PreloadScene<<<<<
    -* -*-*-*-*-*-*-*-*-*-*-* */
    this.load.image('background-preload',
      './assets/images/background-preload.png');
    this.load.spritesheet('play-button',
      './assets/images/playbutton.png', {
        frameWidth: 190,
        frameHeight: 49,
      });
    this.load.audio('breakout-start',
      './assets/sounds/breakout.mp3');

    /* -*-*-*-*-*-*-*-*-*-*-*
    >> >>>>>GameScene<<<<<<<<
    -* -*-*-*-*-*-*-*-*-*-*-* */
    /* Precargamos los archivos de imagenes */
    this.load.image('background', './assets/images/background.png');

    // Images
    preloadFromJson(this, assetsJson.bricks);
    preloadFromJson(this, assetsJson.boxes);
    preloadFromJson(this, assetsJson.platforms);
    preloadFromJson(this, assetsJson.symbols);

    // Audios - Sounds
    this.load.audio('platform-impact',
      './assets/sounds/platform-impact.ogg');
    this.load.audio('brick-impact',
      './assets/sounds/brick-impact.ogg');
    this.load.audio('livelost',
      './assets/sounds/live-lost.ogg');
    this.load.audio('level-change',
      './assets/sounds/phasechange.ogg');
    this.load.audio('unbreakable-impact',
      './assets/sounds/fixed-brick-impact.ogg');

    // Sprites
    this.load.spritesheet('bluediamond',
      './assets/images/blue_diamond-sprites.png',
      { frameWidth: 48, frameHeight: 48 },
      // * Importante: Cuanto mide cada `frame`
    );
  }

  create () {
    this.add.image(400, 250, 'background-preload');
    this.playButton = this.add.sprite(400, 400, 'play-button')
      .setInteractive();
  }
}
