import Phaser from 'phaser';
import assetsJson from './assets.json'; // assert { type: 'json' };

let i = 0;
let x = 0;
let y = 0;

/* Precarga basado en un json */
function preloadFromJson ({ load }, { assets }) {
  assets.forEach(({ key }) => {
    i++;
    const path = './assets/json/' +
    ('00' + i).slice(-2) +
    '-Breakout-Tiles.png';
    load.image(key, path);
  });
}

/* Muestra basados en un json */
// eslint-disable-next-line no-unused-vars
function createFromJson ({ add }, { assets, scale }) {
  assets.forEach(({ key }) => {
    if (x >= 800) {
      x = 0;
      y += 26;
    }
    add.image(x, y, key)
      .setOrigin(0, 0)
      .setScale(scale);
    if (key.substring(0, 8) === 'platform') x += 100;
    else x += 80;
    i++;
  });
}

/* Se exporta la clase a usar de la Escena */
export class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'scene-game' });

    this.background = null;
    this.gameover = null;
    this.platform = null;
    this.cursor = null;
    this.ball = null;
  }

  preload () {
    /* Precargamos los archivos de imagenes */
    this.load.image('background', './assets/background.png');
    this.load.image('gameover', './assets/gameover.png');

    preloadFromJson(this, assetsJson.bricks);
    preloadFromJson(this, assetsJson.boxes);
    preloadFromJson(this, assetsJson.platforms);
    preloadFromJson(this, assetsJson.symbols);
  }

  create () {
    /* Ponemos las imágenes en el juego */
    this.background =
      this.add.image(0, 0, 'background')
        .setOrigin(0, 0);
    this.gameover =
      this.add.image(400, 250, 'gameover');

    // Si quiero ver en pantalla lo del json
    /*
    i = this.scene.scene.add.displayList.list.length;
    createFromJson(this, assetsJson.bricks);
    x = 0; y += 26;
    createFromJson(this, assetsJson.boxes);
    x = 0; y += 26;
    createFromJson(this, assetsJson.platforms);
    x = 0; y += 26;
    createFromJson(this, assetsJson.symbols);
    */
    // No visible el mensaje de `gameover`
    this.gameover.visible = false;

    // Ponemos la `ball` con las `physics`
    this.ball =
      this.physics.add.image(400, 100, 'ball')
        .setScale(assetsJson.symbols.scale);
    // Mostramos la `platform-normal` con physics
    this.platform =
      this.physics.add.image(400, 460, 'platform-normal')
        .setScale(assetsJson.platforms.scale);
    // Como la plataforma cae le decimos q no va a tener gravedad
    this.platform.body.allowGravity = false;
    // Colisión entre la `platform` y la `ball`
    this.physics.add.collider(this.ball, this.platform);
    // Hacemos un rebote de la `ball`
    this.ball.setBounce(1);
    // La plata forma la hacemos inmovible
    this.platform.setImmovable();

    // Creamos el manejo de teclado para mover la `platform`
    this.cursor = this.input.keyboard.createCursorKeys();
  }

  update () {
    /* El proceso corre cada segundo */
    // Definimos q hace cada tecla
    if (this.cursor.left.isDown) {
      this.platform.setVelocityX(-500);
    } else if (this.cursor.right.isDown) {
      this.platform.setVelocityX(500);
    } else this.platform.setVelocityX(0);
  }
};
