import Phaser from 'phaser';
import assetsJson from '../assets.json';
import { preloadFromJson /*, createFromJson */ } from
  '../components/jsonUtils.js';
import { PlayButton } from '../components/Button-Play.js';

export class PreloadScene extends Phaser.Scene {
  constructor () {
    super({ key: 'scene-preload' });
    this.playButton = new PlayButton(this);
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

    /* -*-*-*-*-*-*-*-*-*-*-*-*
    >> >>>>>GameOverScene<<<<<<
    -* -*-*-*-*-*-*-*-*-*-*-*-* */
    // Lo moví de **GameScene.js**
    this.load.image('gameover',
      './assets/images/gameover.png');
    // llamo el método `preload` de `RestartButton`
    // this.restartButton.preload();
    // Precargamos el audio de `gameover`
    this.load.audio('gameover',
      './assets/sounds/gameover.ogg');

    /* -*-*-*-*-*-*-*-*-*-*-*-*-*-*
    >> >>>>>CongratulationsScene<<<<
    -* -*-*-*-*-*-*-*-*-*-*-*-*-*-* */
    // Lo moví de **GameScene.js**
    this.load
      .image('congratulations', './assets/images/congratulations.png');
    // llamo el método `preload` de `RestartButton`
    // this.restartButton.preload();
    // Precargamos el audio de `gameover`
    this.load.audio('congratulations',
      './assets/sounds/you_win.ogg');

    /* -*-*-*-*-*-*-*-*-*-*-*-*-*
    >> >>>>>>>>Button-Play<<<<<<<
    -* -*-*-*-*-*-*-*-*-*-*-*-*-* */
    this.load
      .spritesheet('button-play', './assets/images/playbutton.png', {
        frameWidth: 190, // Ancho dentro de las 2 imagenes
        frameHeight: 49, // Alto de las imágenes
      });
    this.load
      .audio('play-game', './assets/sounds/breakout.mp3');

    /* -*-*-*-*-*-*-*-*-*-*-*-*-*
    >> >>>>>>Button-Restart<<<<<<
    -* -*-*-*-*-*-*-*-*-*-*-*-*-* */
    this.load
      .spritesheet('button-restart', './assets/images/restart.png', {
        frameWidth: 190, // Ancho dentro de las 2 imagenes
        frameHeight: 49, // Alto de las imágenes
      });
    this.load
      .audio('start-game', './assets/sounds/start-game.ogg');
  }

  create () {
    this.add.image(400, 250, 'background-preload');
    this.playButton.create();
  }
}
