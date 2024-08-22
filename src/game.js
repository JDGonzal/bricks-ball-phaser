import Phaser from 'phaser';
import assetsJson from './assets.json'; // assert { type: 'json' };
import { Scoreboard } from './components/Scoreboard.js';
import { preloadFromJson /*, createFromJson */ } from './components/jsonUtils.js';

/* Se exporta la clase a usar de la Escena */
export class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'scene-game' });

    this.background = null;
    this.gameover = null;
    this.platform = null;
    this.cursor = null;
    this.ball = null;
    this.scoreboard = null;
  }

  /* Valores que puedo inicializar */
  init () {
    this.scoreboard = new Scoreboard(this);
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
    /* Definimos los límites del `world` para que la `ball`
    pueda rebotar: ---------------------> izq., der., arr., aba. */
    this.physics.world.setBoundsCollision(true, true, true, false);
    /* Ponemos las imágenes en el juego */
    this.background =
      this.add.image(0, 0, 'background')
        .setOrigin(0, 0);
    this.gameover =
      this.add.image(400, 250, 'gameover');

    // Si quiero ver en pantalla lo del json
    /*
    let y = 0;
    y = createFromJson(this, assetsJson.bricks, 0, y) + 26;
    y = createFromJson(this, assetsJson.boxes, 0, y) + 26;
    y = createFromJson(this, assetsJson.platforms, 0, y) + 26;
    createFromJson(this, assetsJson.symbols, 0, y);
    /* */
    // No visible el mensaje de `gameover`
    this.gameover.visible = false;

    // Invomcamos el `create` del componente `Scoreboard`
    this.scoreboard.create();

    // Ponemos la `ball` con las `physics`
    this.ball =
      this.physics.add.image(400, 100, 'ball')
        .setScale(assetsJson.symbols.scale);
    /* Luego de crearla le decimos que se adapte a los límites
     del `world` */
    this.ball.setCollideWorldBounds(true);
    // Mostramos la `platform-normal` con physics
    this.platform =
      this.physics.add.image(400, 460, 'platform-normal')
        .setScale(assetsJson.platforms.scale);
    // Como la plataforma cae le decimos q no va a tener gravedad
    this.platform.body.allowGravity = false;
    // La velocidad(x,y) de la `ball` será aleatoria
    let velocity = 100 * Phaser.Math.Between(1.3, 2);
    if (Phaser.Math.Between(0, 10) > 5) {
      velocity = 0 - velocity;
    }
    this.ball.setVelocity(velocity, 10);
    // Colisión entre la `platform` y la `ball`
    this.physics.add.collider(this.ball, this.platform,
      /* Comportamiento, Callback, Contexto */
      this.behaviorCollider, null, this);
    // this.behaviorCollider.bind(this), null); // otra forma
    // Hacemos un rebote de la `ball`
    this.ball.setBounce(1);
    // La plata forma la hacemos inmovible
    this.platform.setImmovable();

    // Creamos el manejo de teclado para mover la `platform`
    this.cursor = this.input.keyboard.createCursorKeys();
  }

  /* Método para cuando se hace la colisión entre
  la `ball` y la `platform` */
  behaviorCollider (ball, platform) {
    // Llamo la función de **Scoreboard.js**
    this.scoreboard.addPoints(1);
    /* Los comportamientos entre la `ball` y la `platform`
    obteniendo la posición relativa entre estos */
    const relativeImpact = ball.x - platform.x;
    console.log(relativeImpact);
    // se añade condición si el valor esta muy en el centro
    if (relativeImpact <= 0.1 && relativeImpact >= -0.1) {
      ball.setVelocityX(Phaser.Math.Between(-10, 10));
    } else {
      // Cambia la velociad de X en función a este valor
      ball.setVelocityX(10 * relativeImpact);
    }
  }

  update () {
    /* El proceso corre cada segundo */
    // Definimos q hace cada tecla
    if (this.cursor.left.isDown) {
      this.platform.setVelocityX(-500);
    } else if (this.cursor.right.isDown) {
      this.platform.setVelocityX(500);
    } else this.platform.setVelocityX(0);

    // Si la `ball` se sale del juego se da por terminado el juego
    if (this.ball.y >= 500) {
      console.log('GamoeOver');
      this.gameover.visible = true;
      this.scene.pause();
    }
  }
};
